import Link from "next/link"
import { ChevronLeft, Ruler, User, Weight, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/i18n/utils"
import type { Locale } from "@/lib/i18n/config"

interface SizeGuidePageProps {
  params: {
    locale: Locale
  }
}

export default async function SizeGuidePage({ params }: SizeGuidePageProps) {
  const dictionary = getDictionary(params.locale)
  const backUrl = params.locale === "en" ? "/" : `/${params.locale}`

  const sizeData = [
    { size: "S", height: "160-170 cm", weight: "45-55 kg", chest: "86-91 cm", waist: "71-76 cm" },
    { size: "M", height: "170-175 cm", weight: "55-65 kg", chest: "91-96 cm", waist: "76-81 cm" },
    { size: "L", height: "175-180 cm", weight: "60-75 kg", chest: "96-101 cm", waist: "81-86 cm" },
    { size: "XL", height: "175-185 cm", weight: "70-85 kg", chest: "101-106 cm", waist: "86-91 cm" },
    { size: "XXL", height: "180-195 cm", weight: "75-90 kg", chest: "106-111 cm", waist: "91-96 cm" },
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

        {/* Product Info */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">ARTIE SIGNATURE HOODIE</h2>
          <p className="text-gray-600">{dictionary.sizeGuide.productDescription}</p>
        </div>

        {/* Size Table */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-black mb-16 overflow-hidden">
          <div className="bg-black text-white">
            <div className="grid grid-cols-5 text-center font-bold text-sm md:text-base uppercase tracking-wide">
              <div className="p-4 md:p-6 border-r border-gray-600">{dictionary.sizeGuide.size}</div>
              <div className="p-4 md:p-6 border-r border-gray-600">{dictionary.sizeGuide.height}</div>
              <div className="p-4 md:p-6 border-r border-gray-600">{dictionary.sizeGuide.weight}</div>
              <div className="p-4 md:p-6 border-r border-gray-600">{dictionary.sizeGuide.chest}</div>
              <div className="p-4 md:p-6">{dictionary.sizeGuide.waist}</div>
            </div>
          </div>
          {sizeData.map((row, index) => (
            <div
              key={row.size}
              className={`grid grid-cols-5 text-center ${index !== sizeData.length - 1 ? "border-b border-gray-200" : ""}`}
            >
              <div className="p-4 md:p-6 border-r border-gray-200 text-2xl md:text-3xl font-black">{row.size}</div>
              <div className="p-4 md:p-6 border-r border-gray-200 text-base md:text-lg font-medium text-gray-800">
                {row.height}
              </div>
              <div className="p-4 md:p-6 border-r border-gray-200 text-base md:text-lg font-medium text-gray-800">
                {row.weight}
              </div>
              <div className="p-4 md:p-6 border-r border-gray-200 text-base md:text-lg font-medium text-gray-800">
                {row.chest}
              </div>
              <div className="p-4 md:p-6 text-base md:text-lg font-medium text-gray-800">{row.waist}</div>
            </div>
          ))}
        </div>

        {/* Visual Guide */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">{dictionary.sizeGuide.visualGuide}</h3>
          <div className="flex justify-center items-end flex-wrap gap-8 mb-12">
            {sizeData.map((size, index) => (
              <div key={size.size} className="flex flex-col items-center group cursor-pointer">
                <div className="relative mb-4">
                  <div className="w-20 h-24 md:w-24 md:h-28 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl flex items-center justify-center">
                    <User className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  </div>
                  {/* Dynamic collage elements */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                </div>
                <div className="text-lg font-bold tracking-wide">{size.size}</div>
                <div className="text-sm text-gray-600">{size.height.split(" ")[0]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fit Comparison */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">{dictionary.sizeGuide.fitComparison}</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {fitTypes.map((fit, index) => (
              <div key={fit.name} className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors">
                <div className="w-16 h-20 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg mx-auto mb-4 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-white rounded-lg transition-all duration-300"
                    style={{
                      transform: `scale(${0.6 + index * 0.1})`,
                      opacity: 0.8,
                    }}
                  />
                </div>
                <h4 className="font-bold text-sm mb-2">{fit.name}</h4>
                <p className="text-xs text-gray-600">{fit.description}</p>
              </div>
            ))}
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
