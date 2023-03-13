let offset = 0;
const limit = 15;
let isFetchInProgress = false;

async function getResponse(offset) {
  const response = await fetch(`https://chocofood.kz/fast-hermes/v1/delivery_area_content/restaurants/?page=${(offset/limit)||1}&limit=${limit}&longitude=76.907176&latitude=43.237849`);
  const res = await response.json();
  const list = document.querySelector('.content');
  const newList = document.querySelector('.content2');
  const newList2 = document.querySelector('.content3');
  const newList3 = document.querySelector('.content4');
    const newList4 = document.querySelector('.content5');
  let key;
  for (key in res.result) {
    const b = res.result[key];



    const dType = b.restaurant.will_be_delivered_by;
    const newDtype = newImage(dType);

    const rating = b.restaurant.rating;
    const newRating = oldRating(rating);

    const newBlock = `
<div class="content">
        <div class="b img" id="block"><img id="block" class="image" src="${b.restaurant.image}"></div>
        <div class="b box" id="block">
          <div class="b title" id="block">${b.restaurant.title}</div>
          <div class="b block timeOfDelivery" id="block"><img id="block" class="mini" src="${newDtype}">  ${b.delivery.low_limit_minutes} - ${b.delivery.upper_limit_minutes} мин</div>
          <div class="b block rating" id="block"><img id="block" class="mini" src="https://chocofood.kz/_nuxt/img/rating-icon.9a10ee6.svg">${newRating}</div>
        </div>
      </div>
    `;

    const secondBlock = `
        <div class="b img2" ><img id="block" class="image2" src="${b.restaurant.image}">
        <div class="box2" >
          <div class="title2" >${b.restaurant.title}</div>
          <div class="block timeOfDelivery" ><img  class="mini" src="${newDtype}">  ${b.delivery.low_limit_minutes} - ${b.delivery.upper_limit_minutes} мин</div>
          <div class="block rating" ><img  class="mini" src="https://chocofood.kz/_nuxt/img/rating-icon.9a10ee6.svg">${newRating}</div>
        </div>
      </div>
      </div>`
      ;
    list.insertAdjacentHTML('beforeend', newBlock);
    newList.insertAdjacentHTML('beforeend', secondBlock);
    newList2.insertAdjacentHTML('beforeend', secondBlock);
    newList3.insertAdjacentHTML('beforeend', secondBlock);


  }
  const obs = document.querySelector('.observer');
  const options = {
    rootMargin: "1px",
    threshold: 1.0,
  };

  const observer = new IntersectionObserver(callback, options);

observer.observe(obs);

}



function initObserver(callback) {
  const obs = document.querySelector('.observer');

  const options = {
    rootMargin: "1px",
    threshold: 1.0,
  };



  const observer = new IntersectionObserver(callback, options);

  observer.observe(obs);
}



const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !isFetchInProgress && offset < 30) {
      isFetchInProgress = true;
      offset += limit
      getResponse(offset).then(() => {
        isFetchInProgress = false;
      });
    } else if (offset >= 150) {
      observer.disconnect();
    }
  });
};

function loadMoreContent() {
  if (!isFetchInProgress && offset < 30) {
    isFetchInProgress = true;
    offset += limit;
    getResponse(offset).then(() => {
      isFetchInProgress = false;
    });
  }
}

function newImage(deli) {
  if (deli === 'OD') {
    const od = new Image();
    od.src = 'https://chocofood.kz/images/mobile/main/vd-icon.svg'
    deli = od.src
  } else {
    const vd = new Image();
    vd.src = 'https://chocofood.kz/images/mobile/main/od-icon.svg'
    deli = vd.src
  }
  return deli;
}

function oldRating(rate) {
  const rates = rate / 20;
  return rates.toFixed(1)
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isFetchInProgress) {
        isFetchInProgress = true;
        loadMoreContent().then(() => {
          isFetchInProgress = false;
        });
      }
    });
  };
}

getResponse();

initObserver(callback);
