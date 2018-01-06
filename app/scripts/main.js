$(() => {
  $.ajax({
    url: './scripts/config.json',
  }).done((result) => {
    console.log('result', result);
  })
})
