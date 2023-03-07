let COUNT = 20,
  DELAY_TIME = 0,
  SHOW_NUMBER = 0,
  IS_SORTING = 0

let a = Array(COUNT).fill(0)

// DOM
const mainDom = document.querySelector('main')
const barCountInput = document.querySelector('#count')
const delayInput = document.querySelector('#delay')
const buttonsContainer = document.querySelector('#buttons')

barCountInput.value = COUNT
delayInput.value = DELAY_TIME

barCountInput.onchange = (e) => {
  if (!IS_SORTING) {
    COUNT = +e.target.value
    a = Array(COUNT).fill(0)
    randomize()
  }
}

delayInput.onchange = (e) => {
  DELAY_TIME = +e.target.value
}

// ===================== Helpers =====================

const helpers = {
  render: async () => {
    mainDom.innerHTML = ''
    ar.forEach((e, i) => {
      mainDom.innerHTML += `<div id="bar-${i}" class="bar" style="height: ${e}%">${
        SHOW_NUMBER ? e : ''
      }</div>`
    })
  },
  getInsertionPosition: (size, num, arr = a) => {
    let left = 0,
      right = size - 1,
      mid

    while (left <= right) {
      mid = Math.floor((left + right) / 2)

      if (arr[mid] === num) return mid
      else if (arr[mid] < num) left = mid + 1
      else right = mid - 1
    }

    return left
  },
}

async function render() {
  mainDom.innerHTML = ''
  a.forEach((e, i) => {
    mainDom.innerHTML += `<div id="bar-${i}" class="bar" style="height: ${e}%">${
      SHOW_NUMBER ? e : ''
    }</div>`
  })
}

const gen = (min = 1, max = 100) => Math.floor(Math.random() * max - min) + min

function setBarHeight(index, height) {
  document.querySelector(`#bar-${index}`).style.height = height + '%'
  SHOW_NUMBER && (document.querySelector(`#bar-${index}`).innerHTML = height)
}

function setBarColor(index, active) {
  document.querySelectorAll('.bar').forEach((e) => {
    if (e.style.backgroundColor === 'red') e.style.backgroundColor = ''
  })
  document.querySelector(`#bar-${index}`).style.backgroundColor = active
    ? 'red'
    : ''
}

function randomize() {
  a.forEach((e, i) => {
    a[i] = gen()
  })
  render()
}

async function sleep(time = DELAY_TIME) {
  // if(time > 0)
  await new Promise((r) => setTimeout(r, time))
}

function swap(xp, yp) {
  let temp = a[xp]
  a[xp] = a[yp]
  a[yp] = temp
}

// ===================== Sorting =====================
async function selectionSort() {
  IS_SORTING = 1

  for (let i = 0; i < COUNT - 1; i++) {
    let mini = i
    for (let j = i + 1; j < COUNT; j++) {
      await sleep()
      setBarColor(j, 1)

      if (a[j] < a[mini]) mini = j
    }

    setBarHeight(i, a[mini])
    setBarHeight(mini, a[i])

    swap(i, mini)
  }

  setBarColor(COUNT - 1, 0)

  IS_SORTING = 0
}

async function bubbleSort() {
  IS_SORTING = 1

  while (true) {
    let c = false

    for (let i = 0; i < COUNT - 1; i++) {
      await sleep()
      setBarColor(i, 1)

      if (a[i] > a[i + 1]) {
        swap(i, i + 1)
        setBarHeight(i, a[i])
        setBarHeight(i + 1, a[i + 1])
        c = true
      }

      setBarColor(i + 1, 1)
    }

    if (!c) break
  }

  setBarColor(COUNT - 1, 0)

  IS_SORTING = 0

  render()
}

async function oddEvenSort() {
  IS_SORTING = 1

  while (true) {
    let c = false

    for (let i = 1; i <= COUNT - 2; i += 2) {
      if (a[i] > a[i + 1]) {
        await sleep()
        swap(i, i + 1)
        setBarHeight(i, a[i])
        setBarHeight(i + 1, a[i + 1])
        c = true
      }

      setBarColor(i + 1, 1)
    }

    for (let i = 0; i <= COUNT - 2; i += 2) {
      await sleep()
      if (a[i] > a[i + 1]) {
        swap(i, i + 1)
        setBarHeight(i, a[i])
        setBarHeight(i + 1, a[i + 1])
        c = true
      }

      setBarColor(i + 1, 1)
    }

    if (!c) break
  }

  setBarColor(COUNT - 1, 0)

  IS_SORTING = 0

  render()
}

async function insertionSort() {
  for (let i = 1; i < COUNT; i++) {
    const num = a[i]
    const position = helpers.getInsertionPosition(i, num)
    const numb = a[position]

    setBarColor(i, 1)

    await sleep()

    a.splice(i, 1)
    a.splice(position, 0, num)

    setBarHeight(i, numb)
    setBarHeight(position, a[position])

    render()

    console.log(a)
  }
}

// MAIN

const algosMap = {
  selection: selectionSort,
  bubble: bubbleSort,
  'Odd Even': oddEvenSort,
  'Binary insertion': insertionSort,
}

;(function initButtons() {
  Object.entries(algosMap).forEach(([name, fn]) => {
    buttonsContainer.innerHTML += `
      <button
        algo="${name}"
        onClick="startSort('${name}')"
        class="px-4 py-2 text-sm bg-blue-500 capitalize hover:bg-blue-600 text-white disabled:bg-blue-800 disabled:cursor-not-allowed"
      >
        ${name} Sort
      </button>
    `
  })
})()

async function startSort(algo) {
  const algoButtons = document.querySelectorAll('button')

  algoButtons.forEach((ele) => (ele.disabled = true))
  await algosMap[algo]()
  algoButtons.forEach((ele) => (ele.disabled = false))
}

randomize()
