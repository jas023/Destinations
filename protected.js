// protect.js - For the main site.html page

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// --- 1. Supabase Setup ---
const supabaseUrl = "https://mcnhihrosvwnujkojtaj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jbmhpaHJvc3Z3bnVqa29qdGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4OTc3ODYsImV4cCI6MjA3MjQ3Mzc4Nn0.el1rzH6RLLGf03Q5hemrzTzT_F5Ff_pYGQ4a_jydo4c";
const supabase = createClient(supabaseUrl, supabaseKey);


// --- 2. DATABASE: Fetch and display destinations ---
async function fetchDestinations() {
  const destinationsList = document.getElementById('destinations-list');
  
  // Fetch data from the 'destinations' table
  const { data, error } = await supabase
    .from('destinations')
    .select('*');

  if (error) {
    console.error('Error fetching destinations:', error);
    destinationsList.innerHTML = '<li>Error loading destinations.</li>';
    return;
  }

  // Clear the list before adding new items
  destinationsList.innerHTML = '';

  if (data.length === 0) {
    destinationsList.innerHTML = '<li>No destinations yet. Add one above!</li>';
  } else {
    // Create and append a list item for each destination
    data.forEach(destination => {
      const li = document.createElement('li');
      li.textContent = `${destination.name} in ${destination.location} - Price: $${destination.price}`;
      destinationsList.appendChild(li);
    });
  }
}


// --- 3. DATABASE: Handle new destination form ---
// CORRECTED SECTION
const destinationForm = document.getElementById('destination-form');
destinationForm.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the form from reloading the page

  const name = document.getElementById('name').value;
  const location = document.getElementById('location').value;
  const price = document.getElementById('price').value;

  // The Supabase insert logic now runs directly when the form is submitted
  const { data, error } = await supabase
    .from('destinations')
    .insert([{ name, location, price }])
    .select(); // It's good practice to add .select()

  if (error) {
    console.error('Error adding destination:', error);
    alert('Failed to add destination: ' + error.message);
  } else {
    // If successful, clear the form and refresh the list of destinations
    console.log('Successfully added:', data);
    destinationForm.reset();
    fetchDestinations(); 
  }
});


// --- 4. AUTH: Page Protection and Content Visibility ---
async function checkUserAndLoadData() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = "login.html";
  } else {
    // If user is logged in, show the page and load the data
    document.body.classList.remove('content-hidden');
    fetchDestinations(); // <-- FETCH DATA AFTER USER IS VERIFIED
  }
}

// Run the auth check when the page loads
checkUserAndLoadData();


// --- 5. AUTH: Logout Button Logic ---
const logoutBtn = document.getElementById("logout");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    window.location.href = "login.html";
  });
}

// NOTE: The extra code that was here has been removed.