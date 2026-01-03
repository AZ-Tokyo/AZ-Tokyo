import {
  Accordion,
  AccordionContent,
  AccordionSummary,
} from './components/digital-go-jp/Accordion'

export default function App() {
  return (
    <>
      <h1 className="sticky font-sans top-0 px-8 py-4 z-10 shadow-1 text-std-45B-140">
        デジタル資産相続ツール
      </h1>

      <div className="px-16 py-8 flex flex-col">
        <Accordion>
          <AccordionSummary>
            <h3>デジタル資産相続ツール</h3>
          </AccordionSummary>
          <AccordionContent>
            <p>
              「法令」×「デジタル」で開発するツールです。<br></br>
              スマートフォンやデバイスに記録されているデータから、故人が保有していたデジタル資産をデータ化し、相続の可否を自動で反転します。
            </p>
          </AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionSummary>
            <h3>使い方</h3>
          </AccordionSummary>
          <AccordionContent>
            <p>「データをスキャンする」のボタンから追加できます。</p>
          </AccordionContent>
        </Accordion>
      </div>
    </>
  )
}
