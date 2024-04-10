    // Function to load and render PDF document


    function renderPdfWithPageNumbers(pdfUrl) {
        const loadingTask = pdfjsLib.getDocument(pdfUrl);
  
        loadingTask.promise.then(pdf => {

            // Array to store rendered pages
          const renderedPages = [];
          // Iterate through each page of the PDF
          for (let i = 1; i <= pdf.numPages; i++) {
            // Render the page
            pdf.getPage(i).then(page => {
              const scale = 1.5;
              const viewport = page.getViewport({ scale });
  
              // Create a canvas element to render the page
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
  
              // Render the page content on the canvas
              const renderContext = {
                canvasContext: context,
                viewport: viewport
              };
              page.render(renderContext).promise.then(() => {
                // Add page number text to the canvas
                context.font = '16px Arial';
                context.fillStyle = 'black';
                context.fillText(`Page ${i} of ${pdf.numPages}`, 10, 20);
  
                // Add the canvas to the document body or display it as needed
                document.body.appendChild(canvas);
              });
            });
          }
        }).catch(error => {
          console.error('Error loading PDF:', error);
        });
      }
  
      // Call the function to render PDF with page numbers

      const pdfSource = "/The Person and Work of Christ - B. B. Warfield.pdf"
      renderPdfWithPageNumbers(pdfSource);