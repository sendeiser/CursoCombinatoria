// Funcionalidad para ejercicios interactivos
document.addEventListener('DOMContentLoaded', function() {
    // Manejar formularios de ejercicios
    const exerciseForms = document.querySelectorAll('.exercise form, .quiz form');
    
    exerciseForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener el ID del ejercicio
            const exerciseId = this.getAttribute('data-exercise-id');
            
            // Obtener las respuestas del usuario
            const userAnswers = getUserAnswers(this);
            
            // Verificar respuestas
            const result = checkAnswers(exerciseId, userAnswers);
            
            // Mostrar retroalimentación
            showFeedback(this, result);
        });
    });
    
    // Función para obtener respuestas del usuario según el tipo de pregunta
    function getUserAnswers(form) {
        const answers = {};
        
        // Procesar inputs de texto y número
        form.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
            answers[input.name] = input.value.trim();
        });
        
        // Procesar selects
        form.querySelectorAll('select').forEach(select => {
            answers[select.name] = select.value;
        });
        
        // Procesar radios
        form.querySelectorAll('input[type="radio"]:checked').forEach(radio => {
            answers[radio.name] = radio.value;
        });
        
        // Procesar checkboxes
        form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            if (!answers[checkbox.name]) {
                answers[checkbox.name] = [];
            }
            
            if (checkbox.checked) {
                answers[checkbox.name].push(checkbox.value);
            }
        });
        
        return answers;
    }
    
    // Función para verificar respuestas (simulada - se implementará con respuestas reales)
    function checkAnswers(exerciseId, userAnswers) {
        // Aquí se implementará la lógica para verificar respuestas según el ejercicio
        // Por ahora, devolvemos un objeto simulado
        
        // Ejemplo de estructura de respuestas correctas (se reemplazará con datos reales)
        const correctAnswers = {
            'exercise1': {
                'q1': '6',
                'isCorrect': function(userAnswers) {
                    return userAnswers.q1 === '6';
                },
                'feedback': 'La respuesta correcta es 6 porque hay 3! = 6 formas de ordenar 3 elementos.'
            },
            'exercise2': {
                'q1': ['a', 'c'],
                'isCorrect': function(userAnswers) {
                    if (!userAnswers.q1 || !Array.isArray(userAnswers.q1)) return false;
                    return userAnswers.q1.includes('a') && userAnswers.q1.includes('c') && userAnswers.q1.length === 2;
                },
                'feedback': 'Las respuestas correctas son A y C.'
            },
            // Más ejercicios se agregarán aquí
        };
        
        const exercise = correctAnswers[exerciseId];
        
        if (!exercise) {
            return {
                isCorrect: false,
                feedback: 'Error: Ejercicio no encontrado.'
            };
        }
        
        const isCorrect = exercise.isCorrect(userAnswers);
        
        return {
            isCorrect: isCorrect,
            feedback: exercise.feedback
        };
    }
    
    // Función para mostrar retroalimentación
    function showFeedback(form, result) {
        // Eliminar retroalimentación anterior
        const oldFeedback = form.querySelector('.feedback');
        if (oldFeedback) {
            oldFeedback.remove();
        }
        
        // Crear elemento de retroalimentación
        const feedback = document.createElement('div');
        feedback.className = `feedback ${result.isCorrect ? 'correct' : 'incorrect'}`;
        feedback.textContent = result.feedback;
        feedback.style.display = 'block';
        
        // Agregar al formulario
        form.appendChild(feedback);
        
        // Desplazarse a la retroalimentación
        feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Navegación entre secciones dentro de un módulo
    const sectionLinks = document.querySelectorAll('.section-nav a');
    
    sectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Ocultar todas las secciones
                document.querySelectorAll('.module-section').forEach(section => {
                    section.style.display = 'none';
                });
                
                // Mostrar la sección objetivo
                targetSection.style.display = 'block';
                
                // Actualizar enlaces activos
                sectionLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // Desplazarse al inicio de la sección
                window.scrollTo({ top: targetSection.offsetTop - 100, behavior: 'smooth' });
            }
        });
    });
    
    // Inicializar la primera sección como visible si existe navegación por secciones
    if (sectionLinks.length > 0) {
        const firstSectionLink = sectionLinks[0];
        const firstSectionId = firstSectionLink.getAttribute('href').substring(1);
        const firstSection = document.getElementById(firstSectionId);
        
        if (firstSection) {
            document.querySelectorAll('.module-section').forEach(section => {
                section.style.display = 'none';
            });
            
            firstSection.style.display = 'block';
            firstSectionLink.classList.add('active');
        }
    }
    
    // Seguimiento de progreso (simulado)
    const progressButtons = document.querySelectorAll('.mark-complete');
    
    progressButtons.forEach(button => {
        button.addEventListener('click', function() {
            const moduleId = this.getAttribute('data-module-id');
            const sectionId = this.getAttribute('data-section-id');
            
            // Simular guardado de progreso (se implementará con almacenamiento real)
            console.log(`Marcando como completado: Módulo ${moduleId}, Sección ${sectionId}`);
            
            // Actualizar UI
            this.textContent = 'Completado ✓';
            this.classList.add('completed');
            this.disabled = true;
            
            // Actualizar progreso en localStorage (ejemplo simple)
            saveProgress(moduleId, sectionId);
        });
    });
    
    // Función para guardar progreso en localStorage
    function saveProgress(moduleId, sectionId) {
        // Obtener progreso actual o inicializar
        let progress = JSON.parse(localStorage.getItem('courseProgress')) || {};
        
        // Inicializar módulo si no existe
        if (!progress[moduleId]) {
            progress[moduleId] = {};
        }
        
        // Marcar sección como completada
        progress[moduleId][sectionId] = true;
        
        // Guardar en localStorage
        localStorage.setItem('courseProgress', JSON.stringify(progress));
        
        // Actualizar indicadores de progreso en la UI
        updateProgressIndicators();
    }
    
    // Función para cargar y mostrar progreso guardado
    function loadProgress() {
        const progress = JSON.parse(localStorage.getItem('courseProgress')) || {};
        
        // Recorrer todos los botones de progreso y actualizar su estado
        progressButtons.forEach(button => {
            const moduleId = button.getAttribute('data-module-id');
            const sectionId = button.getAttribute('data-section-id');
            
            if (progress[moduleId] && progress[moduleId][sectionId]) {
                button.textContent = 'Completado ✓';
                button.classList.add('completed');
                button.disabled = true;
            }
        });
        
        // Actualizar indicadores de progreso
        updateProgressIndicators();
    }
    
    // Función para actualizar indicadores de progreso
    function updateProgressIndicators() {
        const progress = JSON.parse(localStorage.getItem('courseProgress')) || {};
        
        // Actualizar indicadores de progreso por módulo
        document.querySelectorAll('.progress-indicator').forEach(indicator => {
            const moduleId = indicator.getAttribute('data-module-id');
            
            if (progress[moduleId]) {
                const totalSections = document.querySelectorAll(`[data-module-id="${moduleId}"]`).length;
                const completedSections = Object.keys(progress[moduleId]).length;
                const percentComplete = Math.round((completedSections / totalSections) * 100);
                
                indicator.textContent = `${percentComplete}% completado`;
                
                // Actualizar barra de progreso si existe
                const progressBar = document.querySelector(`.progress-bar[data-module-id="${moduleId}"]`);
                if (progressBar) {
                    progressBar.style.width = `${percentComplete}%`;
                }
            }
        });
    }
    
    // Cargar progreso al iniciar
    loadProgress();
});
