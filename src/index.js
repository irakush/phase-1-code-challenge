// your code here

const url = 'http://localhost:3000/cakes'

const nav = document.querySelector('#cake-list')

const cakeName = document.querySelector('#cake-name')
const cakeImage = document.querySelector('#cake-image')
const cakeDescription = document.querySelector('#cake-description')

const formReview = document.querySelector('#review-form')
const cakeReviews = document.querySelector('#review-list')
const formDescription = document.querySelector('#description-form')
const formTextDescription = document.querySelector('#description')
// const textArea = document.querySelector('#review')

let currentCake

function getCakes() {
  return fetch(url)
  .then(res => res.json())
}

getCakes().then(cakesData => {
  console.log(cakesData)

  showNavBar(cakesData)
  showCakeDetails(cakesData[0])
  addReview()
  updateCake()
})

function showNavBar(cakesData){
  nav.innerHTML = ""

  cakesData.forEach(cake => {
    const li = document.createElement('li')

    li.textContent = cake.name
    nav.append(li)

    li.addEventListener('click', () => showCakeDetails(cake))
  })
}

function showCakeDetails(cake) {
  currentCake = cake

  cakeName.textContent = cake.name
  cakeImage.src = cake.image_url
  cakeDescription.textContent = cake.description

  if (cake.reviews) {
    cakeReviews.innerHTML = ""

    cake.reviews.map(review => {
      const li = document.createElement('li')
      li.textContent = review
      cakeReviews.append(li)

      li.addEventListener('click', () => li.remove())
    })
  }
}

function addReview() {
  formReview.addEventListener('submit', (e) => {
    e.preventDefault()
    const li = document.createElement('li')

    li.textContent = e.target.review.value
    cakeReviews.append(li)

    li.addEventListener('click', () => li.remove())

    currentCake.reviews.push(e.target.review.value)
    patchCake().then(data => console.log(data))
    formReview.reset()
  })
}

function updateCake() {
  formDescription.addEventListener('submit', (e) => {
    e.preventDefault()

    cakeDescription.textContent = e.target.description.value
    formDescription.reset()
  })
}

function patchCake(){
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(currentCake)
  }
  console.log('PATCH: ', currentCake)
  return fetch(url + `/${currentCake.id}`, options)
  .then(res => res.json())  
}