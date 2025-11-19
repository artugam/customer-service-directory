"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Lightbulb, Building2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", company: "", subject: "", message: "" });
      setSubmitted(false);
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="secondary" className="mb-4">Contact Us</Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Let's Talk About Your Needs
            </h1>
            <p className="text-xl text-muted-foreground">
              Questions about platforms? Need help choosing? Want to submit a platform?
              We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Contact Options */}
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            <Card className="border-2">
              <CardHeader>
                <Mail className="h-8 w-8 text-primary mb-2" />
                <CardTitle>General Inquiries</CardTitle>
                <CardDescription>
                  Questions about the directory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Use the form below to send us your questions
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Building2 className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Platform Vendors</CardTitle>
                <CardDescription>
                  Submit or update your platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Contact us to add or update platform information
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Lightbulb className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Feedback & Ideas</CardTitle>
                <CardDescription>
                  Help us improve
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Share suggestions to make our directory better
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll respond within 24-48 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                      <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">Message Sent!</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Thank you for reaching out. We've received your message and will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Company (Optional)
                    </label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Your Company Name"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What can we help you with?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" size="lg" className="flex-1 md:flex-none">
                      Send Message
                    </Button>
                    <p className="text-sm text-muted-foreground flex items-center">
                      We typically respond within 24-48 hours
                    </p>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Quick Help */}
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Looking for something specific?</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="font-medium mb-2">Need help choosing a platform?</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Try our Platform Finder Wizard - get personalized recommendations in 2 minutes
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/find-platform">Start Platform Finder →</a>
                </Button>
              </div>
              <div>
                <p className="font-medium mb-2">Want to compare platforms?</p>
                <p className="text-sm text-muted-foreground mb-2">
                  Use our comparison tool to see side-by-side features and pricing
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/compare">Compare Platforms →</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
