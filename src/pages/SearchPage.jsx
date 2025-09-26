import React, { useState } from 'react'
import { ListView } from '@progress/kendo-react-listview'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { Input } from '@progress/kendo-react-inputs'
import { Button as KendoButton } from '@progress/kendo-react-buttons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { 
  Search as SearchIcon, 
  FileText, 
  Clock,
  ChevronRight,
  BookOpen,
  Brain,
  Star,
  Filter,
  History
} from 'lucide-react'

// Mock search results
const mockSearchResults = [
  {
    id: 1,
    title: "Machine Learning Fundamentals",
    document: "ML_Basics_2024.pdf",
    excerpt: "Machine learning is a subset of artificial intelligence that focuses on algorithms that can learn from and make predictions on data...",
    relevance: 95,
    page: 12,
    timestamp: "2 minutes ago",
    highlights: ["machine learning", "algorithms", "predictions"]
  },
  {
    id: 2,
    title: "Neural Networks Overview",
    document: "Deep_Learning_Guide.pdf",
    excerpt: "Neural networks are computing systems inspired by biological neural networks. They consist of interconnected nodes or neurons...",
    relevance: 88,
    page: 45,
    timestamp: "5 minutes ago",
    highlights: ["neural networks", "neurons", "computing systems"]
  },
  {
    id: 3,
    title: "Data Preprocessing Techniques",
    document: "Data_Science_Handbook.pdf",
    excerpt: "Data preprocessing is a crucial step in machine learning pipelines. It involves cleaning, transforming, and preparing raw data...",
    relevance: 82,
    page: 78,
    timestamp: "10 minutes ago",
    highlights: ["data preprocessing", "cleaning", "transforming"]
  }
]

const recentSearches = [
  "machine learning algorithms",
  "neural networks",
  "data preprocessing",
  "classification models",
  "deep learning"
]

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedResult, setSelectedResult] = useState(null)
  const [showDialog, setShowDialog] = useState(false)

  const handleSearch = async (query = searchQuery) => {
    if (!query.trim()) return
    
    setIsSearching(true)
    // Simulate API call delay
    setTimeout(() => {
      setSearchResults(mockSearchResults)
      setIsSearching(false)
    }, 1000)
  }

  const openResultDialog = (result) => {
    setSelectedResult(result)
    setShowDialog(true)
  }

  const ResultItem = (props) => {
    const { dataItem } = props
    
    return (
      <div className="p-4 bg-white rounded-xl border-4 border-black shadow-brutal-sm hover:shadow-brutal transition-shadow cursor-pointer"
           onClick={() => openResultDialog(dataItem)}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="font-black text-lg text-black">{dataItem.title}</h3>
              <p className="text-sm text-gray-600 font-medium">{dataItem.document} • Page {dataItem.page}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold border-2 border-green-300">
              {dataItem.relevance}% match
            </span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <p className="text-gray-700 mb-3 leading-relaxed">{dataItem.excerpt}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {dataItem.highlights.map((highlight, index) => (
              <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold border-2 border-yellow-300">
                {highlight}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            {dataItem.timestamp}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-black mb-2">Smart Search</h2>
        <p className="text-lg text-gray-600 font-medium">Search through your documents with AI-powered insights</p>
      </div>

      {/* Search Interface */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Ask anything about your documents... e.g., 'What is machine learning?'"
                className="w-full h-12 text-lg font-medium border-2 border-black rounded-xl shadow-brutal-sm"
                style={{ fontSize: '16px', padding: '12px 16px' }}
              />
            </div>
            <Button 
              className="h-12 px-8 rounded-xl font-bold" 
              onClick={() => handleSearch()}
              disabled={isSearching}
            >
              {isSearching ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <SearchIcon className="h-5 w-5 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>
          
          {/* Search Suggestions */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-sm font-bold text-gray-700">Quick search:</span>
            {recentSearches.slice(0, 3).map((search, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(search)
                  handleSearch(search)
                }}
                className="bg-white hover:bg-gray-50 px-3 py-1 rounded-full text-sm font-medium border-2 border-black shadow-brutal-sm transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Stats and Filters */}
      {searchResults.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-black text-black">Search Results</h3>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold border-2 border-blue-300">
              {searchResults.length} results found
            </span>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <History className="h-4 w-4 mr-2" />
              History
            </Button>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 ? (
        <div className="grid gap-6">
          <ListView
            data={searchResults}
            item={ResultItem}
            style={{ border: 'none', background: 'transparent' }}
          />
        </div>
      ) : !isSearching ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="space-y-6">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-4 border-black">
                <SearchIcon className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-black text-black mb-2">Start Your Search</h3>
                <p className="text-gray-600 mb-6">Ask questions about your documents or search for specific topics</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardHeader className="text-center">
                    <BookOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <CardTitle className="text-lg">Document Search</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-600 mb-4">Find specific information across all your documents</p>
                    <Button variant="outline" size="sm" onClick={() => {
                      setSearchQuery("machine learning algorithms")
                      handleSearch("machine learning algorithms")
                    }}>
                      Try Example
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
                  <CardHeader className="text-center">
                    <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <CardTitle className="text-lg">AI Q&A</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-600 mb-4">Ask questions and get intelligent answers from your content</p>
                    <Button variant="outline" size="sm" onClick={() => {
                      setSearchQuery("What is the difference between supervised and unsupervised learning?")
                      handleSearch("What is the difference between supervised and unsupervised learning?")
                    }}>
                      Ask Question
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <div className="animate-pulse space-y-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center border-4 border-black">
                <SearchIcon className="h-8 w-8 text-blue-600 animate-bounce" />
              </div>
              <h3 className="text-xl font-black text-black">Searching...</h3>
              <p className="text-gray-600">AI is analyzing your documents</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Result Detail Dialog */}
      {showDialog && selectedResult && (
        <Dialog
          title="Document Excerpt"
          onClose={() => setShowDialog(false)}
          width={700}
          height={500}
        >
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-xl font-black text-black mb-2">{selectedResult.title}</h3>
              <p className="text-gray-600 font-medium">{selectedResult.document} • Page {selectedResult.page}</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
              <p className="text-gray-800 leading-relaxed">{selectedResult.excerpt}</p>
            </div>
            
            <div className="flex gap-2">
              <span className="text-sm font-bold text-gray-700">Keywords:</span>
              {selectedResult.highlights.map((highlight, index) => (
                <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold border-2 border-yellow-300">
                  {highlight}
                </span>
              ))}
            </div>
            
            <div className="flex gap-3">
              <Button>
                <Brain className="h-4 w-4 mr-2" />
                Generate Quiz
              </Button>
              <Button variant="outline">
                <Star className="h-4 w-4 mr-2" />
                Save Excerpt
              </Button>
            </div>
          </div>
          
          <DialogActionsBar>
            <KendoButton onClick={() => setShowDialog(false)}>
              Close
            </KendoButton>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  )
}

export default SearchPage