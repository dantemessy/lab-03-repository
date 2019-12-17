'use strict'


$('document').ready(function () {

  let templateId = '#template1';
  let keysArr = [];

  function Pic(data) {

    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;

    keysArr.push(this.keyword);
  }

  console.log(keysArr);



  //here the render ;

  Pic.prototype.render = function () {

    let template = $(templateId).html();
    let templateRender = Handlebars.compile(template);
    $('#photo').append(templateRender(this));
    // let renderClone = $('<div><h1></h1> <img/> <p></p></div>').clone();
    // renderClone.find('h1').text(this.title);
    // renderClone.find('img').attr('src', this.image_url);
    // renderClone.find('p').text(this.description);
    // renderClone.addClass(this.keyword);

    // $('#photo').append(renderClone);

    // renderOp.find('option').text(this.keyword);
    // let renderOp = $(`<option> ${this.keyword} </option>`)
  };


  //read the data from the json file ;
  $.get('/data/page-1.json')
    .then((data) => {

      let seen = [];

      data.forEach((photo) => {
        let pic = new Pic(photo);
        pic.render();

        if (!seen.includes(photo.keyword)) {
          let renderOp = $(`<option value = ${photo.keyword}> ${photo.keyword} </option>`)
          seen.push(photo.keyword);
          renderOp.html();
          $('#select').append(renderOp);
        }

      });
    });

  $('#select').on('change', (work) => {
    let optionEl = work.target.value;
    $('div').hide();
    $(`.${optionEl}`).fadeIn(500);
    console.log(optionEl);

  })
  // The new page
  $('#page2').on('click', () => {

    $.get('/data/page-2.json')
      .then((data2) => {

        let seenPage2 = [];
        console.log(data2)

        data2.forEach((photo) => {
          let pic = new Pic(photo);
          pic.render();

          if (!seenPage2.includes(photo.keyword)) {
            let renderOp = $(`<option value = ${photo.keyword}> ${photo.keyword} </option>`)
            seenPage2.push(photo.keyword);
            renderOp.html();
            $('#select').append(renderOp);
          }

        });
      });

    $('#select').on('change', (work) => {
      let optionEl = work.target.value;
      $('div').hide();
      $(`.${optionEl}`).fadeIn(500);
      console.log(optionEl);

    })
  })


  /////////////////////////////////////
});
