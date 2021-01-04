import styles from "./ToolTip.module.css";
import React, { FC, useEffect, RefAttributes, ForwardRefExoticComponent, useRef } from "react";
import rd from "react-dom";
export const Tooltip: FC<{ title: string, Content: ForwardRefExoticComponent<RefAttributes<any>> }> = (props) => {
    const { title, Content } = props
    const ref = useRef<HTMLDivElement>()

    useEffect(() => {
        const target = ref.current
        target && (target.style.cursor = 'pointer')
        function onCb(e: MouseEvent) {
            const t = e.target
            const x = e.clientX
            const y = e.clientY
            const a = target?.getBoundingClientRect()
            show(title, a?.left || 0, a?.top || 0)

        }
        function offCb(e: MouseEvent) {
            const t = e.target
            hide()
        }
        target?.addEventListener('mouseover', onCb)
        target?.addEventListener('mouseleave', offCb)
        return () => {
            target?.removeEventListener('mouseover', onCb)
            target?.removeEventListener('mouseleave', offCb)
        }
    }, [])
    return (
        <Content ref={ref} />
    )
}
const id = '#react-temperature-chart-tooltip'
function show(title: string, x: number, y: number) {
    x += 10
    y -= 30
    console.log('xxf xy', x, y)
    let target = document.querySelector(id) as HTMLDivElement
    if (!target) {
        target = document.createElement('div')
        target.id = id.slice(1)
        target.style.position = 'fixed'
        target.style.userSelect = 'none'
        target.style.background = '#333'
        target.style.color = '#fff'
        target.style.padding = '4px'
        target.style.transition = 'all .4s'
        target.style.fontSize = '12px'
        document.body.append(target)
    }
    target.style.opacity = '1'

    target.style.left = x + 'px'
    target.style.top = y + 'px'
    target.innerText = title
    // target.hidden = false
    console.log('xxf target', target)


}
function hide() {
    let target = document.querySelector(id) as HTMLDivElement
    if (target) {
        target.style.opacity = '0'
        // target.hidden = true
    }

}