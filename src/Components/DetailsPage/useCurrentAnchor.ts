// src/hooks.js
import {useEffect, useRef, useState} from 'react';
import {Anchor} from "../../entities/Anchor";

// @ts-ignore
export function useCurrentAnchor(anchors: Anchor[]) {
  const observer = useRef()
  const [activeId, setActiveId] = useState('')
  const elements = document.querySelectorAll(anchors.map((anchor) => `#${anchor.id}`).join(','))
  console.log(elements)

  useEffect(() => {
    const handleObserver = (entries: any) => {
      entries.forEach((entry: any) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })

    }
    // @ts-ignore

    observer.current = new IntersectionObserver(handleObserver, {
      threshold: 0.75,
    })
    // @ts-ignore
    elements.forEach((elem) => observer.current.observe(elem))
    // @ts-ignore
    return () => observer.current?.disconnect()
  }, [])


  return activeId;
}