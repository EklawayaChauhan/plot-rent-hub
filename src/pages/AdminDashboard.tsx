import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, MapPin, X, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useProperty, Plot, RentalHouse } from '@/context/PropertyContext';
import { toast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { plots, houses, addPlot, deletePlot, addHouse, deleteHouse, isAuthenticated, logout, loading, user } = useProperty();
  const [showPlotForm, setShowPlotForm] = useState(false);
  const [showHouseForm, setShowHouseForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'plot' | 'house'; id: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Plot form state
  const [plotForm, setPlotForm] = useState({
    title: '',
    price: '',
    location: '',
    size: '',
    sizeUnit: 'sq ft' as 'sq ft' | 'acres',
    dimensions: '',
    type: 'Residential' as Plot['type'],
    description: '',
    features: [] as string[]
  });
  const [plotImages, setPlotImages] = useState<string[]>([]);

  // House form state
  const [houseForm, setHouseForm] = useState({
    title: '',
    monthlyRent: '',
    deposit: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    sqft: '',
    furnishing: 'Unfurnished' as RentalHouse['furnishing'],
    availableFrom: '',
    description: '',
    amenities: [] as string[]
  });
  const [houseImages, setHouseImages] = useState<string[]>([]);

  const plotFeatures = ['Road Access', 'Electricity', 'Water Connection', 'Corner Plot', 'Fenced', 'Clear Title'];
  const houseAmenities = ['Parking', 'Garden', 'Balcony', 'Kitchen Appliances', 'WiFi Ready', 'Pool Access', 'Gym Access'];

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'plot' | 'house') => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'plot') {
          setPlotImages(prev => [...prev, reader.result as string]);
        } else {
          setHouseImages(prev => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number, type: 'plot' | 'house') => {
    if (type === 'plot') {
      setPlotImages(prev => prev.filter((_, i) => i !== index));
    } else {
      setHouseImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handlePlotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addPlot({
        title: plotForm.title,
        price: parseInt(plotForm.price),
        location: plotForm.location,
        size: parseInt(plotForm.size),
        sizeUnit: plotForm.sizeUnit,
        dimensions: plotForm.dimensions,
        type: plotForm.type,
        description: plotForm.description,
        images: plotImages.length > 0 ? plotImages : ['/placeholder.svg'],
        features: plotForm.features
      });
      toast({ title: "Success!", description: "Plot added successfully." });
      setShowPlotForm(false);
      setPlotForm({
        title: '', price: '', location: '', size: '', sizeUnit: 'sq ft',
        dimensions: '', type: 'Residential', description: '', features: []
      });
      setPlotImages([]);
    } catch (error) {
      toast({ title: "Error", description: "Failed to add plot. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHouseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addHouse({
        title: houseForm.title,
        monthlyRent: parseInt(houseForm.monthlyRent),
        deposit: parseInt(houseForm.deposit),
        location: houseForm.location,
        bedrooms: parseInt(houseForm.bedrooms),
        bathrooms: parseInt(houseForm.bathrooms),
        sqft: parseInt(houseForm.sqft),
        furnishing: houseForm.furnishing,
        availableFrom: houseForm.availableFrom,
        description: houseForm.description,
        images: houseImages.length > 0 ? houseImages : ['/placeholder.svg'],
        amenities: houseForm.amenities
      });
      toast({ title: "Success!", description: "Rental house added successfully." });
      setShowHouseForm(false);
      setHouseForm({
        title: '', monthlyRent: '', deposit: '', location: '', bedrooms: '',
        bathrooms: '', sqft: '', furnishing: 'Unfurnished', availableFrom: '', description: '', amenities: []
      });
      setHouseImages([]);
    } catch (error) {
      toast({ title: "Error", description: "Failed to add rental house. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    setIsSubmitting(true);
    
    try {
      if (deleteConfirm.type === 'plot') {
        await deletePlot(deleteConfirm.id);
        toast({ title: "Deleted", description: "Plot removed successfully." });
      } else {
        await deleteHouse(deleteConfirm.id);
        toast({ title: "Deleted", description: "Rental house removed successfully." });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete. Please try again.", variant: "destructive" });
    } finally {
      setDeleteConfirm(null);
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleFeature = (feature: string) => {
    setPlotForm(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setHouseForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-white/10 sticky top-0 z-50">
        <div className="container-custom flex items-center justify-between h-16">
          <div>
            <h1 className="text-xl font-heading font-bold gradient-text">Admin Dashboard</h1>
            {user && <p className="text-xs text-muted-foreground">{user.email}</p>}
          </div>
          <Button onClick={handleLogout} variant="ghost" className="text-muted-foreground hover:text-white">
            Logout
          </Button>
        </div>
      </header>

      <main className="container-custom py-8">
        <Tabs defaultValue="plots" className="space-y-8">
          <TabsList className="bg-card border border-white/10">
            <TabsTrigger value="plots" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Manage Plots ({plots.length})
            </TabsTrigger>
            <TabsTrigger value="houses" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Manage Rentals ({houses.length})
            </TabsTrigger>
          </TabsList>

          {/* Plots Tab */}
          <TabsContent value="plots" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-heading font-semibold">Plots</h2>
              <Button onClick={() => setShowPlotForm(true)} className="btn-gradient gap-2">
                <Plus className="w-4 h-4" /> Add New Plot
              </Button>
            </div>

            {plots.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No plots added yet. Click "Add New Plot" to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plots.map(plot => (
                  <div key={plot.id} className="bg-card border border-white/10 rounded-xl overflow-hidden">
                    <div className="aspect-video relative">
                      <img src={plot.images[0]} alt={plot.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 line-clamp-1">{plot.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3" /> {plot.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">₹{plot.price.toLocaleString()}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteConfirm({ type: 'plot', id: plot.id })}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Houses Tab */}
          <TabsContent value="houses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-heading font-semibold">Rental Houses</h2>
              <Button onClick={() => setShowHouseForm(true)} className="btn-gradient gap-2">
                <Plus className="w-4 h-4" /> Add New Rental
              </Button>
            </div>

            {houses.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No rental houses added yet. Click "Add New Rental" to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {houses.map(house => (
                  <div key={house.id} className="bg-card border border-white/10 rounded-xl overflow-hidden">
                    <div className="aspect-video relative">
                      <img src={house.images[0]} alt={house.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1 line-clamp-1">{house.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-3 h-3" /> {house.location}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">₹{house.monthlyRent.toLocaleString()}/mo</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteConfirm({ type: 'house', id: house.id })}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Plot Dialog */}
      <Dialog open={showPlotForm} onOpenChange={setShowPlotForm}>
        <DialogContent className="bg-card border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading">Add New Plot</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePlotSubmit} className="space-y-4">
            <Input placeholder="Plot Title" value={plotForm.title} onChange={e => setPlotForm({...plotForm, title: e.target.value})} className="input-dark" required />
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" placeholder="Price (₹)" value={plotForm.price} onChange={e => setPlotForm({...plotForm, price: e.target.value})} className="input-dark" required />
              <Input placeholder="Location" value={plotForm.location} onChange={e => setPlotForm({...plotForm, location: e.target.value})} className="input-dark" required />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input type="number" placeholder="Size" value={plotForm.size} onChange={e => setPlotForm({...plotForm, size: e.target.value})} className="input-dark" required />
              <Select value={plotForm.sizeUnit} onValueChange={(v: 'sq ft' | 'acres') => setPlotForm({...plotForm, sizeUnit: v})}>
                <SelectTrigger className="input-dark"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-card border-white/10">
                  <SelectItem value="sq ft">sq ft</SelectItem>
                  <SelectItem value="acres">acres</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Dimensions (e.g., 40x60 ft)" value={plotForm.dimensions} onChange={e => setPlotForm({...plotForm, dimensions: e.target.value})} className="input-dark" required />
            </div>
            <Select value={plotForm.type} onValueChange={(v: Plot['type']) => setPlotForm({...plotForm, type: v})}>
              <SelectTrigger className="input-dark"><SelectValue placeholder="Plot Type" /></SelectTrigger>
              <SelectContent className="bg-card border-white/10">
                <SelectItem value="Residential">Residential</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Agricultural">Agricultural</SelectItem>
                <SelectItem value="Industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Description" value={plotForm.description} onChange={e => setPlotForm({...plotForm, description: e.target.value})} className="input-dark min-h-[100px]" required />
            
            {/* Features */}
            <div>
              <label className="text-sm font-medium mb-2 block">Features</label>
              <div className="grid grid-cols-2 gap-2">
                {plotFeatures.map(feature => (
                  <label key={feature} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={plotForm.features.includes(feature)} onCheckedChange={() => toggleFeature(feature)} />
                    <span className="text-sm">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium mb-2 block">Images</label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                <input type="file" accept="image/*" multiple onChange={e => handleImageUpload(e, 'plot')} className="hidden" id="plot-images" />
                <label htmlFor="plot-images" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload images</span>
                </label>
              </div>
              {plotImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {plotImages.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20">
                      <img src={img} alt="" className="w-full h-full object-cover rounded" />
                      <button type="button" onClick={() => removeImage(idx, 'plot')} className="absolute -top-2 -right-2 w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild><Button type="button" variant="outline" className="border-white/20">Cancel</Button></DialogClose>
              <Button type="submit" className="btn-gradient" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Plot'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add House Dialog */}
      <Dialog open={showHouseForm} onOpenChange={setShowHouseForm}>
        <DialogContent className="bg-card border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-heading">Add New Rental House</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleHouseSubmit} className="space-y-4">
            <Input placeholder="House Title" value={houseForm.title} onChange={e => setHouseForm({...houseForm, title: e.target.value})} className="input-dark" required />
            <div className="grid grid-cols-2 gap-4">
              <Input type="number" placeholder="Monthly Rent (₹)" value={houseForm.monthlyRent} onChange={e => setHouseForm({...houseForm, monthlyRent: e.target.value})} className="input-dark" required />
              <Input type="number" placeholder="Security Deposit (₹)" value={houseForm.deposit} onChange={e => setHouseForm({...houseForm, deposit: e.target.value})} className="input-dark" required />
            </div>
            <Input placeholder="Location" value={houseForm.location} onChange={e => setHouseForm({...houseForm, location: e.target.value})} className="input-dark" required />
            <div className="grid grid-cols-3 gap-4">
              <Input type="number" placeholder="Bedrooms" value={houseForm.bedrooms} onChange={e => setHouseForm({...houseForm, bedrooms: e.target.value})} className="input-dark" required />
              <Input type="number" placeholder="Bathrooms" value={houseForm.bathrooms} onChange={e => setHouseForm({...houseForm, bathrooms: e.target.value})} className="input-dark" required />
              <Input type="number" placeholder="Sq Ft" value={houseForm.sqft} onChange={e => setHouseForm({...houseForm, sqft: e.target.value})} className="input-dark" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Select value={houseForm.furnishing} onValueChange={(v: RentalHouse['furnishing']) => setHouseForm({...houseForm, furnishing: v})}>
                <SelectTrigger className="input-dark"><SelectValue placeholder="Furnishing" /></SelectTrigger>
                <SelectContent className="bg-card border-white/10">
                  <SelectItem value="Unfurnished">Unfurnished</SelectItem>
                  <SelectItem value="Semi-Furnished">Semi-Furnished</SelectItem>
                  <SelectItem value="Fully Furnished">Fully Furnished</SelectItem>
                </SelectContent>
              </Select>
              <Input type="date" placeholder="Available From" value={houseForm.availableFrom} onChange={e => setHouseForm({...houseForm, availableFrom: e.target.value})} className="input-dark" />
            </div>
            <Textarea placeholder="Description" value={houseForm.description} onChange={e => setHouseForm({...houseForm, description: e.target.value})} className="input-dark min-h-[100px]" required />
            
            {/* Amenities */}
            <div>
              <label className="text-sm font-medium mb-2 block">Amenities</label>
              <div className="grid grid-cols-2 gap-2">
                {houseAmenities.map(amenity => (
                  <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox checked={houseForm.amenities.includes(amenity)} onCheckedChange={() => toggleAmenity(amenity)} />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium mb-2 block">Images</label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center">
                <input type="file" accept="image/*" multiple onChange={e => handleImageUpload(e, 'house')} className="hidden" id="house-images" />
                <label htmlFor="house-images" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload images</span>
                </label>
              </div>
              {houseImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {houseImages.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20">
                      <img src={img} alt="" className="w-full h-full object-cover rounded" />
                      <button type="button" onClick={() => removeImage(idx, 'house')} className="absolute -top-2 -right-2 w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild><Button type="button" variant="outline" className="border-white/20">Cancel</Button></DialogClose>
              <Button type="submit" className="btn-gradient" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Rental'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="bg-card border-white/10">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">Are you sure you want to delete this {deleteConfirm?.type}? This action cannot be undone.</p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)} className="border-white/20">Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
