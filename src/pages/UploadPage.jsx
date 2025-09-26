import React, { useState, useEffect } from 'react'
import { Upload } from '@progress/kendo-react-upload'
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid'
import { DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns'
import { Notification, NotificationGroup } from '@progress/kendo-react-notification'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { TextArea, Input as KendoInput, Switch } from '@progress/kendo-react-inputs'
import { ListView } from '@progress/kendo-react-listview'
import { ProgressBar } from '@progress/kendo-react-progressbars'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { 
  Upload as UploadIcon, 
  FileText, 
  Image, 
  Video,
  Music,
  Archive,
  Trash2,
  Eye,
  Download,
  Tag,
  Target,
  Zap,
  Plus,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
  Play,
  MessageSquare,
  BookOpen,
  Settings
} from 'lucide-react'

// Mock data for uploaded documents with processing states
const mockDocuments = [
  { 
    id: 1, 
    name: 'Computer Science Fundamentals.pdf', 
    size: '2.4 MB', 
    uploadDate: '2025-09-25T10:30:00Z',
    status: 'ready',
    stages: ['uploaded', 'parsing', 'chunking', 'indexing'],
    progress: 100,
    pages: 45,
    subject: 'Computer Science',
    type: 'PDF',
    chunks: 23,
    summary: 'Comprehensive guide covering algorithms, data structures, and programming fundamentals.'
  },
  { 
    id: 2, 
    name: 'Machine Learning Notes.docx', 
    size: '1.8 MB', 
    uploadDate: '2025-09-25T11:15:00Z',
    status: 'indexing',
    stages: ['uploaded', 'parsing', 'chunking', 'indexing'],
    progress: 75,
    pages: 32,
    subject: 'AI/ML',
    type: 'DOCX',
    chunks: 18,
    summary: 'Advanced machine learning concepts and practical implementations.'
  },
  { 
    id: 3, 
    name: 'Physics Thermodynamics.pdf', 
    size: '3.1 MB', 
    uploadDate: '2025-09-25T09:45:00Z',
    status: 'parsing',
    stages: ['uploaded', 'parsing', 'chunking', 'indexing'],
    progress: 25,
    pages: 67,
    subject: 'Physics',
    type: 'PDF',
    chunks: 0,
    summary: ''
  },
]

const subjects = [
  { text: 'Computer Science', value: 'cs' },
  { text: 'Mathematics', value: 'math' },
  { text: 'Physics', value: 'physics' },
  { text: 'Chemistry', value: 'chemistry' },
  { text: 'Biology', value: 'biology' },
  { text: 'AI/ML', value: 'aiml' },
  { text: 'Web Development', value: 'webdev' },
  { text: 'Data Science', value: 'datascience' },
  { text: 'Engineering', value: 'engineering' },
  { text: 'Business', value: 'business' },
]

const tagOptions = [
  { text: 'Exam Prep', value: 'exam' },
  { text: 'Homework', value: 'homework' },
  { text: 'Research', value: 'research' },
  { text: 'Lecture Notes', value: 'lecture' },
  { text: 'Reference', value: 'reference' },
  { text: 'Tutorial', value: 'tutorial' },
  { text: 'Quick Review', value: 'review' },
]

const UploadPage = () => {
  const [documents, setDocuments] = useState(mockDocuments)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [previewDocument, setPreviewDocument] = useState(null)
  
  // Metadata form state
  const [selectedSubject, setSelectedSubject] = useState(subjects[0])
  const [selectedTags, setSelectedTags] = useState([])
  const [isPrivate, setIsPrivate] = useState(false)
  const [notes, setNotes] = useState('')

  useEffect(() => {
    // Simulate real-time processing updates
    const interval = setInterval(() => {
      setDocuments(prev => prev.map(doc => {
        if (doc.status === 'parsing' && doc.progress < 50) {
          return { ...doc, progress: Math.min(doc.progress + 5, 50) }
        }
        if (doc.status === 'indexing' && doc.progress < 100) {
          return { ...doc, progress: Math.min(doc.progress + 3, 100), status: doc.progress >= 97 ? 'ready' : 'indexing' }
        }
        return doc
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const showNotification = (message, type = 'success') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      show: true
    }
    setNotifications(prev => [...prev, newNotification])
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id))
    }, 5000)
  }

  const onUploadAdd = (event) => {
    const files = event.newState
    setSelectedFiles(files)
    
    // Validate files
    const validFiles = files.filter(file => {
      const validExtensions = ['.pdf', '.docx', '.doc', '.txt', '.jpg', '.png', '.jpeg']
      const extension = '.' + file.name.split('.').pop().toLowerCase()
      const isValidSize = file.size <= 50 * 1024 * 1024 // 50MB limit
      
      if (!validExtensions.includes(extension)) {
        showNotification(`${file.name}: Unsupported file type`, 'error')
        return false
      }
      if (!isValidSize) {
        showNotification(`${file.name}: File too large (max 50MB)`, 'error')
        return false
      }
      return true
    })

    if (validFiles.length !== files.length) {
      setSelectedFiles(validFiles)
    }
  }

  const onUploadRemove = (event) => {
    setSelectedFiles(event.newState)
  }

  const simulateUpload = async () => {
    if (selectedFiles.length === 0) {
      showNotification('Please select files to upload', 'warning')
      return
    }

    setIsUploading(true)
    
    for (const file of selectedFiles) {
      // Simulate upload process
      const newDoc = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        uploadDate: new Date().toISOString(),
        status: 'uploading',
        stages: ['uploaded', 'parsing', 'chunking', 'indexing'],
        progress: 0,
        pages: Math.floor(Math.random() * 50) + 10,
        subject: selectedSubject.text,
        type: file.name.split('.').pop().toUpperCase(),
        chunks: 0,
        summary: '',
        tags: selectedTags.map(tag => tag.text),
        private: isPrivate,
        notes: notes
      }

      setDocuments(prev => [newDoc, ...prev])
      
      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setDocuments(prev => prev.map(doc => 
          doc.id === newDoc.id ? { ...doc, progress, status: progress === 100 ? 'parsing' : 'uploading' } : doc
        ))
      }
    }

    setSelectedFiles([])
    setIsUploading(false)
    showNotification(`Successfully uploaded ${selectedFiles.length} file(s)`, 'success')
  }

  const handleQuickAction = (action, doc) => {
    switch (action) {
      case 'preview':
        setPreviewDocument(doc)
        setShowPreviewDialog(true)
        break
      case 'ask':
        showNotification(`Opening Q&A for "${doc.name}"`, 'info')
        break
      case 'quiz':
        showNotification(`Generating quiz from "${doc.name}"`, 'info')
        break
      case 'delete':
        setDocuments(prev => prev.filter(d => d.id !== doc.id))
        showNotification(`Deleted "${doc.name}"`, 'success')
        break
      default:
        break
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
      case 'parsing':
      case 'chunking':
      case 'indexing':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'ready':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />
      case 'docx':
      case 'doc':
        return <FileText className="h-5 w-5 text-blue-500" />
      case 'jpg':
      case 'png':
      case 'jpeg':
        return <Image className="h-5 w-5 text-green-500" />
      case 'mp4':
      case 'avi':
        return <Video className="h-5 w-5 text-purple-500" />
      case 'txt':
        return <FileText className="h-5 w-5 text-gray-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const StatusCell = ({ dataItem }) => {
    const statusColors = {
      'ready': 'bg-green-100 text-green-800 border-green-300',
      'uploading': 'bg-blue-100 text-blue-800 border-blue-300',
      'parsing': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'chunking': 'bg-orange-100 text-orange-800 border-orange-300',
      'indexing': 'bg-purple-100 text-purple-800 border-purple-300',
      'failed': 'bg-red-100 text-red-800 border-red-300',
    }
    
    return (
      <td>
        <div className="flex items-center gap-2">
          {getStatusIcon(dataItem.status)}
          <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${statusColors[dataItem.status] || 'bg-gray-100 text-gray-800 border-gray-300'}`}>
            {dataItem.status === 'ready' ? 'Ready' : 
             dataItem.status === 'uploading' ? 'Uploading' :
             dataItem.status === 'parsing' ? 'Extracting Text' :
             dataItem.status === 'chunking' ? 'Processing' :
             dataItem.status === 'indexing' ? 'Indexing' :
             'Failed'}
          </span>
          {dataItem.status !== 'ready' && dataItem.status !== 'failed' && (
            <span className="text-xs text-gray-500">({dataItem.progress}%)</span>
          )}
        </div>
      </td>
    )
  }

  const ActionCell = ({ dataItem }) => {
    const isReady = dataItem.status === 'ready'
    
    return (
      <td>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleQuickAction('preview', dataItem)}
            disabled={!isReady}
            title="Preview text"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleQuickAction('ask', dataItem)}
            disabled={!isReady}
            title="Ask questions"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleQuickAction('quiz', dataItem)}
            disabled={!isReady}
            title="Generate quiz"
          >
            <BookOpen className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleQuickAction('delete', dataItem)}
            title="Delete document"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    )
  }

  const ProcessingQueue = () => {
    const processingDocs = documents.filter(doc => doc.status !== 'ready')
    
    if (processingDocs.length === 0) return null

    return (
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-600" />
            Processing Queue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {processingDocs.map(doc => (
              <div key={doc.id} className="bg-white/60 p-4 rounded-xl border-2 border-black">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getFileIcon(doc.type)}
                    <span className="font-bold text-sm">{doc.name}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleQuickAction('delete', doc)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>{doc.status === 'uploading' ? 'Uploading' : 
                           doc.status === 'parsing' ? 'Extracting text' :
                           doc.status === 'chunking' ? 'Processing content' :
                           doc.status === 'indexing' ? 'Indexing for search' : 'Processing'}</span>
                    <span>{doc.progress}%</span>
                  </div>
                  <ProgressBar value={doc.progress} className="w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6 h-full">
      {/* Notifications */}
      <NotificationGroup style={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
        {notifications.map(notification => (
          <Notification 
            key={notification.id}
            type={{ style: notification.type }}
            closable={true}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          >
            {notification.message}
          </Notification>
        ))}
      </NotificationGroup>

      {/* Header */}
      <div>
        <h2 className="text-3xl font-black text-black mb-2">Upload Documents</h2>
        <p className="text-lg text-gray-600 font-medium">
          Add study materials to power your AI-driven learning experience
        </p>
      </div>

      {/* Main Layout - Two Column on Desktop */}
      <div className="grid lg:grid-cols-3 gap-6 h-full">
        {/* Left Column - Upload Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Drag & Drop Upload Panel */}
          <Card className="bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <UploadIcon className="h-6 w-6 text-purple-600" />
                Upload Study Materials
              </CardTitle>
              <CardDescription>
                Drop PDFs, text files, or images here — we'll extract the text and index it for instant Q&A
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Upload Area */}
              <div 
                className="border-4 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white/60 hover:bg-white/80 transition-colors"
                role="region"
                aria-label="Upload notes"
              >
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                    <UploadIcon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-black mb-2">
                      Drag & Drop Your Files
                    </h3>
                    <p className="text-gray-600">
                      Or click to browse and select files from your device
                    </p>
                  </div>
                  
                  <Upload
                    batch={false}
                    multiple={true}
                    defaultFiles={selectedFiles}
                    onAdd={onUploadAdd}
                    onRemove={onUploadRemove}
                    withCredentials={false}
                    autoUpload={false}
                    restrictions={{
                      allowedExtensions: ['.pdf', '.docx', '.doc', '.txt', '.jpg', '.png', '.jpeg'],
                      maxFileSize: 52428800 // 50MB
                    }}
                    disabled={isUploading}
                  />

                  {selectedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">
                          Selected Files ({selectedFiles.length})
                        </span>
                        <Button 
                          onClick={simulateUpload}
                          disabled={isUploading}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold"
                        >
                          {isUploading ? 'Uploading...' : 'Start Upload'}
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Sample Upload Button */}
                  <div className="pt-4 border-t border-gray-200">
                    <Button 
                      variant="outline" 
                      onClick={() => showNotification('Sample documents loaded!', 'info')}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Upload Sample Notes
                    </Button>
                  </div>
                </div>
              </div>

              {/* Upload Instructions */}
              <Card className="bg-white/60 border-2 border-black">
                <CardContent className="p-4">
                  <h4 className="font-bold text-black mb-3 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600" />
                    Upload Guidelines
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-bold text-black mb-1">Supported Files:</div>
                      <ul className="text-gray-700 space-y-1">
                        <li>• PDFs (text-based or scanned)</li>
                        <li>• Word Documents (.docx, .doc)</li>
                        <li>• Text Files (.txt)</li>
                        <li>• Images (.jpg, .png, .jpeg)</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-bold text-black mb-1">Best Practices:</div>
                      <ul className="text-gray-700 space-y-1">
                        <li>• Maximum size: 50MB per file</li>
                        <li>• High-quality scans preferred</li>
                        <li>• Processing time: 1-5 minutes</li>
                        <li>• Clear text improves accuracy</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Processing Queue */}
          <ProcessingQueue />

          {/* Upload History - Recent uploads ListView */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-black">Recent Uploads</CardTitle>
              <CardDescription>Your latest processed documents</CardDescription>
            </CardHeader>
            <CardContent>
              <ListView
                data={documents.slice(0, 3)}
                item={(props) => (
                  <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl border-2 border-black mb-3">
                    <div className="flex items-center gap-3">
                      {getFileIcon(props.dataItem.type)}
                      <div>
                        <div className="font-bold text-sm">{props.dataItem.name}</div>
                        <div className="text-xs text-gray-600 flex items-center gap-2">
                          <span>{props.dataItem.size}</span>
                          <span>•</span>
                          <span>{props.dataItem.chunks} chunks</span>
                          <span>•</span>
                          <span>{new Date(props.dataItem.uploadDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center gap-2">
                      {getStatusIcon(props.dataItem.status)}
                      <span className="text-xs font-bold">
                        {props.dataItem.status === 'ready' ? 'Ready' : 'Processing...'}
                      </span>
                    </div>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Metadata & Controls */}
        <div className="space-y-6">
          {/* Metadata Form */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Settings className="h-6 w-6 text-green-600" />
                Document Settings
              </CardTitle>
              <CardDescription>Configure how your documents are processed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Subject Category
                  </label>
                  <DropDownList
                    data={subjects}
                    textField="text"
                    dataItemKey="value"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Tags
                  </label>
                  <MultiSelect
                    data={tagOptions}
                    textField="text"
                    dataItemKey="value"
                    value={selectedTags}
                    onChange={(e) => setSelectedTags(e.target.value)}
                    placeholder="Select tags..."
                    style={{ width: '100%' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Privacy Setting
                  </label>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                    />
                    <span className="text-sm text-gray-700">
                      {isPrivate ? 'Private' : 'Shared'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-black mb-2">
                    Notes (Optional)
                  </label>
                  <TextArea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add notes about this document..."
                    rows={3}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Storage Usage */}
          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-orange-600" />
                Storage Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span>Used Storage</span>
                    <span>156 MB / 1 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 border-2 border-black">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 h-full rounded-full" 
                      style={{ width: '15.6%' }}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-2xl font-black text-black">{documents.length}</div>
                    <div className="text-sm text-gray-600">Documents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-black">
                      {Math.round(documents.filter(d => d.status === 'ready').length / documents.length * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Processed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-pink-50 to-rose-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-pink-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => showNotification('Opening search interface...', 'info')}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Ask Q&A
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => showNotification('Generating quiz...', 'info')}
                >
                  <BookOpen className="h-4 w-4 mr-1" />
                  Make Quiz
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => showNotification('Opening bulk upload...', 'info')}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Bulk Upload
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => showNotification('Opening analytics...', 'info')}
                >
                  <Target className="h-4 w-4 mr-1" />
                  Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Document Library Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-black">Document Library</CardTitle>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Tag className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Bulk Upload
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ height: '400px' }}>
            <Grid
              data={documents}
              style={{ height: '100%' }}
              sortable={true}
              filterable={true}
              pageable={{
                buttonCount: 4,
                pageSizes: [5, 10, 15],
                pageSizeValue: 10
              }}
            >
              <GridToolbar>
                <div className="flex items-center gap-4 p-2" aria-live="polite">
                  <span className="text-sm font-bold">
                    Total: {documents.length} documents | 
                    Ready: {documents.filter(d => d.status === 'ready').length} | 
                    Processing: {documents.filter(d => d.status !== 'ready' && d.status !== 'failed').length}
                  </span>
                </div>
              </GridToolbar>
              
              <GridColumn 
                field="name" 
                title="Document" 
                width="300px"
                cell={(props) => (
                  <td>
                    <div className="flex items-center gap-3">
                      {getFileIcon(props.dataItem.type)}
                      <div>
                        <div className="font-bold text-sm">{props.dataItem.name}</div>
                        <div className="text-xs text-gray-600">
                          {props.dataItem.size} • {props.dataItem.chunks} chunks
                        </div>
                      </div>
                    </div>
                  </td>
                )}
              />
              <GridColumn field="subject" title="Subject" width="120px" />
              <GridColumn field="pages" title="Pages" width="80px" />
              <GridColumn 
                field="status" 
                title="Status" 
                width="150px" 
                cell={StatusCell} 
              />
              <GridColumn 
                field="uploadDate" 
                title="Uploaded" 
                width="120px"
                cell={(props) => (
                  <td>
                    {new Date(props.dataItem.uploadDate).toLocaleDateString()}
                  </td>
                )}
              />
              <GridColumn title="Actions" width="180px" cell={ActionCell} />
            </Grid>
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      {showPreviewDialog && previewDocument && (
        <Dialog 
          title="Document Preview"
          onClose={() => setShowPreviewDialog(false)}
          width="800px"
          height="600px"
        >
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              {getFileIcon(previewDocument.type)}
              <div>
                <h3 className="font-bold text-lg">{previewDocument.name}</h3>
                <p className="text-sm text-gray-600">{previewDocument.summary}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Document Stats:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Pages: {previewDocument.pages}</div>
                <div>Chunks: {previewDocument.chunks}</div>
                <div>Subject: {previewDocument.subject}</div>
                <div>Size: {previewDocument.size}</div>
              </div>
            </div>

            {previewDocument.status === 'ready' && (
              <div className="bg-white p-4 border rounded-lg">
                <h4 className="font-bold mb-2">Sample Text Preview:</h4>
                <p className="text-sm text-gray-700">
                  This document has been successfully processed and is ready for Q&A. 
                  The content has been chunked into {previewDocument.chunks} searchable segments 
                  for optimal retrieval accuracy.
                </p>
              </div>
            )}
          </div>
          
          <DialogActionsBar>
            <Button onClick={() => setShowPreviewDialog(false)}>
              Close
            </Button>
            {previewDocument.status === 'ready' && (
              <>
                <Button onClick={() => handleQuickAction('ask', previewDocument)}>
                  Ask Questions
                </Button>
                <Button onClick={() => handleQuickAction('quiz', previewDocument)}>
                  Generate Quiz
                </Button>
              </>
            )}
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  )
}

export default UploadPage