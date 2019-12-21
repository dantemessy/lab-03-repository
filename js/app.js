'use strict'

$('document').ready(function () {
  let seen = [];

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


  //the render ;
  Pic.prototype.render = function () {
    let template = $(templateId).html();
    let templateRender = Handlebars.compile(template);
    $('#photo').append(templateRender(this));
  };


  //read the data from the json file ;
  $('#page1').on('click', showImages);
  $('#page2').on('click', showImages2);


  function showImages() {
    // let seen = [];
    seen = [];
    console.log(seen)
    $('#photo').html('');
    $('#select').html('');
    // console.log('page1');
    $.get(`/data/page-1.json`)
      .then((data) => {
        data.forEach((photo) => {
          let pic = new Pic(photo);
          pic.render();

          if (!(seen.includes(photo.keyword))) {
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

    })
  }


  ////////// page2

  function showImages2() {
    $('#photo').html('');
    seen = [];
    $('#select').html('');
    // let seen2 = [];
    console.log(seen)
    // console.log('page2');

    $.get(`/data/page-2.json`)
      .then((data) => {
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

    })
  }

  $('document').ready(showImages);
});
