import React from 'react'
import { Helmet } from 'react-helmet'
import { WebSite, FAQPage } from 'schema-dts'
import { helmetJsonLdProp } from 'react-schemaorg'
import { useRuntime } from 'vtex.render-runtime'

import { getBaseUrl } from './modules/baseUrl'

interface Props {
  searchTermPath?: string
}

function SearchAction({ searchTermPath }: Props) {
  const baseUrl = getBaseUrl()
  const path = !searchTermPath ? '/' : searchTermPath
  const { binding } = useRuntime()

  const roBinding = !!binding?.canonicalBaseAddress?.includes("www.floria.ro")

  return (
    <Helmet
      script={[
        helmetJsonLdProp<WebSite>({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}${path}{search_term_string}?map=ft`,
            // @ts-expect-error it's a valid property
            'query-input': 'required name=search_term_string',
          },
        }),
        roBinding && helmetJsonLdProp<FAQPage>({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              "@type": "Question",
              name: "Pot veni la sediul Floria pentru a plati comanda in numerar?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Poti comanda si plati exclusiv online, folosind una dintre modalitatile de plata disponibile in site. Mai multe detalii despre plati gasesti AICI."
              }
            },
            {
              "@type": "Question",
              name: "Puteti livra buchete si in strainatate?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Da, livram oriunde in lume, in 24 de ore. Gasesti selectia de produse disponibile in sectiunea - Livrare Internationala.\nPoti conta pe noi pentru livrare flori in strainatate. Daca ai o comanda de flori in afara Romaniei, o putem procesa noi. Comanda flori cu livrare internationala si livrare rapida, si in 24-48 de ore livram flori in toata lumea. Selectia noastra cuprinde buchete de flori si aranjamente cu livrare internationala."
              }
            },
            {
              "@type": "Question",
              name: "Puteti livra si in comunele/satele care nu se afla in lista localitatilor afisate pe site?",
              acceptedAnswer: {
                "@type": "Answer",
                "text": "Putem livra buchete oriunde in tara, prin intermediul retelei noastre de ateliere florale. Transportul este gratuit in orasele in care avem ateliere (peste 100). In localitatile din afara acestei arii, livram contra unui cost de transport calculat automat, in momentul in care selectezi localitatea de livrare. Daca localitatea in care doresti sa faci livrarea nu este acoperita de niciunul dintre atelierele noastre, asiguram serviciu de livrare prin curier rapid. Buchetele de flori sunt livrate in ambajal special, cu protectie si rezerva de apa. Astfel, poti comanda buchete de flori cu livrare oriunde in tara. Selectia de buchete de flori livrate in cutie este disponibila pe pagina dedicata: buchete de flori in cutie"
              }
            },
            {
              "@type": "Question",
              name: "In cat timp de la plasarea comenzii ajunge aceasta la destinatie?",
              acceptedAnswer: {
                "@type": "Answer",
                "text": "Termenul mediu de livrare in Bucuresti si alte peste 140 de orase este intre 2 si 4 ore de la momentul confirmarii in sistem a platii.\nAsadar, poti comanda buchete de flori cu livrare in aceeasi zi. Poti plasa chiar o comanda de flori online in provincie. Asiguram livrare rapida buchete de flori oriunde in tara, oriunde ai fi. Indiferent de ora, poti plasa o comanda de flori cu livrare rapida in tara."
              }
            }
          ]
        })
      ]}
    />
  )
}

export default SearchAction
