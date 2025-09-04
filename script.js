import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

  // ✅ Use your project’s URL
  const supabaseUrl = "https://mcnhihrosvwnujkojtaj.supabase.co";

  // ✅ Use your anon public key (copy from Supabase dashboard under API Keys → anon public)
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jbmhpaHJvc3Z3bnVqa29qdGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4OTc3ODYsImV4cCI6MjA3MjQ3Mzc4Nn0.el1rzH6RLLGf03Q5hemrzTzT_F5Ff_pYGQ4a_jydo4c";

  const supabase = createClient(supabaseUrl, supabaseKey);

  /* insert rows */
const { data, error } = await supabase
  .from('destinations')
  .insert([
    { some_column: 'someValue' },
    { some_column: 'otherValue' },
  ])
  .select()
          

  // Example: fetch data
  async function loadDestinations() {
    let { data, error } = await supabase.from("destinations").select("*");

    if (error) {
      console.error(error);
    } else {
      console.log(data);
    }
  }


  // signup
  const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      alert("Signup failed: " + error.message);
    } else {
      alert("Signup successful! Please login now.");
      window.location.href = "login.html"; // or "site.html"
    }
  });
}

    





/*signin */
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
      window.location.href = "index.html";
    }
  });
}



/*get current user or to check user is logged in or not */
const { data: { user } } = await supabase.auth.getUser();
if (!user) {
    window.location.href = "login.html";
}

async function checkUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = "login.html";
  }
}
checkUser();


// ✅ Logout
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
  });
}


/* google linking */
/* createClientconst { data, error } = await supabase.auth.linkIdentity({ provider: 'google' }) */

  loadDestinations();

  