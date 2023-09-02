import './style/style.css'
import { getRandomInt, getInsertionPosition } from './helpers'

let COUNT = 50,
  DELAY_TIME = 0,
  SHOW_NUMBERS = 0,
  IS_SORTING = 0

let mainArray = Array(COUNT).fill(0)

// DOM
const mainDom = document.querySelector('main')
const barCountInput = document.getElementById('count')
const delayInput = document.getElementById('delay')
const selectAlgoDom = document.getElementById('algo-select')
const randomizeButton = document.getElementById('randomize-btn')


barCountInput.value = COUNT
delayInput.value = DELAY_TIME

barCountInput.onchange = (e) => {
  if (!IS_SORTING) {
    COUNT = +e.target.value
    mainArray = Array(COUNT).fill(0)
    render()
    randomize()
  }
}

delayInput.onchange = (e) => {
  DELAY_TIME = +e.target.value
}

// ===================== Helpers =====================

async function render() {
  mainDom.innerHTML = ''
  mainArray.forEach((e, i) => {
    mainDom.innerHTML += `<div id="bar-${i}" class="bar" style="height: ${e}%">${SHOW_NUMBERS ? e : ''}</div>`
  })
}

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

function randomize() {
  console.log('ran')
  mainArray.forEach((e, i) => {
    mainArray[i] = getRandomInt()
    setBarHeight(i, mainArray[i])
  })
}

async function sleep(time = DELAY_TIME) {
  await new Promise((r) => setTimeout(r, time))
}

function swap(xp, yp) {
  let temp = mainArray[xp]
  mainArray[xp] = mainArray[yp]
  mainArray[yp] = temp
}

// ===================== Sorting =====================

async function selectionSort() {
  IS_SORTING = 1

  for (let i = 0; i < COUNT - 1; i++) {
    let mini = i
    for (let j = i + 1; j < COUNT; j++) {
      await sleep()
      setBarColor(j, 1)

      if (mainArray[j] < mainArray[mini]) mini = j
    }

    setBarHeight(i, mainArray[mini])
    setBarHeight(mini, mainArray[i])

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

      if (mainArray[i] > mainArray[i + 1]) {
        swap(i, i + 1)
        setBarHeight(i, mainArray[i])
        setBarHeight(i + 1, mainArray[i + 1])
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
      if (mainArray[i] > mainArray[i + 1]) {
        await sleep()
        swap(i, i + 1)
        setBarHeight(i, mainArray[i])
        setBarHeight(i + 1, mainArray[i + 1])
        c = true
      }

      setBarColor(i + 1, 1)
    }

    for (let i = 0; i <= COUNT - 2; i += 2) {
      if (mainArray[i] > mainArray[i + 1]) {
        await sleep()
        swap(i, i + 1)
        setBarHeight(i, mainArray[i])
        setBarHeight(i + 1, mainArray[i + 1])
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
    const num = mainArray[i]
    const position = getInsertionPosition(i, num, mainArray)
    const numb = mainArray[position]

    setBarColor(i, 1)

    await sleep()

    mainArray.splice(i, 1)
    mainArray.splice(position, 0, num)

    setBarHeight(i, numb)
    setBarHeight(position, mainArray[position])

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

    key = mainArray[i]
    j = i - 1

    setBarColor(i, 1)

    while (j >= 0 && mainArray[j] > key) {
      await sleep()

      setBarColor(j, 1)

      mainArray[j + 1] = mainArray[j]
      setBarHeight(j + 1, mainArray[j + 1])
      j = j - 1
    }

    mainArray[j + 1] = key

    setBarHeight(j + 1, key)
  }

  IS_SORTING = 0
  setBarColor(0, 0)
}

async function cocktailShakerSort() {
  let swapped = true
  let start = 0
  let end = mainArray.length

  while (swapped) {
    swapped = false

    for (let i = start; i < end - 1; ++i) {
      setBarColor(i, 1)
      if (mainArray[i] > mainArray[i + 1]) {
        await sleep()

        swap(i, i + 1)

        setBarHeight(i, mainArray[i])
        setBarHeight(i + 1, mainArray[i + 1])

        swapped = true
      }
    }

    if (!swapped) break
      ; (swapped = false), end--

    for (let i = end - 1; i >= start; i--) {
      setBarColor(i, 1)

      if (mainArray[i] > mainArray[i + 1]) {
        await sleep()

        swap(i, i + 1)

        setBarHeight(i, mainArray[i])
        setBarHeight(i + 1, mainArray[i + 1])
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
    freq[mainArray[i]]++
  }

  let p = 0

  for (let j = 0; j < freq.length; j++) {
    await sleep()
    for (let i = 0; i < freq[j]; i++) {

      setBarHeight(p, j)
      setBarColor(p, 1)

      mainArray[p++] = j

    }
  }

  IS_SORTING = 0
  setBarColor(0, 0)
}

async function shellSort() {
  IS_SORTING = 1

  let gap = 1;

  while (gap * 3 + 1 < mainArray.length)
    gap = gap * 3 + 1

  while (gap > 0) {

    for (let i = gap; i < mainArray.length; i++) {
      let j = i;

      while (j > 0 && mainArray[j] <= mainArray[j - gap]) {

        setBarColor(j, 1)
        setBarColor(j - gap, 1)

        await sleep();
        swap(j, j - gap);

        setBarHeight(j, mainArray[j])
        setBarHeight(j - gap, mainArray[j - gap])

        setBarColor(j, 0)
        setBarColor(j - gap, 0)

        j -= gap;
      }
    }
    gap = Math.floor((gap - 1) / 3)
  }
  IS_SORTING = 0
}

async function heapSort() {
  IS_SORTING = 1
  async function buildMaxHeap(a) {
    const len = a.length;
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
      await heapify(a, len, i);
    }
  }

  async function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      setBarColor(i, 1)
      setBarColor(largest, 1)
      await sleep();
      swap(i, largest);

      setBarHeight(i, mainArray[i])
      setBarHeight(largest, mainArray[largest])

      setBarColor(i, 0)
      setBarColor(largest, 0)

      await heapify(arr, n, largest);
    }
  }

  const n = mainArray.length;

  await buildMaxHeap(mainArray);

  for (let i = n - 1; i > 0; i--) {
    setBarColor(0, 1)
    setBarColor(i, 1)
    await sleep();
    swap(0, i);

    setBarHeight(0, mainArray[0])
    setBarHeight(i, mainArray[i])

    setBarColor(0, 0)
    setBarColor(i, 0)
    await heapify(mainArray, i, 0);
  }
  IS_SORTING = 0
}

async function quickSort(left = 0, right = mainArray.length - 1) {
  if (left < right) {
    const partitionIndex = await partition(mainArray, left, right);

    await quickSort(left, partitionIndex - 1);
    await quickSort(partitionIndex + 1, right);
  }
}

async function partition(arr, left, right) {
  const pivot = arr[right];

  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(i, j);
      setBarHeight(i, arr[i])
      setBarHeight(j, arr[j])
    }
    await sleep()
  }

  swap(i + 1, right);
  setBarHeight(i + 1, arr[i + 1])
  setBarHeight(right, arr[right])
  return i + 1;
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
  Shell: shellSort,
  Heap: heapSort,
  Quick: quickSort
}

const algoTCMap = {
  selection: 'n*n',
  bubble: 'n*n',
  'Odd Even': 'n*n',
  Cocktail: 'n*n',
  insertion: 'n*n',
  'Binary Insertion': 'n*log(n)',
  frequency: 'n',
  Shell: 'n*log(n)',
  Heap: 'n*log(n)',
  Quick: 'n*log(n)',
}

function initButtons() {
  randomizeButton.addEventListener('click', randomize)

  Object.entries(algosMap).forEach(([name, fn]) => {
    selectAlgoDom.innerHTML += `
      <option
        value="${name}"
      >
        ${name} Sort
      </option>
    `
  })

  selectAlgoDom.addEventListener('change', (e) => {
    startSort(e.target.value)
  })
}

async function startSort(algo) {
  selectAlgoDom.disabled = true
  randomizeButton.disabled = true
  
  document.querySelector('#tc').innerHTML = algoTCMap[algo]
  await algosMap[algo]()

  randomizeButton.disabled = false
  selectAlgoDom.disabled = false  
}

initButtons()
render()
randomize()
