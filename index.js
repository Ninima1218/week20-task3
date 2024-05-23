document.addEventListener("DOMContentLoaded", function() {
    const tasksContainer = document.getElementById('tasks');
    const projectContainer = document.getElementById('project');
    const notificationsContainer = document.getElementById('notifications');

    // Function to create task HTML
    function createTaskHTML(task) {
        return `
            <li class="list-group-item">
                <h5 class="mb-1">${task.title}</h5>
                <p class="mb-1">${task.description}</p>
            </li>
        `;
    }

    // Function to add task HTML to container
    function addTaskToContainer(container, taskHTML) {
        container.insertAdjacentHTML('beforeend', taskHTML);
    }

    // Function to create project HTML
    function createProjectHTML(project) {
        return `
            <div class="mb-2">
                <h5 class="mb-1">${project.name}</h5>
                <p class="mb-1">Deadline: ${project.deadline}</p>
            </div>
        `;
    }

    // Function to add project HTML to container
    function addProjectToContainer(container, projectHTML) {
        container.insertAdjacentHTML('beforeend', projectHTML);
    }

    // Function to create notification HTML
    function createNotificationHTML(notification) {
        return `
            <div class="mb-2">
                <p class="mb-1">${notification.message}</p>
            </div>
        `;
    }

    // Function to add notification HTML to container
    function addNotificationToContainer(container, notificationHTML) {
        container.insertAdjacentHTML('beforeend', notificationHTML);
    }

    // Fetch JSON data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const { tasks, projects, notifications } = data;

            // Add tasks to the DOM
            tasks.forEach(task => {
                const taskHTML = createTaskHTML(task);
                addTaskToContainer(tasksContainer, taskHTML);
            });

            // Add projects to the DOM
            projects.forEach(project => {
                const projectHTML = createProjectHTML(project);
                addProjectToContainer(projectContainer, projectHTML);
            });

            // Add notifications to the DOM
            notifications.forEach(notification => {
                const notificationHTML = createNotificationHTML(notification);
                addNotificationToContainer(notificationsContainer, notificationHTML);
            });

            // Chart.js setup
            const ctx = document.getElementById('taskChart').getContext('2d');
            const taskChart = new Chart(ctx, {
                type: 'bar', // Example chart type
                data: {
                    labels: tasks.map(task => task.title), // Use task titles as labels
                    datasets: [{
                        label: '# of Tasks',
                        data: tasks.map((task, index) => index + 1), // Example data
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error loading data:', error));
});