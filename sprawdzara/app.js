setTimeout(() => {
  console.log('adjustments');
  document.querySelectorAll('*:not(img)').forEach(e => {
    e.width = "auto";

    if (e.style.backgroundColor == 'rgb(178, 236, 255)') {
      e.style.backgroundColor = 'rgb(153, 205, 50)';
      e.style.color = "white";
    } else if (e.style.backgroundColor != '' && e.classList.contains('score_correct')) {
      e.style.backgroundColor = 'rgb(255, 166, 0)';
      e.style.color = "white";
    }

    if (e.style.backgroundColor == 'rgb(255, 204, 204)') {
      e.style.backgroundColor = 'rgb(255, 68, 0)';
      e.style.color = "white";
    }


  }
  );
}, 100);


