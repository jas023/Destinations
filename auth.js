// auth.js - For public pages like login.html and signup.html

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://mcnhihrosvwnujkojtaj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jbmhpaHJvc3Z3bnVqa29qdGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4OTc3ODYsImV4cCI6MjA3MjQ3Mzc4Nn0.el1rzH6RLLGf03Q5hemrzTzT_F5Ff_pYGQ4a_jydo4c";
const supabase = createClient(supabaseUrl, supabaseKey);

/* signup */
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert("Signup failed: " - error.message);
    } else {
      alert("Signup successful! Please check your email to confirm your account and then login.");
      window.location.href = "login.html";
    }
  });
}

/* signin */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginemail").value;
    const password = document.getElementById("loginpassword").value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      alert("Login successful!");
      window.location.href = "site.html";
    }
  });
}