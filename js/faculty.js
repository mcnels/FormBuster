function loadPage () {
    validateUser();

    // Load "general_dashboard.html" and the rest of the page
    $('#generalDashboard').load("general_dashboard.html", function () {
        // Remove elements that don't apply for a Faculty
        document.getElementById("draftsBtn").remove();
        document.getElementById("formsBtn").remove();
        document.getElementById("formsManagementBtn").remove();
        document.getElementById("notifications").remove();
        document.getElementById("notificationPreferences").remove();

        document.getElementById("display-name").classList.add('w3-theme-teal');
        document.getElementById("generalTopBar").classList.add('w3-theme-teal');
        document.getElementById("footer").classList.add('w3-theme-teal');
        document.getElementById("dashboardBtn").innerHTML = "Pending Forms";

        // Attach the functions to each button
        document.getElementById("dashboardBtn").addEventListener("click", gotoDashboard);
        document.getElementById("studentsBtn").addEventListener("click", gotoStudents);
        document.getElementById("historyBtn").addEventListener("click", gotoHistory);

        // Load "studentSearchView" only once
        $('#studentSearchView').load('student_list.html');

        // Load dashboard by default
        gotoDashboard();
    });
}

function gotoDashboard () {
    // Highlight only the dashboard button, because it is selected
    document.getElementById("dashboardBtn").className = btnHighlighted;
    document.getElementById("studentsBtn").className = btnNotHighlighted;
    document.getElementById("historyBtn").className = btnNotHighlighted;

    // Clear "pendingFormsList" and hide other pages
    document.getElementById("pendingFormsList").innerHTML = '';
    document.getElementById("studentsPage").style.display = "none";
    document.getElementById("historyPage").style.display = "none";

    // Update the page's title
    document.getElementById("pageTitle").innerHTML = "Pending Forms";

    const facultyID = getUserName();
    getStudentFormsByReferenceList("dashboardPage", "pendingFormsList", facultyID, "pendingForms", displayFormApproveMode);

    // Unhide "dashboardPage"
    document.getElementById("dashboardPage").style.display = "block";
}

function gotoStudents () {
    // Highlight only the students button, because it is selected
    document.getElementById("dashboardBtn").className = btnNotHighlighted;
    document.getElementById("studentsBtn").className = btnHighlighted;
    document.getElementById("historyBtn").className = btnNotHighlighted;

    // Clear elements and switch back to the search page
    displayStudentSearchListPage();

    // Clear "searchInput" and "studentsList" and hide other pages
    document.getElementById("dashboardPage").style.display = "none";
    document.getElementById("searchInput").value = '';
    document.getElementById("searchButton").style.visibility = "hidden";
    document.getElementById("studentsList").innerHTML = '';
    document.getElementById("historyPage").style.display = "none";

    // Update the page's title
    document.getElementById("pageTitle").innerHTML = "Find Students Records";

    // Unhide "studentsPage" and put focus on the "searchInput"
    document.getElementById("studentsPage").style.display = "block";
    document.getElementById("searchInput").focus();
}

function gotoHistory () {
    // Highlight only the history button, because it is selected
    document.getElementById("dashboardBtn").className = btnNotHighlighted;
    document.getElementById("studentsBtn").className = btnNotHighlighted;
    document.getElementById("historyBtn").className = btnHighlighted;

    // Clear "formsHistoryList" and hide other pages
    document.getElementById("dashboardPage").style.display = "none";
    document.getElementById("studentsPage").style.display = "none";
    document.getElementById("formsHistoryList").innerHTML = '';

    // Update the page's title
    document.getElementById("pageTitle").innerHTML = "My Completed Forms";

    const facultyID = getUserName();
    /* Todo: call a function to populate all the forms in which this facultyID has signed into "formsHistoryList" */
    getStudentFormsByReferenceList("historyPage", "formsHistoryList", facultyID, "completedForms", displayFormReadModeByReference);

    // Unhide "historyPage"
    document.getElementById("historyPage").style.display = "block";
}
