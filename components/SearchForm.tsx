'use client'

import { useState } from 'react'
import { SearchParams } from '@/app/page'
import { getCoordinatesFromPostalCode } from '@/lib/fishingZones'
import { useLocale } from '@/lib/i18n/context'

const SPANISH_PROVINCES = [
  'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila',
  'Badajoz', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria',
  'Castellón', 'Ciudad Real', 'Córdoba', 'Cuenca', 'Guipúzcoa',
  'Girona', 'Granada', 'Guadalajara', 'Huelva', 'Huesca', 'Jaén',
  'La Coruña', 'La Rioja', 'Las Palmas', 'León', 'Lleida', 'Lugo',
  'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Ourense', 'Palencia',
  'Palma de Mallorca', 'Pontevedra', 'Salamanca', 'Segovia', 'Sevilla',
  'Soria', 'Tarragona', 'Teruel', 'Toledo', 'Valencia', 'Valladolid',
  'Vizcaya', 'Zamora', 'Zaragoza'
]

interface SearchFormProps {
  onSearch: (params: SearchParams) => void
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const { t } = useLocale()
  const [searchType, setSearchType] = useState<'province' | 'nearme' | 'postal'>('province')
  const [province, setProvince] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleNearMe = () => {
    setLoading(true)
    setError('')

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSearch({
            nearMe: true,
            userLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            date,
            time,
          })
          setLoading(false)
        },
        (err) => {
          setError(err.code === err.PERMISSION_DENIED ? t.search.errorGeoDenied : t.search.errorGeoFailed)
          setLoading(false)
          console.error(err)
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 60000,
        }
      )
    } else {
      setError(t.search.errorGeoUnsupported)
      setLoading(false)
    }
  }

  const handlePostalCodeSearch = async () => {
    setLoading(true)
    setError('')

    try {
      const coords = await getCoordinatesFromPostalCode(postalCode)
      if (coords) {
        onSearch({
          nearMe: true,
          userLocation: coords,
          date,
          time,
        })
      } else {
        setError(t.search.errorPostalNotFound)
      }
    } catch (err) {
      setError(t.search.errorPostalGeneric)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (searchType === 'province') {
      if (!province) {
        setError(t.search.errorSelectProvince)
        return
      }
      onSearch({
        province,
        date: date || undefined,
        time: time || undefined,
      })
    } else if (searchType === 'nearme') {
      handleNearMe()
    } else if (searchType === 'postal') {
      if (!postalCode.trim()) {
        setError(t.search.errorEnterPostal)
        return
      }
      handlePostalCodeSearch()
    }
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const max = new Date()
    max.setDate(max.getDate() + 90)
    return max.toISOString().split('T')[0]
  }

  return (
    <form onSubmit={handleSearch} className="card">
      <h2 className="text-3xl font-bold text-maragota-black mb-2">{t.search.title}</h2>
      <p className="text-gray-600 mb-6">{t.search.subtitle}</p>

      {/* Tipo de búsqueda */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <button
          type="button"
          onClick={() => setSearchType('province')}
          className={`py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${
            searchType === 'province'
              ? 'bg-maragota-orange text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t.search.tabProvince}
        </button>
        <button
          type="button"
          onClick={() => setSearchType('postal')}
          className={`py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${
            searchType === 'postal'
              ? 'bg-maragota-orange text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t.search.tabPostal}
        </button>
        <button
          type="button"
          onClick={() => setSearchType('nearme')}
          className={`py-2 px-3 rounded-lg font-semibold text-sm transition-colors ${
            searchType === 'nearme'
              ? 'bg-maragota-orange text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {t.search.tabNearMe}
        </button>
      </div>

      {/* Búsqueda por Provincia */}
      {searchType === 'province' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-maragota-black mb-2">
              {t.search.provinceLabel}
            </label>
            <select
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="input-field"
            >
              <option value="">{t.search.provincePlaceholder}</option>
              {SPANISH_PROVINCES.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-maragota-black mb-2">{t.search.dateLabel}</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={getTodayDate()}
              max={getMaxDate()}
              className="input-field"
            />
          </div>
        </div>
      )}

      {/* Búsqueda por Código Postal */}
      {searchType === 'postal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-maragota-black mb-2">
              {t.search.postalLabel}
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder={t.search.postalPlaceholder}
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-1">{t.search.postalHint}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-maragota-black mb-2">{t.search.dateLabel}</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={getTodayDate()}
              max={getMaxDate()}
              className="input-field"
            />
          </div>
        </div>
      )}

      {/* Búsqueda Cerca de Mí */}
      {searchType === 'nearme' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-maragota-black mb-2">
              {t.search.nearMeLabel}
            </label>
            <div className="bg-blue-50 border border-blue-300 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                {t.search.nearMeHint}
              </p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-maragota-black mb-2">{t.search.dateLabel}</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={getTodayDate()}
              max={getMaxDate()}
              className="input-field"
            />
          </div>
        </div>
      )}

      {/* Hora */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-maragota-black mb-2">
          {t.search.timeLabel}
        </label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="input-field"
        >
          <option value="">{t.search.timeAny}</option>
          {t.search.timeSlots.map((slot) => (
            <option key={slot.value} value={slot.value}>{slot.label}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? t.search.searching : t.search.searchButton}
      </button>

      <p className="text-xs text-gray-500 mt-4 text-center">
        {t.search.hint}
      </p>
    </form>
  )
}
