// pomodoro app
class Pomodoro {

  constructor() {
    this.time = 30
    this.minutes = this.time
    this.seconds = 0
    this.activity = 'Work'

    this.updateClock()
    this.handleEventListeners()
  }
  
  start() {
    this.isPaused = false

    this.toggleStartBtn(false)

    if (this.interval) return

    this.interval = setInterval(() => {
      if (this.isPaused) return 

      if (this.minutes === 0 && this.seconds === 0) {
        this.interval = clearInterval(this.interval)
        this.end()
        return
      } else if (this.seconds === 0) {
        this.seconds = 59
        this.minutes--
      } else {
        this.seconds--
      }
      this.updateClock()
    }, 1000)
  }
  
  end() {
    document.title = '(30 min passed)'
    this.toggleStartBtn(true)
  }

  reset() {
    this.interval = clearInterval(this.interval)
    this.minutes = this.time
    this.seconds = 0
    this.toggleStartBtn(true)
    this.updateClock()
  }

  pause () {
    this.isPaused = true
    this.toggleStartBtn(true)
  }

  setNewTime(time) {
    this.time = time
    this.reset()
  }

  updateClock() {
    this.minEl = document.querySelector('.minutes')
    this.secEl = document.querySelector('.seconds')
    
    const {minutes, seconds} = this.getFormatedTime()
    
    this.minEl.textContent = minutes
    this.secEl.textContent = seconds
    this.updateTitle()
  }
  
  updateTitle() {
    const {minutes, seconds} = this.getFormatedTime()
    document.title = `${minutes}:${seconds} (${this.activity})`
  }

  getFormatedTime() {
    const strMin = this.minutes.toString()
    const minutes = strMin.length === 1 ? `0${strMin}` : strMin
    const strSec = this.seconds.toString()
    const seconds = strSec.length === 1 ? `0${strSec}` : strSec
    return {minutes, seconds}
  }

  toggleStartBtn(start) {
    this.btnStart.style['display'] = start ? 'inline-block' :'none'
    this.btnPause.style['display'] = start ? 'none' : 'inline-block'
  }

  handleEventListeners() {
    this.btnStart = document.querySelector('.button-start')
    this.btnStart.addEventListener('click', () => {
      this.start()
    })
    this.btnReset = document.querySelector('.button-reset')
    this.btnReset.addEventListener('click', () => {
      this.reset()
    })
    this.btnPause = document.querySelector('.button-pause')
    this.btnPause.addEventListener('click', () => {
      this.pause()
    })
    this.btnNewTime = document.querySelector('.button-submit')
    this.btnNewTime.addEventListener('click', () => {
      const time = document.querySelector('#time').value
      if (time) this.setNewTime(time)
    })
    this.btnWork = document.querySelector('#work')
    this.btnWork.addEventListener('change', () => {
      this.activity = this.btnWork.value
      this.updateTitle()
    })
    this.btnBreak = document.querySelector('#break')
    this.btnBreak.addEventListener('change', () => {
      this.activity = this.btnBreak.value
      this.updateTitle()
    })
  }
}

const pomo = new Pomodoro()
