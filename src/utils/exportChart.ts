import { toPng, toSvg } from 'html-to-image'
import { jsPDF } from 'jspdf'
import { saveAs } from 'file-saver'
import type { ExportOptions } from '../types'

export async function exportChart(
  element: HTMLElement,
  options: ExportOptions,
): Promise<void> {
  const { format, quality, scale, backgroundColor } = options

  switch (format) {
    case 'png':
      await exportAsPng(element, quality, scale, backgroundColor)
      break
    case 'svg':
      await exportAsSvg(element, backgroundColor)
      break
    case 'pdf':
      await exportAsPdf(element, scale, backgroundColor)
      break
  }
}

async function exportAsPng(
  element: HTMLElement,
  quality: number,
  scale: number,
  backgroundColor: string,
): Promise<void> {
  const dataUrl = await toPng(element, {
    quality,
    pixelRatio: scale,
    backgroundColor,
  })
  saveAs(dataUrl, 'gantt-chart.png')
}

async function exportAsSvg(
  element: HTMLElement,
  backgroundColor: string,
): Promise<void> {
  const dataUrl = await toSvg(element, { backgroundColor })
  const response = await fetch(dataUrl)
  const blob = await response.blob()
  saveAs(blob, 'gantt-chart.svg')
}

async function exportAsPdf(
  element: HTMLElement,
  scale: number,
  backgroundColor: string,
): Promise<void> {
  const dataUrl = await toPng(element, {
    quality: 1,
    pixelRatio: scale,
    backgroundColor,
  })

  const img = new Image()
  await new Promise<void>((resolve) => {
    img.onload = () => resolve()
    img.src = dataUrl
  })

  const imgWidth = img.width
  const imgHeight = img.height

  const orientation = imgWidth > imgHeight ? 'landscape' : 'portrait'
  const pdf = new jsPDF(orientation, 'px', [imgWidth, imgHeight])
  pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight)
  pdf.save('gantt-chart.pdf')
}

export function exportMermaidCode(code: string): void {
  const blob = new Blob([code], { type: 'text/plain;charset=utf-8' })
  saveAs(blob, 'gantt-chart.mmd')
}

export function importMermaidCode(): Promise<string> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.mmd,.mermaid,.txt'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) {
        reject(new Error('未选择文件'))
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        resolve(event.target?.result as string)
      }
      reader.onerror = () => reject(new Error('文件读取失败'))
      reader.readAsText(file)
    }
    input.click()
  })
}
