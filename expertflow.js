"use strict";

(function () {
  // Wait for DOM
  document.addEventListener("DOMContentLoaded", () => {

    // -------------------
    // Helpers
    // -------------------
    const toastContainer = (function () {
      // prefer existing id, fall back to first .toast-container found
      return document.getElementById("toastContainer") || document.querySelector(".toast-container") || createToastContainer();
    })();

    function createToastContainer() {
      const c = document.createElement("div");
      c.className = "toast-container";
      c.id = "toastContainer";
      document.body.appendChild(c);
      return c;
    }

    function showToast(message, type = "info", timeout = 4000) {
      const toast = document.createElement("div");
      toast.className = `toast ${type}`;
      toast.textContent = message;
      toastContainer.appendChild(toast);
      // animate & remove
      setTimeout(() => {
        toast.classList.add("remove");
      }, timeout - 350);
      setTimeout(() => {
        toast.remove();
      }, timeout);
    }

    const theLoaderContainer = document.querySelector('.loader-container');
    function showLoader() {
      if (theLoaderContainer) theLoaderContainer.style.display = "flex";
    }
    function hideLoader() {
      if (theLoaderContainer) theLoaderContainer.style.display = "none";
    }

    // small util to safe-get element
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));

    // -------------------
    // API Endpoints (update if necessary)
    // -------------------
    const API_BASE = "https://safe-anchor-backend.onrender.com/api";
    const ENDPOINTS = {
      register: `${API_BASE}/experts/register`,
      login: `${API_BASE}/experts/login`,
      logout: `${API_BASE}/experts/logout`,
      refresh: `${API_BASE}/experts/refresh-token`,
      resendOtp: `${API_BASE}/auth/resend-otp`,
      forgotPassword: `${API_BASE}/experts/forgot-password`,
      verifyEmail: `${API_BASE}/auth/verify-email`,
      upload: `${API_BASE}/experts/upload-credentials`,
    };

    // saved state
    let registeredEmail = localStorage.getItem("pendingEmail") || "";

    // -------------------
    // Basic validation utils
    // -------------------
    function isValidEmail(email) {
      // simple regex
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // -------------------
    // Sign In
    // -------------------
    const signInForm = $("#signInForm");
    if (signInForm) {
      signInForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = $("#signinEmail")?.value.trim() || "";
        const password = $("#signinPassword")?.value || "";

        if (!email || !password) {
          showToast("Please fill in email and password.", "error");
          return;
        }
        if (!isValidEmail(email)) {
          showToast("Please enter a valid email address.", "error");
          return;
        }

        try {
          showLoader();
          const res = await fetch(ENDPOINTS.login, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
          });

          const data = await safeParseJson(res);
          hideLoader();
          if (res.ok) {
            showToast("Login successful!", "success");
            if (data?.accessToken) localStorage.setItem("accessToken", data.accessToken);
            // navigate to home after small delay
            setTimeout(() => window.location.href = "/home.html", 600);
          } else {
            showToast(data?.message || "Login failed", "error");
          }
        } catch (err) {
          hideLoader();
          showToast("Network error, please try again.", "error");
          console.error("Sign in error:", err);
        }
      });
    }

    // -------------------
    // Sign Up
    // -------------------
    const signUpForm = $("#signUpForm");
    if (signUpForm) {
      signUpForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = $("#signupEmail")?.value.trim() || "";
        const username = $("#signupUserName")?.value.trim() || "";
        const firstName = $("#signupFirstName")?.value.trim() || "";
        const lastName = $("#signupLastName")?.value.trim() || "";
        const number = $("#signupNumber")?.value.trim() || "";
        const userType = $("#signupUserType")?.value.trim() || "";
        const specialization = $("#signupSpecialization")?.value.trim() || "";
        const password = $("#signupPassword")?.value || "";
        const confirmPassword = $("#signupConfirmPassword")?.value || "";

        // client-side validation
        if (!email || !username || !firstName || !lastName || !number || !userType || !specialization || !password || !confirmPassword) {
          showToast("Please fill in all required fields.", "error");
          return;
        }
        if (!isValidEmail(email)) {
          showToast("Please enter a valid email address.", "error");
          return;
        }
        if (password !== confirmPassword) {
          showToast("Passwords do not match.", "error");
          return;
        }
        if (password.length < 6) {
          showToast("Password must be at least 6 characters.", "error");
          return;
        }

        try {
          showLoader();
          const res = await fetch(ENDPOINTS.register, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, username, firstName, lastName, number, userType, specialization, password, confirmPassword })
          });

          const data = await safeParseJson(res);
          hideLoader();

          if (res.ok) {
            showToast("Account created! Please verify your email.", "success");
            // Save email for verification/resend
            localStorage.setItem("pendingEmail", email);
            registeredEmail = email;

            // Show verification section
            switchToSection("#secondSection", "#EmailSection");
          } else {
            showToast(data?.message || "Sign up failed", "error");
          }
        } catch (err) {
          hideLoader();
          showToast("Network error, please try again.", "error");
          console.error("Sign up error:", err);
        }
      });
    }

    // -------------------
    // Forgot Password
    // -------------------
    const forgotLink = $("#forgotPasswordLink");
    if (forgotLink) {
      forgotLink.addEventListener("click", async () => {
        const email = prompt("Enter your email to reset password:") || "";
        if (!email) return;
        if (!isValidEmail(email)) {
          showToast("Please enter a valid email address.", "error");
          return;
        }

        try {
          showLoader();
          const res = await fetch(ENDPOINTS.forgotPassword, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
          });
          const data = await safeParseJson(res);
          hideLoader();

          if (res.ok) {
            showToast("Password reset link sent!", "success");
          } else {
            showToast(data?.message || "Error sending reset link", "error");
          }
        } catch (err) {
          hideLoader();
          showToast("Network error, please try again.", "error");
          console.error("Forgot password error:", err);
        }
      });
    }

    // -------------------
    // Switch Sign In / Sign Up links
    // -------------------
    const signUpLink = $("#signUpLink");
    const signInLink = $("#signInLink");
    if (signUpLink) signUpLink.addEventListener("click", (ev) => { ev.preventDefault(); switchToSection("#firstSection", "#secondSection"); });
    if (signInLink) signInLink.addEventListener("click", (ev) => { ev.preventDefault(); switchToSection("#secondSection", "#firstSection"); });

    // -------------------
    // Email Verification
    // -------------------
    const verifyForm = $("#verifyEmailForm");
    if (verifyForm) {
      verifyForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const otp = $("#verificationCode")?.value.trim() || "";
        const email = localStorage.getItem("pendingEmail") || registeredEmail || "";
        if (!email) {
          showToast("No email found. Please sign up again.", "error");
          return;
        }
        if (!otp) {
          showToast("Enter verification code.", "error");
          return;
        }

        try {
          showLoader();
          const res = await fetch(ENDPOINTS.verifyEmail, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ otp, email })
          });
          const data = await safeParseJson(res);
          hideLoader();

          if (res.ok) {
            showToast("Email verified successfully!", "success");
            localStorage.removeItem("pendingEmail");
            registeredEmail = "";
            // go to first questionnaire (expertQuestionnaire)
            switchToSection("#EmailSection", "#expertQuestionnaire");
          } else {
            showToast(data?.message || "Verification failed", "error");
          }
        } catch (err) {
          hideLoader();
          showToast("Network error, please try again.", "error");
          console.error("Verify email error:", err);
        }
      });
    }

    // Resend OTP
    const resendEl = $(".resend-email") || $("#resendEmail");
    if (resendEl) {
      resendEl.addEventListener("click", async () => {
        const email = registeredEmail || localStorage.getItem("pendingEmail") || "";
        if (!email) {
          showToast("No email to resend to. Please register first.", "error");
          return;
        }
        try {
          showLoader();
          const res = await fetch(ENDPOINTS.resendOtp, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
          });
          const data = await safeParseJson(res);
          hideLoader();

          if (res.ok) {
            showToast(`Verification code resent to ${email}`, "success");
          } else {
            showToast(data?.message || "Failed to resend code", "error");
          }
        } catch (err) {
          hideLoader();
          showToast("Failed to resend code: " + (err?.message || ""), "error");
          console.error("Resend OTP error:", err);
        }
      });
    }

    // -------------------
    // Questionnaire Navigation (Next & Back)
    // -------------------
    // Build sections array (only sections that are direct <section> tags)
    const allSections = Array.from(document.querySelectorAll("section"));
    function indexOfSection(sec) { return allSections.indexOf(sec); }
    function switchToSection(fromSel, toSel) {
      const from = document.querySelector(fromSel);
      const to = document.querySelector(toSel);
      if (from) from.classList.remove("active");
      if (to) to.classList.add("active");
      // scroll to top of to
      if (to) to.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // -------------------
    // Handle "Next" buttons (fixed)
    // -------------------
    document.querySelectorAll(".next-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        const currentSection = btn.closest("section");
        if (!currentSection) return;

        const type = currentSection.getAttribute("data-type");

        // handle checkbox/file logic (unchanged)
        if (type) {
          const inputs = currentSection.querySelectorAll("input:checked, input[type='file']");
          
          // 🚨 Guard: if nothing selected and it's not the last section, block moving forward
          if (inputs.length === 0) {
            showToast("Please make a selection before continuing.", "error");
            return; // stop here, don’t advance
          }

          if (inputs[0].type === "file") {
            // File upload logic
            const file = inputs[0].files[0];
            if (file) {
              const formData = new FormData();
              formData.append(type, file);
              fetch(ENDPOINTS.upload, { method: "POST", body: formData })
                .then(async (res) => {
                  const data = await res.json().catch(() => ({}));
                  if (res.ok) showToast(`${type} uploaded successfully`, "success");
                  else showToast(data.message || `Failed to upload ${type}`, "error");
                })
                .catch(() => showToast("Upload failed", "error"));
            }
          } else {
            // Save checkbox answers in memory
            questionnaireData[type] = [];
            inputs.forEach((input) => questionnaireData[type].push(input.value));
          }
        }


        // === MOVE TO NEXT SECTION using the allSections array ===
        const idx = indexOfSection(currentSection);
        const next = (typeof idx === "number" && idx >= 0) ? allSections[idx + 1] : null;

        // remove active from current (safe)
        currentSection.classList.remove("active");

        if (next && next.tagName.toLowerCase() === "section") {
          // activate the next actual <section>
          next.classList.add("active");
          next.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          // we've reached the last real <section>
          showToast("Questionnaire completed!", "success");

          // after short delay go back to sign-in
          setTimeout(() => {
            // make sure only firstSection is active
            allSections.forEach(s => s.classList.remove("active"));
            const signIn = document.querySelector("#firstSection");
            if (signIn) {
              signIn.classList.add("active");
              signIn.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
              console.warn("Could not find #firstSection to return to.");
            }
          }, 800);
        }
      });
    });


    // Back buttons
    $$(".back-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const currentSection = btn.closest("section");
        if (!currentSection) return;
        const idx = indexOfSection(currentSection);
        if (idx > 0) {
          currentSection.classList.remove("active");
          const prev = allSections[idx - 1];
          if (prev) prev.classList.add("active");
          (allSections[idx - 1] || document.body).scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Gathered questionnaire data
    let questionnaireData = {};


    // -------------------
    // Utility: safe JSON parse
    // -------------------
    async function safeParseJson(response) {
      try {
        // attempt to parse JSON even if response not ok
        const text = await response.text();
        return text ? JSON.parse(text) : {};
      } catch (err) {
        return {};
      }
    }

    // -------------------
    // Graceful fallback: show first section if none active
    // -------------------
    (function ensureVisibleSection() {
      const active = document.querySelector("section.active");
      if (!active) {
        const first = allSections[0];
        if (first) first.classList.add("active");
      }
    })();

    // Expose for debugging (optional)
    window._expertFlow = {
      showToast, showLoader, hideLoader, ENDPOINTS
    };

  }); // DOMContentLoaded end
})();
