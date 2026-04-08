import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateItinerary, getWeatherInsights, optimizeBudget, getTravelTips } from '../../services/aiService'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Spinner from '../../components/common/Spinner'

const tabs = ['Itinerary', 'Weather', 'Budget', 'Tips']

export default function AIPlannerPage() {
  const [tab, setTab] = useState('Itinerary')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  // Form states
  const [prompt, setPrompt]           = useState('')
  const [destination, setDestination] = useState('')
  const [budget, setBudget]           = useState('')
  const [duration, setDuration]       = useState('7')

  const call = async (fn, payload) => {
    setLoading(true); setResult(null); setError(null)
    try {
      const { data } = await fn(payload)
      setResult(data.data)
    } catch (e) {
      setError(e.response?.data?.message || 'AI service error. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const actions = {
    Itinerary: () => call(generateItinerary, { prompt }),
    Weather:   () => call(getWeatherInsights, { destination }),
    Budget:    () => call(optimizeBudget, { destination, total_budget: budget, duration_days: duration }),
    Tips:      () => call(getTravelTips, { destination }),
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">AI Planner 🤖</h1>
        <p className="text-sm text-gray-500 mt-1">Let AI handle the heavy lifting</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map((t) => (
          <button key={t} onClick={() => { setTab(t); setResult(null); setError(null) }}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition
              ${tab === t ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        {tab === 'Itinerary' && (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Describe your trip</label>
            <textarea
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              rows={4} placeholder="e.g. 7-day trip to Japan for a couple who loves food and culture, budget $3000"
              value={prompt} onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        )}
        {(tab === 'Weather' || tab === 'Tips') && (
          <Input label="Destination" value={destination} onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Paris, France" />
        )}
        {tab === 'Budget' && (
          <div className="space-y-3">
            <Input label="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g. Bali, Indonesia" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Total Budget (USD)" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="2000" />
              <Input label="Duration (days)"    type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="7" />
            </div>
          </div>
        )}
        <Button onClick={actions[tab]} loading={loading} className="w-full">
          Generate with AI ✨
        </Button>
      </div>

      {/* Result */}
      <AnimatePresence>
        {loading && (
          <motion.div className="flex flex-col items-center gap-3 py-10"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Spinner size="lg" />
            <p className="text-sm text-gray-500 animate-pulse">AI is thinking...</p>
          </motion.div>
        )}
        {error && !loading && (
          <motion.div className="bg-red-50 text-red-600 rounded-2xl p-4 text-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {error}
          </motion.div>
        )}
        {result && !loading && (
          <motion.div className="bg-white rounded-2xl p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-semibold text-gray-700 mb-3">AI Response</h2>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans leading-relaxed">
              {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
