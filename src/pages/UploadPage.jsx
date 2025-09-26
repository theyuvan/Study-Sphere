import React, { useState } from 'react'
import { Upload } from '@progress/kendo-react-upload'
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid'
import { DropDownList } from '@progress/kendo-react-dropdowns'
import { Notification, NotificationGroup } from '@progress/kendo-react-notification'
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
  Tag
} from 'lucide-react'

// Mock data for uploaded documents
const mockDocuments = [
  { 
    id: 1, 
    name: 'Computer Science Fundamentals.pdf', 
    size: '2.4 MB', 
    uploadDate: '2024-01-15',
    status: 'Processed',
    pages: 45,
    subject: 'Computer Science',
    type: 'PDF'
  },
  { 
    id: 2, 
    name: 'Machine Learning Notes.docx', 
    size: '1.8 MB', 
    uploadDate: '2024-01-14',
    status: 'Processing',
    pages: 32,
    subject: 'AI/ML',
    type: 'DOCX'
  },
  { 
    id: 3, 
    name: 'React Development Guide.pdf', 
    size: '3.1 MB', 
    uploadDate: '2024-01-13',
    status: 'Processed',
    pages: 67,
    subject: 'Web Development',
    type: 'PDF'
  },
]

const subjects = [
  { text: 'Computer Science', value: 'cs' },
  { text: 'Mathematics', value: 'math' },
  { text: 'Physics', value: 'physics' },
  { text: 'AI/ML', value: 'aiml' },
  { text: 'Web Development', value: 'webdev' },
  { text: 'Data Science', value: 'datascience' },
]

const UploadPage = () => {
  const [documents, setDocuments] = useState(mockDocuments)
  const [selectedSubject, setSelectedSubject] = useState(subjects[0])
  const [notifications, setNotifications] = useState([])

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

  const onUploadProgress = (event) => {
    console.log('Upload progress:', event.response)
  }

  const onUploadSuccess = (event) => {
    showNotification('Document uploaded successfully!', 'success')
    // In real app, would add to documents list
  }

  const onUploadError = (event) => {
    showNotification('Upload failed. Please try again.', 'error')
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
      case 'gif':
        return <Image className="h-5 w-5 text-green-500" />
      case 'mp4':
      case 'avi':
        return <Video className="h-5 w-5 text-purple-500" />
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const StatusCell = (props) => {
    const { dataItem } = props
    const statusColors = {
      'Processed': 'bg-green-100 text-green-800 border-green-300',
      'Processing': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Failed': 'bg-red-100 text-red-800 border-red-300',
    }
    
    return (
      <td>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${statusColors[dataItem.status] || 'bg-gray-100 text-gray-800 border-gray-300'}`}>
          {dataItem.status}
        </span>
      </td>
    )
  }

  const ActionCell = (props) => {
    const { dataItem } = props
    
    return (
      <td>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    )
  }

  return (
    <div className="space-y-8">
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
        <h2 className="text-3xl font-black text-black mb-2">Document Library</h2>
        <p className="text-lg text-gray-600 font-medium">Upload and manage your study materials</p>
      </div>

      {/* Upload Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <UploadIcon className="h-6 w-6 text-blue-600" />
              Upload Documents
            </CardTitle>
            <CardDescription>
              Drag and drop files or click to browse. Supported: PDF, DOCX, TXT, Images
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
              <Upload
                batch={false}
                multiple={true}
                defaultFiles={[]}
                withCredentials={false}
                saveUrl={'http://your-backend-url/api/upload'}
                removeUrl={'http://your-backend-url/api/remove'}
                onProgress={onUploadProgress}
                onStatusChange={onUploadSuccess}
                onError={onUploadError}
                restrictions={{
                  allowedExtensions: ['.pdf', '.docx', '.doc', '.txt', '.jpg', '.png'],
                  maxFileSize: 10485760 // 10MB
                }}
              />
            </div>

            <div className="bg-white/60 p-4 rounded-xl border-2 border-black">
              <h4 className="font-bold text-black mb-2">Upload Tips:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Maximum file size: 10MB</li>
                <li>• Best formats: PDF, DOCX for text documents</li>
                <li>• Clear, high-quality scans work better</li>
                <li>• Processing time: 1-5 minutes per document</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Upload Stats */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Target className="h-6 w-6 text-green-600" />
                Storage Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span>Used</span>
                    <span>156 MB / 1 GB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 border-2 border-black">
                    <div className="bg-green-500 h-full rounded-full border-r-2 border-black" style={{ width: '15.6%' }}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-black text-black">24</div>
                    <div className="text-sm text-gray-600">Documents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-black">98%</div>
                    <div className="text-sm text-gray-600">Processed</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Zap className="h-6 w-6 text-orange-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border-2 border-black">
                  <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-bold text-sm">ML Notes processed</div>
                    <div className="text-xs text-gray-600">2 minutes ago</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/60 rounded-xl border-2 border-black">
                  <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="font-bold text-sm">Quiz generated</div>
                    <div className="text-xs text-gray-600">1 hour ago</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Documents Grid */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-black">Your Documents</CardTitle>
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
                <div className="flex items-center gap-4 p-2">
                  <span className="text-sm font-bold">Total: {documents.length} documents</span>
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
                        <div className="text-xs text-gray-600">{props.dataItem.size}</div>
                      </div>
                    </div>
                  </td>
                )}
              />
              <GridColumn field="subject" title="Subject" width="150px" />
              <GridColumn field="pages" title="Pages" width="80px" />
              <GridColumn field="status" title="Status" width="120px" cell={StatusCell} />
              <GridColumn field="uploadDate" title="Uploaded" width="120px" />
              <GridColumn title="Actions" width="150px" cell={ActionCell} />
            </Grid>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default UploadPage