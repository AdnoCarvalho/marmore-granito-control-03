
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Clock, Plus, Search, Users } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockClients } from "@/components/sales/list/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

// Mock beauty service types
const serviceTypes = [
  { id: "1", name: "Design de Sobrancelhas", duration: 30, price: 50 },
  { id: "2", name: "Extensão de Cílios", duration: 60, price: 150 },
  { id: "3", name: "Manicure", duration: 45, price: 40 },
  { id: "4", name: "Pedicure", duration: 45, price: 45 },
];

// Mock appointments data
const mockAppointments = [
  { 
    id: "1",
    clientId: "1", 
    serviceId: "1",
    date: new Date(2025, 4, 20, 10, 0),
    status: "confirmed"
  },
  { 
    id: "2",
    clientId: "2", 
    serviceId: "2",
    date: new Date(2025, 4, 20, 13, 0),
    status: "confirmed"
  },
  { 
    id: "3",
    clientId: "3", 
    serviceId: "3",
    date: new Date(2025, 4, 21, 15, 30),
    status: "pending"
  },
];

// Calendar view
const CalendarView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  // Filter appointments for the selected date
  const appointmentsForDate = mockAppointments.filter(
    appointment => date && 
    appointment.date.getDate() === date.getDate() &&
    appointment.date.getMonth() === date.getMonth() &&
    appointment.date.getFullYear() === date.getFullYear()
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-card border-slate-700 md:col-span-1">
        <CardHeader>
          <CardTitle>Calendário</CardTitle>
          <CardDescription>Selecione um dia para ver ou agendar</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center pb-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="bg-card text-card-foreground rounded-md p-3"
          />
        </CardContent>
      </Card>

      <Card className="bg-card border-slate-700 md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Agendamentos</CardTitle>
            <CardDescription>
              {date ? format(date, "PPPP", { locale: ptBR }) : "Selecione uma data"}
            </CardDescription>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </CardHeader>
        <CardContent>
          {appointmentsForDate.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Sem agendamentos</h3>
              <p className="text-muted-foreground text-sm">
                Não há agendamentos para esta data. Clique em "Novo Agendamento" para adicionar.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Horário</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointmentsForDate.map(appointment => {
                  const client = mockClients.find(c => c.id === appointment.clientId);
                  const service = serviceTypes.find(s => s.id === appointment.serviceId);
                  
                  return (
                    <TableRow key={appointment.id} className="cursor-pointer hover:bg-slate-800">
                      <TableCell className="font-medium">
                        {format(appointment.date, "HH:mm")}
                      </TableCell>
                      <TableCell>{client?.name || "Cliente não encontrado"}</TableCell>
                      <TableCell>{service?.name || "Serviço não encontrado"}</TableCell>
                      <TableCell>
                        <div className={cn(
                          "status-badge inline-flex",
                          appointment.status === "confirmed" ? "status-paid" : "status-pending"
                        )}>
                          {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// New Appointment Form
const NewAppointment = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [client, setClient] = useState("");
  const [service, setService] = useState("");
  const [time, setTime] = useState("");

  // Generate time slots from 8:00 to 20:00 in 30min intervals
  const timeSlots = [];
  for (let hour = 8; hour < 20; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    timeSlots.push(`${hour.toString().padStart(2, '0')}:30`);
  }

  return (
    <Card className="bg-card border-slate-700">
      <CardHeader>
        <CardTitle>Novo Agendamento</CardTitle>
        <CardDescription>Agende um novo serviço para um cliente</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Cliente</label>
                <Select onValueChange={setClient} value={client}>
                  <SelectTrigger className="bg-card border-slate-600">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-slate-600">
                    {mockClients.map(client => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Serviço</label>
                <Select onValueChange={setService} value={service}>
                  <SelectTrigger className="bg-card border-slate-600">
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-slate-600">
                    {serviceTypes.map(service => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} - R$ {service.price.toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Data</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-card border-slate-600"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione a data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-card border-slate-600">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Horário</label>
                <Select onValueChange={setTime} value={time}>
                  <SelectTrigger className="bg-card border-slate-600">
                    <SelectValue placeholder="Selecione um horário" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-slate-600">
                    {timeSlots.map(slot => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button type="submit">
              Agendar Serviço
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// List of all appointments
const AppointmentsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter appointments based on search
  const filteredAppointments = mockAppointments.filter(appointment => {
    const client = mockClients.find(c => c.id === appointment.clientId);
    return client?.name.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery;
  });

  return (
    <Card className="bg-card border-slate-700">
      <CardHeader>
        <CardTitle>Lista de Agendamentos</CardTitle>
        <CardDescription>Todos os agendamentos marcados</CardDescription>
        
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por cliente..."
              className="pl-8 bg-card border-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px] bg-card border-slate-600">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-slate-600">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="confirmed">Confirmados</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map(appointment => {
                const client = mockClients.find(c => c.id === appointment.clientId);
                const service = serviceTypes.find(s => s.id === appointment.serviceId);
                
                return (
                  <TableRow key={appointment.id} className="cursor-pointer hover:bg-slate-800">
                    <TableCell>{format(appointment.date, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{format(appointment.date, "HH:mm")}</TableCell>
                    <TableCell>{client?.name || "Cliente não encontrado"}</TableCell>
                    <TableCell>{service?.name || "Serviço não encontrado"}</TableCell>
                    <TableCell>
                      <div className={cn(
                        "status-badge inline-flex",
                        appointment.status === "confirmed" ? "status-paid" : "status-pending"
                      )}>
                        {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Nenhum agendamento encontrado com os filtros aplicados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Main Appointments Page
const Appointments = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2 text-slate-100 font-heading">
              Agenda de Serviços
            </h1>
            <p className="text-slate-400">
              Gerencie todos os agendamentos e serviços do Studio de Beleza Adriele Silva.
            </p>
          </div>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="overflow-hidden bg-card border-slate-700">
            <div className="h-2 bg-primary" />
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Agendamentos Hoje</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-100">
                  {mockAppointments.filter(a => 
                    a.date.getDate() === new Date().getDate() && 
                    a.date.getMonth() === new Date().getMonth() && 
                    a.date.getFullYear() === new Date().getFullYear()
                  ).length}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden bg-card border-slate-700">
            <div className="h-2 bg-blue-500" />
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Clientes Agendados</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-100">
                  {new Set(mockAppointments.map(a => a.clientId)).size}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden bg-card border-slate-700">
            <div className="h-2 bg-emerald-500" />
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Próximo Horário</p>
                <h3 className="text-xl font-bold mt-1 text-slate-100">
                  {format(
                    mockAppointments
                      .filter(a => a.date > new Date())
                      .sort((a, b) => a.date.getTime() - b.date.getTime())[0]?.date || new Date(),
                    "HH:mm"
                  )}
                </h3>
              </div>
              <div className="h-12 w-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="calendario" className="space-y-4">
          <TabsList className="bg-slate-800 text-slate-400">
            <TabsTrigger value="calendario" className="data-[state=active]:bg-card data-[state=active]:text-primary">
              Calendário
            </TabsTrigger>
            <TabsTrigger value="novo" className="data-[state=active]:bg-card data-[state=active]:text-primary">
              Novo Agendamento
            </TabsTrigger>
            <TabsTrigger value="lista" className="data-[state=active]:bg-card data-[state=active]:text-primary">
              Lista de Agendamentos
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendario" className="animate-fade-in">
            <CalendarView />
          </TabsContent>
          
          <TabsContent value="novo" className="animate-fade-in">
            <NewAppointment />
          </TabsContent>
          
          <TabsContent value="lista" className="animate-fade-in">
            <AppointmentsList />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
