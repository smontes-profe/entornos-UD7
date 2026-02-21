// Initialize Mermaid
mermaid.initialize({
    startOnLoad: true,
    theme: 'dark',
    securityLevel: 'loose',
    logLevel: 1,
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' },
    themeVariables: {
        primaryColor: '#005088',
        primaryTextColor: '#fff',
        primaryBorderColor: '#0070c0',
        lineColor: '#10b981',
        secondaryColor: '#1e293b',
        tertiaryColor: '#0f172a'
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('mermaid-input');
    const preview = document.getElementById('mermaid-render');
    const status = document.getElementById('render-status');
    const resetBtn = document.getElementById('reset-code');

    const defaultCode = editor.value;

    let debounceTimer;

    const renderDiagram = async () => {
        const code = editor.value;
        
        // Show updating status
        status.textContent = 'Actualizando...';
        status.className = 'status-indicator updating';

        try {
            // Clear previous render
            preview.innerHTML = '';
            
            // Generate unique ID for this render
            const id = 'mermaid-' + Math.round(Math.random() * 10000);
            
            // Render new diagram
            const { svg } = await mermaid.render(id, code);
            preview.innerHTML = svg;
            
            status.textContent = 'Listo';
            status.className = 'status-indicator';
        } catch (error) {
            console.error('Mermaid render error:', error);
            status.textContent = 'Error de Sintaxis';
            status.className = 'status-indicator error';
            
            // Don't clear the preview if there's an error, or show a subtle message
            // preview.innerHTML = '<p style="color:red">Error en el código. Revisa la sintaxis.</p>';
        }
    };

    // Initial render
    renderDiagram();

    // Event listener for typing
    editor.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(renderDiagram, 500); // 500ms debounce
    });

    // Reset functionality
    resetBtn.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres reiniciar el código?')) {
            editor.value = defaultCode;
            renderDiagram();
        }
    });

    // Handle interactive cards - optional micro-animations or highlights
    const cards = document.querySelectorAll('.anatomy-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Could add logic to highlight elements if we had a main diagram
        });
    });
});
