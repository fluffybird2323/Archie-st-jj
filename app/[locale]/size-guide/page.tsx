import Link from "next/link"
import { ChevronLeft, Ruler, User, Weight, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/i18n/utils"
import type { Locale } from "@/lib/i18n/config"

interface SizeGuidePageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function SizeGuidePage({ params }: SizeGuidePageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const backUrl = locale === "en" ? "/" : `/${locale}`

  const sizeData = [
    {
      size: "XS",
      height: "155-165 cm",
      heightImperial: "5'1\"–5'5\"",
      weight: "45-55 kg",
      weightImperial: "99–121 lbs",
      chest: "81-86 cm",
      chestImperial: "32–34\"",
      waist: "66-71 cm",
      waistImperial: "26–28\"",
    },
    {
      size: "S",
      height: "160-170 cm",
      heightImperial: "5'3\"–5'7\"",
      weight: "55-65 kg",
      weightImperial: "121–143 lbs",
      chest: "86-91 cm",
      chestImperial: "34–36\"",
      waist: "71-76 cm",
      waistImperial: "28–30\"",
    },
    {
      size: "M",
      height: "165-175 cm",
      heightImperial: "5'5\"–5'9\"",
      weight: "65-75 kg",
      weightImperial: "143–165 lbs",
      chest: "96-102 cm",
      chestImperial: "38–40\"",
      waist: "81-86 cm",
      waistImperial: "32–34\"",
    },
    {
      size: "L",
      height: "170-180 cm",
      heightImperial: "5'7\"–5'11\"",
      weight: "75-85 kg",
      weightImperial: "165–187 lbs",
      chest: "107-112 cm",
      chestImperial: "42–44\"",
      waist: "91-97 cm",
      waistImperial: "36–38\"",
    },
    {
      size: "XL",
      height: "175-185 cm",
      heightImperial: "5'9\"–6'1\"",
      weight: "85-95 kg",
      weightImperial: "187–209 lbs",
      chest: "117-122 cm",
      chestImperial: "46–48\"",
      waist: "102-107 cm",
      waistImperial: "40–42\"",
    },
    {
      size: "XXL",
      height: "180-190 cm",
      heightImperial: "5'11\"–6'3\"",
      weight: "95-110 kg",
      weightImperial: "209–243 lbs",
      chest: "127-132 cm",
      chestImperial: "50–52\"",
      waist: "112-117 cm",
      waistImperial: "44–46\"",
    },
  ]


  const fitTypes = [
    { name: dictionary.sizeGuide.slimFit, description: "Close-fitting, tailored silhouette" },
    { name: dictionary.sizeGuide.regularFit, description: "Standard comfortable fit" },
    { name: dictionary.sizeGuide.relaxedFit, description: "Loose and comfortable" },
    { name: dictionary.sizeGuide.looseFit, description: "Very loose, oversized feel" },
    { name: dictionary.sizeGuide.oversizedFit, description: "Extremely loose, streetwear style" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <Link
          href={backUrl}
          className="inline-flex items-center gap-2 text-gray-700 hover:text-black mb-8 text-base font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          {dictionary.nav.back}
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">{dictionary.sizeGuide.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{dictionary.sizeGuide.subtitle}</p>
        </div>

        {/* Size Guide Info */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">{dictionary.sizeGuide.title}</h2>
          <p className="text-gray-600">{dictionary.sizeGuide.subtitle}</p>
        </div>

        {/* Size Table */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-black mb-16 overflow-hidden">
          <div className="bg-black text-white">
            <div className="grid grid-cols-5 text-center font-bold text-sm md:text-base uppercase tracking-wide">
              <div className="p-4 md:p-6 border-r border-gray-600">{dictionary.sizeGuide.size}</div>
              <div className="p-4 md:p-6 border-r border-gray-600">{`${dictionary.sizeGuide.height} (cm / in)`}</div>
              <div className="p-4 md:p-6 border-r border-gray-600">{`${dictionary.sizeGuide.weight} (kg / lbs)`}</div>
              <div className="p-4 md:p-6 border-r border-gray-600">{`${dictionary.sizeGuide.chest} (cm / in)`}</div>
              <div className="p-4 md:p-6">{`${dictionary.sizeGuide.waist} (cm / in)`}</div>
            </div>
          </div>
          {sizeData.map((row, index) => (
            <div
              key={row.size}
              className={`grid grid-cols-5 text-center ${index !== sizeData.length - 1 ? "border-b border-gray-200" : ""}`}
            >
              <div className="p-4 md:p-6 border-r border-gray-200 text-2xl md:text-3xl font-black">{row.size}</div>
              <div className="p-4 md:p-6 border-r border-gray-200 text-base md:text-lg font-medium text-gray-800">
                {`${row.height} / ${row.heightImperial}`}
              </div>
              <div className="p-4 md:p-6 border-r border-gray-200 text-base md:text-lg font-medium text-gray-800">
                {`${row.weight} / ${row.weightImperial}`}
              </div>
              <div className="p-4 md:p-6 border-r border-gray-200 text-base md:text-lg font-medium text-gray-800">
                {`${row.chest} / ${row.chestImperial}`}
              </div>
              <div className="p-4 md:p-6 text-base md:text-lg font-medium text-gray-800">{`${row.waist} / ${row.waistImperial}`}</div>
            </div>
          ))}
        </div>

        {/* Measurement Guide */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">{dictionary.sizeGuide.howToMeasure}</h3>
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{dictionary.sizeGuide.measurementGuideIntro}</p>
          </div>
        </div>

        {/* Sizing Tip */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-16">
          <p className="text-gray-800 text-sm md:text-base"><span className="font-bold">Tip:</span> For a relaxed or oversized look, simply size up by one size.</p>
        </div>

        {/* Size Recommendations */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">Size Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {sizeData.map((size) => {
              let bodyType = '';
              switch(size.size) {
                case 'XS': bodyType = 'Petite build, ideal for slender frames and those who prefer a fitted look.'; break;
                case 'S': bodyType = 'Slim to average build, perfect for most people seeking a tailored fit.'; break;
                case 'M': bodyType = 'Average to athletic build, suitable for standard proportions and active lifestyles.'; break;
                case 'L': bodyType = 'Broader or muscular build, ideal for athletic physiques and comfortable fit.'; break;
                case 'XL': bodyType = 'Larger build, accommodates broader shoulders and fuller figures comfortably.'; break;
                case 'XXL': bodyType = 'Plus size or very tall, designed for maximum comfort and coverage.'; break;
              }
              return (
                <div key={size.size} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors">
                  <h4 className="font-bold text-lg mb-2">{size.size}</h4>
                  <p className="text-sm text-gray-600 mb-2">Height: {size.height} / {size.heightImperial}</p>
                  <p className="text-sm text-gray-600 mb-2">Weight: {size.weight} / {size.weightImperial}</p>
                  <p className="text-sm text-gray-600 font-medium">{bodyType}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Measure */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">{dictionary.sizeGuide.howToMeasure}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold mb-2">{dictionary.sizeGuide.chestMeasurement}</h4>
              <p className="text-sm text-gray-600">{dictionary.sizeGuide.chestInstructions}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Ruler className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-bold mb-2">{dictionary.sizeGuide.waistMeasurement}</h4>
              <p className="text-sm text-gray-600">{dictionary.sizeGuide.waistInstructions}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-bold mb-2">{dictionary.sizeGuide.heightMeasurement}</h4>
              <p className="text-sm text-gray-600">{dictionary.sizeGuide.heightInstructions}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Weight className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-bold mb-2">{dictionary.sizeGuide.weightMeasurement}</h4>
              <p className="text-sm text-gray-600">{dictionary.sizeGuide.weightInstructions}</p>
            </div>
          </div>
        </div>

        {/* Sizing Notes */}
        <div className="bg-gray-50 border-l-4 border-black p-8 mb-16">
          <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">{dictionary.sizeGuide.sizingNotes}</h3>
          <p className="text-gray-700 leading-relaxed">{dictionary.sizeGuide.sizingNotesText}</p>
        </div>

        {/* Back Button */}
        <div className="text-center pb-16">
          <Link href={backUrl}>
            <Button className="bg-black text-white px-8 py-3 text-lg font-semibold hover:bg-gray-800 transition-colors">
              {dictionary.sizeGuide.backToShopping}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
