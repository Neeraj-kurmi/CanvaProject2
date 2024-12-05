
    // Initialize Swiper
    const swiper = new Swiper('.swiper-container', {
      slidesPerView: 1, // One slide visible at a time
      centeredSlides: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // Add draggable text functionality
    const addTextButton = document.getElementById('addText');
    const fontStyle = document.getElementById('fontStyle');
    const colorPicker = document.getElementById('colorPicker');
    const deleteTextButton = document.getElementById('deleteText');
    const resizeFontSizeInput = document.getElementById('resizeFontSize');

    let selectedElement = null;

    // Add new editable text
    addTextButton.addEventListener('click', () => {
      const currentSlide = document.querySelector('.swiper-slide-active .image-area');
      const text = document.createElement('div');
      text.contentEditable = true;
      text.className = 'draggable';
      text.style.fontFamily = fontStyle.value;
      text.style.color = colorPicker.value;
      text.innerText = 'New Text';
      text.style.top = '10px';
      text.style.left = '10px';
      currentSlide.appendChild(text);

      makeDraggable(text);
      selectElement(text);
    });

    // Change font style for the selected text
    fontStyle.addEventListener('change', () => {
      if (selectedElement) {
        selectedElement.style.fontFamily = fontStyle.value;
      }
    });

    // Change color for the selected text
    colorPicker.addEventListener('input', () => {
      if (selectedElement) {
        selectedElement.style.color = colorPicker.value;
      }
    });

    // Delete selected text
    deleteTextButton.addEventListener('click', () => {
      if (selectedElement) {
        selectedElement.remove();
        selectedElement = null;
      }
    });

    // Dynamically resize the font size of the selected text
    resizeFontSizeInput.addEventListener('input', () => {
      if (selectedElement) {
        const newFontSize = resizeFontSizeInput.value;
        selectedElement.style.fontSize = newFontSize + 'px';
      }
    });

    // Make elements draggable
    function makeDraggable(element) {
      element.addEventListener('mousedown', (e) => {
        selectedElement = element;
        selectElement(element);

        const parent = element.parentElement;
        const parentRect = parent.getBoundingClientRect();

        let offsetX = e.clientX - element.offsetLeft;
        let offsetY = e.clientY - element.offsetTop;

        const moveHandler = (e) => {
          let newX = e.clientX - offsetX;
          let newY = e.clientY - offsetY;

          // Boundary check
          newX = Math.max(0, Math.min(newX, parentRect.width - element.offsetWidth));
          newY = Math.max(0, Math.min(newY, parentRect.height - element.offsetHeight));

          element.style.left = `${newX}px`;
          element.style.top = `${newY}px`;
        };

        const upHandler = () => {
          document.removeEventListener('mousemove', moveHandler);
          document.removeEventListener('mouseup', upHandler);
        };

        document.addEventListener('mousemove', moveHandler);
        document.addEventListener('mouseup', upHandler);
      });

      element.addEventListener('click', () => {
        selectedElement = element;
        const currentFontSize = parseInt(window.getComputedStyle(element).fontSize);
        resizeFontSizeInput.value = currentFontSize;
      });
    }

    function selectElement(element) {
      document.querySelectorAll('.draggable').forEach((el) => {
        el.style.border = 'none';
      });
      element.style.border = '1px dashed #000';
    }
  