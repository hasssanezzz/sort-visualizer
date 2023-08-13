let COUNT = 50,
  DELAY_TIME = 0,
  SHOW_NUMBERS = 0,
  IS_SORTING = 0

let a = Array(COUNT).fill(0)

// DOM
const mainDom = document.querySelector('main')
const barCountInput = document.querySelector('#count')
const delayInput = document.querySelector('#delay')
const buttonsContainer = document.querySelector('#buttons')
const showNumbersCheckbox = document.querySelector('#show-numbers')

barCountInput.value = COUNT
delayInput.value = DELAY_TIME

barCountInput.onchange = (e) => {
  if (!IS_SORTING) {
    COUNT = +e.target.value
    a = Array(COUNT).fill(0)
    render()
    randomize()
  }
}

delayInput.onchange = (e) => {
  DELAY_TIME = +e.target.value
}

showNumbersCheckbox.onclick = (e) => {
  SHOW_NUMBERS = e.target.checked
  render()
}

// ===================== Helpers =====================

const helpers = {
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
      SHOW_NUMBERS ? e : ''
    }</div>`
  })
}

const gen = (min = 1, max = 100) => Math.floor(Math.random() * max - min) + min

function setBarHeight(index, height) {
  document.querySelector(`#bar-${index}`).style.height = height + '%'
  SHOW_NUMBERS && (document.querySelector(`#bar-${index}`).innerHTML = height)
}

function setBarColor(index, active) {
  document.querySelectorAll('.bar').forEach((e) => {
    if (e.style.backgroundColor === 'red') e.style.backgroundColor = ''
  })
  document.querySelector(`#bar-${index}`).style.backgroundColor = active
    ? 'red'
    : ''
}

render()
function randomize() {
  a.forEach((e, i) => {
    a[i] = gen()
    setBarHeight(i, a[i])
  })
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

  setBarColor(0, 0)

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

  setBarColor(0, 0)

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
      if (a[i] > a[i + 1]) {
        await sleep()
        swap(i, i + 1)
        setBarHeight(i, a[i])
        setBarHeight(i + 1, a[i + 1])
        c = true
      }

      setBarColor(i + 1, 1)
    }

    if (!c) break
  }

  setBarColor(0, 0)

  IS_SORTING = 0

  render()
}

async function binartInsertionSort() {
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
  }
}

async function insertionSort() {
  IS_SORTING = 1

  let i,
    key,
    j,
    n = COUNT

  for (i = 1; i < n; i++) {
    await sleep()

    key = a[i]
    j = i - 1

    setBarColor(i, 1)

    while (j >= 0 && a[j] > key) {
      await sleep()

      setBarColor(j, 1)

      a[j + 1] = a[j]
      setBarHeight(j + 1, a[j + 1])
      j = j - 1
    }

    a[j + 1] = key

    setBarHeight(j + 1, key)
  }

  IS_SORTING = 0
  setBarColor(0, 0)
}

async function cocktailShakerSort() {
  let swapped = true
  let start = 0
  let end = a.length

  while (swapped) {
    swapped = false

    for (let i = start; i < end - 1; ++i) {
      setBarColor(i, 1)
      if (a[i] > a[i + 1]) {
        await sleep()

        swap(i, i + 1)

        setBarHeight(i, a[i])
        setBarHeight(i + 1, a[i + 1])

        swapped = true
      }
    }

    if (!swapped) break
    ;(swapped = false), end--

    for (let i = end - 1; i >= start; i--) {
      setBarColor(i, 1)

      if (a[i] > a[i + 1]) {
        await sleep()

        swap(i, i + 1)

        setBarHeight(i, a[i])
        setBarHeight(i + 1, a[i + 1])
        swapped = true
      }
    }

    start++
  }

  setBarColor(0, 0)
}

async function frequencySort() {
  IS_SORTING = 1

  const freq = Array(100).fill(0)

  for (let i = 0; i < COUNT; i++) {
    await sleep()

    setBarColor(i, 1)
    freq[a[i]]++
  }

  let p = 0

  for (let j = 0; j < freq.length; j++) {
    await sleep()
    for (let i = 0; i < freq[j]; i++) {

      setBarHeight(p, j)
      setBarColor(p, 1)

      a[p++] = j

    }
  }

  IS_SORTING = 0
  setBarColor(0, 0)
}

async function shellSort() {
  IS_SORTING = 1

  let gap = 1;

  while(gap * 3 + 1 < a.length)
    gap  = gap * 3 + 1

  while(gap > 0){

    for (let i = gap; i < a.length; i++) {
      let j = i;

      while (j > 0 && a[j] <= a[j - gap]) {

        setBarColor(j, 1)
        setBarColor(j - gap, 1)

	await sleep();
	swap(j, j - gap);

        setBarHeight(j, a[j])
        setBarHeight(j - gap, a[j - gap])

        setBarColor(j, 0)
        setBarColor(j - gap, 0)

	j-=gap;
      }
    }
    gap = Math.floor((gap - 1)/3)
  }
  IS_SORTING = 0
}

// MAIN

const algosMap = {
  selection: selectionSort,
  bubble: bubbleSort,
  'Odd Even': oddEvenSort,
  Cocktail: cocktailShakerSort,
  insertion: insertionSort,
  'Binary Insertion': binartInsertionSort,
  frequency: frequencySort,
  shellSort: shellSort,
}

const algosTCMap = {
  selection: selectionSort,
  bubble: bubbleSort,
  'Odd Even': oddEvenSort,
  Cocktail: cocktailShakerSort,
  insertion: insertionSort,
  'Binary Insertion': binartInsertionSort,
  'Shell': shellSort,
}

const algoTCMap = {
  selection: 'n*n',
  bubble: 'n*n',
  'Odd Even': 'n*n',
  Cocktail: 'n*n',
  insertion: 'n*n',
  'Binary Insertion': 'n*log(n)',
  frequency: 'n',
  shellSort: 'complexity is dependent on the size of array and gap',
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
  document.querySelector('#tc').innerHTML = algoTCMap[algo]
  await algosMap[algo]()
  algoButtons.forEach((ele) => (ele.disabled = false))
}

randomize()
