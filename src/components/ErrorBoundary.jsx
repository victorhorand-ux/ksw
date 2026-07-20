// src/components/ErrorBoundary.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import useLanguageStore from '../stores/languageStore'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({ error, errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      let language = 'en'
      try {
        language = useLanguageStore.getState().language
      } catch {
        // Fallback if store not available
      }
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
          <div className="max-w-lg w-full rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-2xl md:p-12">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-4xl">⚠️</div>
            <h1 className="mb-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
              {language === 'en' ? 'Something went wrong' : 'Habaye ikibazo'}
            </h1>
            <p className="mb-8 text-slate-500 font-medium">
              {language === 'en' 
                ? 'We apologize for the inconvenience. An unexpected issue interrupted this page, but you can recover quickly.'
                : 'Twiseguye, habaye ikosa ritunganye ryahagaritse iyi paji, ariko urashobora kuyisubiramo byoroshye.'
              }
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-8 text-left bg-slate-50 border border-slate-200 p-4 rounded-xl text-sm overflow-hidden">
                <summary className="cursor-pointer font-bold text-slate-700 mb-2 outline-none">
                  Error Details (Dev Only)
                </summary>
                <pre className="overflow-auto text-[10px] text-slate-600 custom-scrollbar">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* 🚀 Changed to a hard reload for better recovery from fatal crashes */}
              <button
                onClick={() => window.location.reload()}
                className="w-full rounded-2xl bg-sky-600 px-6 py-4 font-black text-white shadow-lg shadow-sky-200 transition-all hover:bg-sky-700 active:scale-[0.98] sm:w-auto"
              >
                {language === 'en' ? 'Refresh Page' : 'Ongera Ugerageze'}
              </button>
              <Link
                to="/"
                onClick={this.handleReset}
                className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-6 py-4 font-black text-slate-700 transition-all hover:bg-slate-200 active:scale-[0.98] sm:w-auto"
              >
                {language === 'en' ? 'Go Home' : 'Subira Ahabanza'}
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary