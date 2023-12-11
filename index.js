'use strict'

{
    const $ = q => document.querySelector(q)
    const $on = (el, ev, fn) => {
        Array.isArray(el) ? el.forEach(ae => $on(ae, ev, fn)) : el.addEventListener(ev, fn)
        return el
    }

    const content = () => [$('#content')]

    const init = () => {
        search()
        replace()
    }

    const search = () => {
        $on($('#search'), 'keyup', event => {
            highlightingContentHitsBy(event.target.value)
        })
    }

    const highlightingContentHitsBy = inputUser => {
        inputUser === '' ? removeHighlightsFromAllContentHits() : highlightContentHitBy(inputUser)
    }

    const removeHighlightsFromAllContentHits = () =>
        content().forEach(el => {
            el.innerHTML = el.textContent
        })

    const highlightContentHitBy = inputUser => {
        content().forEach(p => {
            const textValue = p.textContent
            let currentIndex = 0
            p.innerHTML = textValue.replace(new RegExp(inputUser, 'g'), match => {
                const start = textValue.indexOf(match, currentIndex)
                const end = start + match.length
                currentIndex = end
                return `<span style="background-color: yellow; font-style: italic;">${textValue.substring(start, end)}</span>`;
            })
        })
    }

    const replace = () => {
        $on($('#replaceFirstOccurencebtn'), 'click', () => replaceFirstOccurrence())
        $on($('#replaceAllbtn'), 'click', () => replaceAllOccurrences())
    }

    const replaceFirstOccurrence = () => {
        const replaceText = $('#replace').value
        const contentContainer = $('#content')
        const highlightedElement = contentContainer.querySelector('span[style="background-color: yellow;"]')

        if (highlightedElement) {
            highlightedElement.innerHTML = replaceText
            highlightedElement.removeAttribute('style')
        }
    }

    const replaceAllOccurrences = () => {
        const replaceText = $('#replace').value
        const contentContainer = $('#content')
        const highlightedElements = contentContainer.querySelectorAll('span[style="background-color: yellow;"]')

        highlightedElements.forEach(element => {
            element.innerHTML = replaceText
            element.removeAttribute('style')
        })
    }

    init()
}
