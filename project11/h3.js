function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px"; 
    } else {
        sidebar.style.left = "0px"; 
    }
}


function showPage(pageId) {
   const pages = document.querySelectorAll(".page");
    pages.forEach((page) => {
        page.classList.remove("active");
    });
   const activePage = document.getElementById(pageId);
    activePage.classList.add("active");
toggleMenu();
}
