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
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
          <div className="max-w-lg w-full bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 text-center border border-slate-100">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">
              {language === 'en' ? 'Something went wrong' : 'Habaye ikibazo'}
            </h1>
            <p className="text-slate-500 font-medium mb-8">
              {language === 'en' 
                ? 'We apologize for the inconvenience. An error occurred while loading this page.'
                : 'Twiseguye, habaye ikosa mu gufungura iyi paji.'
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
                className="bg-sky-600 hover:bg-sky-700 text-white font-black px-6 py-4 rounded-xl transition-all shadow-lg shadow-sky-200 active:scale-95 w-full sm:w-auto"
              >
                {language === 'en' ? 'Refresh Page' : 'Ongera Ugerageze'}
              </button>
              <Link
                to="/"
                onClick={this.handleReset}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black px-6 py-4 rounded-xl transition-all active:scale-95 w-full sm:w-auto"
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