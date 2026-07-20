import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import useLanguageStore from '../stores/languageStore'
import useHydration from '../hooks/useHydration'

const Contact = () => {
  const language = useLanguageStore((state) => state.language)
  const isHydrated = useHydration()
  const isEnglish = !isHydrated || language === 'en'
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError('')
    setSubmitted(false)

    try {
      await addDoc(collection(db, 'contacts'), {
        ...data,
        createdAt: serverTimestamp(),
        source: 'contact-page',
      })

      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setSubmitError(
        isEnglish
          ? 'We could not send your message right now. Please try again later or contact us directly.'
          : 'Ubutumwa bwawe ntibushoboye koherezwa ubu. Ongera mugera hanyuma cyangwa twandikire mu buryo butandukanye.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          {isEnglish ? 'Contact Us' : 'Twandikire'}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">
              {isEnglish ? 'Send us a Message' : 'Ohereza Ubutumwa'}
            </h2>
            
            {submitted && (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6" role="status">
                {isEnglish
                  ? 'Thank you! We will get back to you soon.'
                  : 'Murakoze! Tuzabagana vuba.'
                }
              </div>
            )}

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6" role="alert">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEnglish ? 'Name' : 'Amazina'} *
                </label>
                <input
                  {...register('name', { required: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">
                    {isEnglish ? 'Required' : 'Bikenewe'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEnglish ? 'Email' : 'Imeyili'} *
                </label>
                <input
                  {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {isEnglish ? 'Valid email required' : 'Imeyili ikwiye'}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEnglish ? 'Phone' : 'Telefoni'}
                </label>
                <input
                  {...register('phone')}
                  placeholder="+250 784 154 697"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {isEnglish ? 'Message' : 'Ubutumwa'} *
                </label>
                <textarea
                  {...register('message', { required: true })}
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {errors.message && (
                  <p className="text-red-600 text-sm mt-1">
                    {isEnglish ? 'Required' : 'Bikenewe'}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
              >
                {isSubmitting
                  ? (isEnglish ? 'Sending...' : 'Iriho...')
                  : (isEnglish ? 'Send Message' : 'Ohereza Ubutumwa')}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">
                {isEnglish ? 'Get in Touch' : 'Twandikire'}
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">📍</span>
                    <h3 className="font-semibold">
                      {isEnglish ? 'Address' : 'Aderesi'}
                    </h3>
                  </div>
                  <p className="text-gray-600 ml-10">
                    Kigali, Rwanda
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">📞</span>
                    <h3 className="font-semibold">
                      {isEnglish ? 'Phone' : 'Telefoni'}
                    </h3>
                  </div>
                  <p className="text-gray-600 ml-10">
                    +250 784 154 697
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">📧</span>
                    <h3 className="font-semibold">
                      {isEnglish ? 'Email' : 'Imeyili'}
                    </h3>
                  </div>
                  <p className="text-gray-600 ml-10">
                    director@kigaliswimshop.online
                  </p>
                </div>

                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">💬</span>
                    <h3 className="font-semibold">WhatsApp</h3>
                  </div>
                  <a
                    href="https://wa.me/250784154697"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 ml-10"
                  >
                    +250 784 154 697
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4">
                {isEnglish ? 'Business Hours' : 'Amasaha y\'Ubucuruzi'}
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>{isEnglish ? 'Monday - Friday:' : 'Kuwa Mbere - Kuwa Gatanu:'}</strong> 9:00 AM - 6:00 PM
                </p>
                <p>
                  <strong>{isEnglish ? 'Saturday:' : 'Kuwa Gatandatu:'}</strong> 9:00 AM - 4:00 PM
                </p>
                <p>
                  <strong>{isEnglish ? 'Sunday:' : 'Ku cyumweru:'}</strong> Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact



