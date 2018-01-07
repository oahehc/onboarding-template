$(() => {
  $.ajax({
    url: './scripts/config.json',
  }).done((res) => {
    // load ga
    if (res.gaTrackingCode) {
      (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
        function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
        e=o.createElement(i);r=o.getElementsByTagName(i)[0];
        e.src='https://www.google-analytics.com/analytics.js';
        r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
        ga('create', res.gaTrackingCode);
        ga('send', 'pageview');
    }

    // form submit alert
    $('#submitBtn').on('click', function(){
      const name = $('#nameInput').val();
      const email = $('#emailInput').val();
      console.log('zzz', name, email);
      if (!name || !email) {
        $('.modal-body').text('請填寫姓名與電子郵件');
        $('#submitModal').modal('show');
      } else {
        $('.modal-body').text('資料已送出');
        $('#submitModal').modal('show');
        ga('send', 'event', 'apply', name + ' // ' + email);
      }
    })

    // add meta
    if (res.title) document.title = res.title;
    if (res.title) $('meta[property=og\\:title]').attr('content', res.title);
    if (res.keywords) $('meta[name=keywords]').attr('content', res.keywords);
    if (res.description) $('meta[name=description]').attr('content', res.description);
    if (res.description) $('meta[property=og\\:description]').attr('content', res.description);
    if (res.url) $('meta[property=og\\:url]').attr('content', res.url);
    if (res.ogImg) $('meta[property=og\\:image]').attr('content', './images/'+res.ogImg);
    if (res.shortcutIcon) $('link[rel="apple-touch-icon"]').attr('href', './images/'+res.shortcutIcon);
    if (res.shortcutIcon) $('link.shortcut').attr('href', './images/'+res.shortcutIcon);

    // create section
    if (res.applyDescription) $('.formSection > p').text(res.applyDescription);
    if (res.sections && res.sections.length>0) {
      const content = res.sections.reduce((ele, section) => {
        ele +=`
          <section style="background-image: url('./images/${section.image}')">
            <div class="title">${section.title}</div>
            <div class="description">${section.description}</div>
          </section>
        `;
        return ele
      }, '');
      $('.formSection').before(content);
    }
  })
})
