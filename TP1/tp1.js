const fs = require('fs').promises;
const filePath = 'tasks.json';

// Initialisation de la liste des tâches
let tasks = [];

// Charger les tâches depuis un fichier
async function loadTasks() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        tasks = JSON.parse(data);
    } catch (error) {
        tasks = [];
    }
}

// Sauvegarder les tâches dans un fichier
async function saveTasks() {
    await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
}

// Ajouter une tâche
async function addTask(title) {
    tasks.push({ title, completed: false });
    await saveTasks();
    console.log(`Tâche ajoutée: ${title}`);
}

// Afficher toutes les tâches
function displayTasks() {
    tasks.map((task, index) => {
        console.log(`${index + 1}. [${task.completed ? 'X' : ' '}] ${task.title}`);
    });
}

// Marquer une tâche comme terminée
async function completeTask(index) {
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = true;
        await saveTasks();
        console.log(`Tâche complétée: ${tasks[index].title}`);
    } else {
        console.log("Index invalide.");
    }
}

// Supprimer une tâche
async function removeTask(index) {
    if (index >= 0 && index < tasks.length) {
        const removedTask = tasks.splice(index, 1);
        await saveTasks();
        console.log(`Tâche supprimée: ${removedTask[0].title}`);
    } else {
        console.log("Index invalide.");
    }
}

// Fonction principale pour tester
async function main() {
    await loadTasks();
    await addTask("Apprendre Node.js");
    await addTask("Faire les courses");
    displayTasks();
    await completeTask(0);
    displayTasks();
    await removeTask(1);
    displayTasks();
}

main();