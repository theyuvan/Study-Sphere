import React, { useState, useEffect } from 'react'
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid'
import { DropDownList, MultiSelect, ComboBox } from '@progress/kendo-react-dropdowns'
import { Notification, NotificationGroup } from '@progress/kendo-react-notification'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { Input, TextArea } from '@progress/kendo-react-inputs'
import { ListView } from '@progress/kendo-react-listview'
import { DatePicker } from '@progress/kendo-react-dateinputs'
import { Badge } from '@progress/kendo-react-indicators'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card'
import Button from '../components/ui/Button'
import { 
  BookOpen, 
  Filter,
  Search,
  Eye,
  Download,
  Trash2,
  Star,
  Clock,
  User,
  Calendar,
  FileText,
  Image,
  Video,
  Archive,
  Tag,
  Plus,
  Grid3X3,
  List,
  Settings,
  BarChart3,
  TrendingUp,
  Heart,
  MessageSquare,
  Play,
  BookMarked,
  GraduationCap,
  Lightbulb
} from 'lucide-react'

// Enhanced mock library data
const libraryData = [
  {
    id: 1,
    title: "Fundamentals of Physics",
    author: "David Halliday",
    subject: "Physics",
    type: "PDF",
    pages: 1248,
    dateAdded: "2025-09-20",
    dateModified: "2025-09-25",
    status: "completed",
    progress: 100,
    rating: 5,
    tags: ["Mechanics", "Thermodynamics", "Waves"],
    description: "Comprehensive physics textbook covering fundamental principles",
    size: "45.2 MB",
    readTime: "124 hours",
    chapters: 44,
    bookmarked: true,
    notes: 23,
    highlights: 67
  },
  {
    id: 2,
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    subject: "Computer Science",
    type: "PDF",
    pages: 1292,
    dateAdded: "2025-09-18",
    dateModified: "2025-09-24",
    status: "reading",
    progress: 65,
    rating: 5,
    tags: ["Data Structures", "Algorithms", "Complexity"],
    description: "The definitive guide to algorithms and data structures",
    size: "38.7 MB",
    readTime: "98 hours",
    chapters: 35,
    bookmarked: true,
    notes: 45,
    highlights: 89
  },
  {
    id: 3,
    title: "Design Patterns",
    author: "Erich Gamma",
    subject: "Software Engineering",
    type: "PDF",
    pages: 395,
    dateAdded: "2025-09-15",
    dateModified: "2025-09-22",
    status: "completed",
    progress: 100,
    rating: 4,
    tags: ["OOP", "Design Patterns", "Architecture"],
    description: "Essential patterns for object-oriented software design",
    size: "12.3 MB",
    readTime: "32 hours",
    chapters: 23,
    bookmarked: false,
    notes: 18,
    highlights: 34
  },
  {
    id: 4,
    title: "Machine Learning Yearning",
    author: "Andrew Ng",
    subject: "AI/ML",
    type: "PDF",
    pages: 118,
    dateAdded: "2025-09-10",
    dateModified: "2025-09-21",
    status: "reading",
    progress: 80,
    rating: 5,
    tags: ["ML Strategy", "Deep Learning", "AI"],
    description: "Strategic approach to machine learning projects",
    size: "5.8 MB",
    readTime: "12 hours",
    chapters: 15,
    bookmarked: true,
    notes: 12,
    highlights: 28
  },
  {
    id: 5,
    title: "Clean Code",
    author: "Robert C. Martin",
    subject: "Software Engineering",
    type: "PDF",
    pages: 464,
    dateAdded: "2025-09-08",
    dateModified: "2025-09-20",
    status: "planning",
    progress: 0,
    rating: 0,
    tags: ["Clean Code", "Best Practices", "Refactoring"],
    description: "A handbook of agile software craftsmanship",
    size: "18.5 MB",
    readTime: "45 hours",
    chapters: 17,
    bookmarked: false,
    notes: 0,
    highlights: 0
  },
  {
    id: 6,
    title: "Linear Algebra Done Right",
    author: "Sheldon Axler",
    subject: "Mathematics",
    type: "PDF",
    pages: 340,
    dateAdded: "2025-09-05",
    dateModified: "2025-09-19",
    status: "reading",
    progress: 40,
    rating: 4,
    tags: ["Linear Algebra", "Vector Spaces", "Eigenvalues"],
    description: "Intuitive approach to linear algebra concepts",
    size: "15.2 MB",
    readTime: "65 hours",
    chapters: 10,
    bookmarked: true,
    notes: 8,
    highlights: 22
  }
]

const subjects = [
  { text: 'All Subjects', value: '' },
  { text: 'Physics', value: 'Physics' },
  { text: 'Computer Science', value: 'Computer Science' },
  { text: 'Software Engineering', value: 'Software Engineering' },
  { text: 'AI/ML', value: 'AI/ML' },
  { text: 'Mathematics', value: 'Mathematics' },
  { text: 'Chemistry', value: 'Chemistry' },
  { text: 'Biology', value: 'Biology' },
]

const statusOptions = [
  { text: 'All Status', value: '' },
  { text: 'Planning to Read', value: 'planning' },
  { text: 'Currently Reading', value: 'reading' },
  { text: 'Completed', value: 'completed' },
]

const sortOptions = [
  { text: 'Recently Added', value: 'dateAdded' },
  { text: 'Title (A-Z)', value: 'title' },
  { text: 'Author (A-Z)', value: 'author' },
  { text: 'Progress', value: 'progress' },
  { text: 'Rating', value: 'rating' },
  { text: 'Pages', value: 'pages' },
]

const LibraryPage = () => {
  const [documents, setDocuments] = useState(libraryData)
  const [filteredData, setFilteredData] = useState(libraryData)
  const [selectedSubject, setSelectedSubject] = useState(subjects[0])
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0])
  const [selectedSort, setSelectedSort] = useState(sortOptions[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [notifications, setNotifications] = useState([])
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)

  useEffect(() => {
    let filtered = documents

    // Filter by subject
    if (selectedSubject.value) {
      filtered = filtered.filter(doc => doc.subject === selectedSubject.value)
    }

    // Filter by status
    if (selectedStatus.value) {
      filtered = filtered.filter(doc => doc.status === selectedStatus.value)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Sort
    filtered.sort((a, b) => {
      switch (selectedSort.value) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'author':
          return a.author.localeCompare(b.author)
        case 'progress':
          return b.progress - a.progress
        case 'rating':
          return b.rating - a.rating
        case 'pages':
          return b.pages - a.pages
        case 'dateAdded':
        default:
          return new Date(b.dateAdded) - new Date(a.dateAdded)
      }
    })

    setFilteredData(filtered)
  }, [documents, selectedSubject, selectedStatus, selectedSort, searchTerm])

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

  const handleDocumentAction = (action, document) => {
    switch (action) {
      case 'view':
        setSelectedDocument(document)
        setShowDetailDialog(true)
        break
      case 'bookmark':
        setDocuments(prev => prev.map(doc => 
          doc.id === document.id 
            ? { ...doc, bookmarked: !doc.bookmarked }
            : doc
        ))
        showNotification(`${document.bookmarked ? 'Removed from' : 'Added to'} bookmarks`)
        break
      case 'download':
        showNotification(`Downloading "${document.title}"...`, 'info')
        break
      case 'delete':
        setDocuments(prev => prev.filter(doc => doc.id !== document.id))
        showNotification(`Deleted "${document.title}"`)
        break
      case 'read':
        showNotification(`Opening "${document.title}" for reading...`, 'info')
        break
      default:
        break
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
      default:
        return <FileText className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'reading':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'planning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'reading':
        return 'Reading'
      case 'planning':
        return 'Planning'
      default:
        return 'Unknown'
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
      />
    ))
  }

  const StatusCell = ({ dataItem }) => (
    <td>
      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(dataItem.status)}`}>
        {getStatusText(dataItem.status)}
      </span>
    </td>
  )

  const ProgressCell = ({ dataItem }) => (
    <td>
      <div className="flex items-center gap-2">
        <div className="w-16 bg-gray-200 rounded-full h-2 border border-black">
          <div 
            className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full" 
            style={{ width: `${dataItem.progress}%` }}
          />
        </div>
        <span className="text-xs font-bold">{dataItem.progress}%</span>
      </div>
    </td>
  )

  const RatingCell = ({ dataItem }) => (
    <td>
      <div className="flex items-center gap-1">
        {renderStars(dataItem.rating)}
      </div>
    </td>
  )

  const ActionCell = ({ dataItem }) => (
    <td>
      <div className="flex gap-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleDocumentAction('view', dataItem)}
          title="View details"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleDocumentAction('read', dataItem)}
          title="Start reading"
        >
          <Play className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleDocumentAction('bookmark', dataItem)}
          title={dataItem.bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Heart className={`h-4 w-4 ${dataItem.bookmarked ? 'text-red-500 fill-red-500' : ''}`} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleDocumentAction('download', dataItem)}
          title="Download"
        >
          <Download className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleDocumentAction('delete', dataItem)}
          title="Delete"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </td>
  )

  const LibraryStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <span className="text-2xl font-black text-black">{documents.length}</span>
          </div>
          <div className="text-sm text-gray-600">Total Books</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GraduationCap className="h-5 w-5 text-green-600" />
            <span className="text-2xl font-black text-black">
              {documents.filter(d => d.status === 'completed').length}
            </span>
          </div>
          <div className="text-sm text-gray-600">Completed</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-orange-50 to-yellow-50">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span className="text-2xl font-black text-black">
              {documents.filter(d => d.status === 'reading').length}
            </span>
          </div>
          <div className="text-sm text-gray-600">Reading</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
        <CardContent className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-purple-600" />
            <span className="text-2xl font-black text-black">
              {documents.filter(d => d.bookmarked).length}
            </span>
          </div>
          <div className="text-sm text-gray-600">Bookmarked</div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <div className="space-y-6">
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
        <h2 className="text-3xl font-black text-black mb-2">My Library</h2>
        <p className="text-lg text-gray-600 font-medium">
          Manage and explore your collection of study materials
        </p>
      </div>

      {/* Library Stats */}
      <LibraryStats />

      {/* Filters and Controls */}
      <Card className="bg-gradient-to-br from-gray-50 to-slate-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Filter className="h-6 w-6 text-gray-600" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {/* Search */}
            <div className="xl:col-span-2">
              <label className="block text-sm font-bold text-black mb-2">
                Search Books
              </label>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, author, or tags..."
                style={{ width: '100%' }}
              />
            </div>

            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Subject
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

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Status
              </label>
              <DropDownList
                data={statusOptions}
                textField="text"
                dataItemKey="value"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-bold text-black mb-2">
                Sort By
              </label>
              <DropDownList
                data={sortOptions}
                textField="text"
                dataItemKey="value"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-end gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                title="Grid view"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                title="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setSelectedSubject(subjects[0])
                setSelectedStatus(statusOptions[0])
                setSearchTerm('')
              }}
            >
              Clear All Filters
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedStatus(statusOptions.find(s => s.value === 'reading'))}
            >
              Currently Reading
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setDocuments(prev => prev.filter(d => d.bookmarked))}
            >
              Show Bookmarked
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedSort(sortOptions.find(s => s.value === 'rating'))}
            >
              Highest Rated
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {filteredData.length} of {documents.length} books
        </div>
        <Button 
          size="sm"
          onClick={() => showNotification('Opening add book dialog...', 'info')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Book
        </Button>
      </div>

      {/* Library Grid/List */}
      <Card>
        <CardContent className="p-0">
          <div style={{ height: '600px' }}>
            <Grid
              data={filteredData}
              style={{ height: '100%' }}
              sortable={true}
              filterable={true}
              pageable={{
                buttonCount: 5,
                pageSizes: [10, 20, 50],
                pageSizeValue: 20
              }}
              onRowClick={(e) => handleDocumentAction('view', e.dataItem)}
            >
              <GridToolbar>
                <div className="flex items-center gap-4 p-3">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  <span className="font-bold">
                    Library Collection ({filteredData.length} books)
                  </span>
                </div>
              </GridToolbar>
              
              <GridColumn 
                field="title" 
                title="Book Details" 
                width="300px"
                cell={(props) => (
                  <td>
                    <div className="flex items-center gap-3 py-2">
                      {getFileIcon(props.dataItem.type)}
                      <div>
                        <div className="font-bold text-sm">{props.dataItem.title}</div>
                        <div className="text-xs text-gray-600">
                          by {props.dataItem.author}
                        </div>
                        <div className="flex gap-1 mt-1">
                          {props.dataItem.tags.slice(0, 2).map(tag => (
                            <span 
                              key={tag} 
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded border border-blue-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                )}
              />
              
              <GridColumn field="subject" title="Subject" width="130px" />
              <GridColumn 
                field="pages" 
                title="Pages" 
                width="80px"
                cell={(props) => (
                  <td className="text-center">{props.dataItem.pages}</td>
                )}
              />
              <GridColumn field="status" title="Status" width="120px" cell={StatusCell} />
              <GridColumn field="progress" title="Progress" width="150px" cell={ProgressCell} />
              <GridColumn field="rating" title="Rating" width="120px" cell={RatingCell} />
              <GridColumn 
                field="dateAdded" 
                title="Added" 
                width="100px"
                cell={(props) => (
                  <td>{new Date(props.dataItem.dateAdded).toLocaleDateString()}</td>
                )}
              />
              <GridColumn title="Actions" width="200px" cell={ActionCell} />
            </Grid>
          </div>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      {showDetailDialog && selectedDocument && (
        <Dialog 
          title={selectedDocument.title}
          onClose={() => setShowDetailDialog(false)}
          width="900px"
          height="700px"
        >
          <div className="p-6 space-y-6">
            {/* Book Header */}
            <div className="flex items-start gap-4">
              <div className="w-24 h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg border-2 border-black flex items-center justify-center">
                {getFileIcon(selectedDocument.type)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-black text-black mb-2">{selectedDocument.title}</h3>
                <p className="text-gray-600 mb-2">by {selectedDocument.author}</p>
                <p className="text-sm text-gray-700 mb-3">{selectedDocument.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    {renderStars(selectedDocument.rating)}
                    <span className="ml-1">({selectedDocument.rating}/5)</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(selectedDocument.status)}`}>
                    {getStatusText(selectedDocument.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg border-2 border-black text-center">
                <div className="text-lg font-black text-black">{selectedDocument.pages}</div>
                <div className="text-xs text-gray-600">Pages</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border-2 border-black text-center">
                <div className="text-lg font-black text-black">{selectedDocument.progress}%</div>
                <div className="text-xs text-gray-600">Progress</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg border-2 border-black text-center">
                <div className="text-lg font-black text-black">{selectedDocument.notes}</div>
                <div className="text-xs text-gray-600">Notes</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border-2 border-black text-center">
                <div className="text-lg font-black text-black">{selectedDocument.highlights}</div>
                <div className="text-xs text-gray-600">Highlights</div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <h4 className="font-bold mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDocument.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded border border-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-bold mb-2">Details</h4>
                <div className="space-y-1">
                  <div>Subject: {selectedDocument.subject}</div>
                  <div>Size: {selectedDocument.size}</div>
                  <div>Chapters: {selectedDocument.chapters}</div>
                  <div>Est. Read Time: {selectedDocument.readTime}</div>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-2">Dates</h4>
                <div className="space-y-1">
                  <div>Added: {new Date(selectedDocument.dateAdded).toLocaleDateString()}</div>
                  <div>Modified: {new Date(selectedDocument.dateModified).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogActionsBar>
            <Button onClick={() => setShowDetailDialog(false)}>
              Close
            </Button>
            <Button onClick={() => handleDocumentAction('read', selectedDocument)}>
              <Play className="h-4 w-4 mr-2" />
              Start Reading
            </Button>
            <Button onClick={() => handleDocumentAction('bookmark', selectedDocument)}>
              <Heart className={`h-4 w-4 mr-2 ${selectedDocument.bookmarked ? 'fill-red-500 text-red-500' : ''}`} />
              {selectedDocument.bookmarked ? 'Unbookmark' : 'Bookmark'}
            </Button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  )
}

export default LibraryPage