/**
 * Debounce and throttle utility functions
 * @module utils/debounceThrottle
 */

/**
 * Creates a debounced function that delays invoking func until after wait
 * milliseconds have elapsed since the last time the debounced function was invoked.
 *
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @param {Object} [options] - Options object
 * @param {boolean} [options.leading=false] - Invoke on the leading edge
 * @param {boolean} [options.trailing=true] - Invoke on the trailing edge
 * @returns {Function} The debounced function
 */
export function debounce(func, wait, options = {}) {
  const { leading = false, trailing = true } = options
  let timeoutId = null
  let lastArgs = null
  let lastThis = null
  let result = null
  let lastCallTime = null
  let lastInvokeTime = 0

  function invokeFunc(time) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = null
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    return (
      lastCallTime === null ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      timeSinceLastInvoke >= wait
    )
  }

  function trailingEdge(time) {
    timeoutId = null

    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = null
    return result
  }

  function timerExpired() {
    const time = Date.now()

    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }

    timeoutId = setTimeout(timerExpired, wait - (time - lastCallTime))
  }

  function leadingEdge(time) {
    lastInvokeTime = time
    timeoutId = setTimeout(timerExpired, wait)

    return leading ? invokeFunc(time) : result
  }

  function debounced(...args) {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timeoutId === null) {
        return leadingEdge(time)
      }
      if (leading) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(timerExpired, wait)
        return invokeFunc(time)
      }
    }

    if (timeoutId === null) {
      timeoutId = setTimeout(timerExpired, wait)
    }

    return result
  }

  debounced.cancel = function() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timeoutId = null
  }

  debounced.flush = function() {
    if (timeoutId !== null) {
      return trailingEdge(Date.now())
    }
    return result
  }

  return debounced
}

/**
 * Creates a throttled function that only invokes func at most once per
 * every wait milliseconds.
 *
 * @param {Function} func - The function to throttle
 * @param {number} wait - The number of milliseconds to throttle
 * @param {Object} [options] - Options object
 * @param {boolean} [options.leading=true] - Invoke on the leading edge
 * @param {boolean} [options.trailing=true] - Invoke on the trailing edge
 * @returns {Function} The throttled function
 */
export function throttle(func, wait, options = {}) {
  const { leading = true, trailing = true } = options
  let timeoutId = null
  let lastArgs = null
  let lastThis = null
  let lastCallTime = 0

  function invokeFunc() {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = null
    lastCallTime = Date.now()
    func.apply(thisArg, args)
  }

  function trailingEdge() {
    timeoutId = null

    if (trailing && lastArgs) {
      invokeFunc()
    }
  }

  function throttled(...args) {
    const now = Date.now()
    const timeSinceLastCall = now - lastCallTime

    lastArgs = args
    lastThis = this

    if (timeSinceLastCall >= wait || lastCallTime === 0) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
        timeoutId = null
      }

      if (leading) {
        invokeFunc()
      } else if (trailing) {
        timeoutId = setTimeout(trailingEdge, wait)
      }
    } else if (timeoutId === null && trailing) {
      timeoutId = setTimeout(trailingEdge, wait - timeSinceLastCall)
    }
  }

  throttled.cancel = function() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    lastCallTime = 0
    lastArgs = lastThis = timeoutId = null
  }

  return throttled
}

/**
 * Creates a function that can only be called once
 * @param {Function} func - The function to restrict
 * @returns {Function} The restricted function
 */
export function once(func) {
  let called = false
  let result = null

  return function(...args) {
    if (!called) {
      called = true
      result = func.apply(this, args)
    }
    return result
  }
}

/**
 * Creates a function that delays invoking func until the current call stack has cleared
 * @param {Function} func - The function to defer
 * @returns {Function} The deferred function
 */
export function defer(func) {
  return function(...args) {
    setTimeout(() => func.apply(this, args), 0)
  }
}

/**
 * Vue composable for debounced/throttled values
 * @param {import('vue').Ref} value - Reactive value to watch
 * @param {number} delay - Delay in milliseconds
 * @param {'debounce' | 'throttle'} [type='debounce'] - Type of delay
 * @returns {import('vue').Ref} Debounced/throttled value
 */
export function useDebouncedValue(value, delay, type = 'debounce') {
  const { ref, watch } = require('vue')
  const debouncedValue = ref(value.value)

  const updateValue = type === 'debounce'
    ? debounce((val) => { debouncedValue.value = val }, delay)
    : throttle((val) => { debouncedValue.value = val }, delay)

  watch(value, (newVal) => {
    updateValue(newVal)
  })

  return debouncedValue
}
