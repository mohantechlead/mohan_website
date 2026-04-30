<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const status = ref({ type: '', message: '' })

const submitForm = async () => {
  status.value = { type: '', message: '' }
  isSubmitting.value = true

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    const payload = await response.json()

    if (!response.ok) {
      throw new Error(payload.error || 'Failed to send email.')
    }

    status.value = { type: 'success', message: 'Message sent successfully. We will contact you soon.' }
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (error) {
    status.value = { type: 'error', message: error.message || 'Could not send your message.' }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="py-16 md:py-20">
    <div class="container-section">
      <div class="mx-auto max-w-2xl text-center">
        <p class="section-eyebrow">Get In Touch</p>
        <h1 class="section-title mt-3">Contact Us</h1>
        <p class="body-copy mt-4">
          Send us a message or visit our head office around Bole Japan Embassy, Addis Ababa.
        </p>
      </div>

      <div class="mt-12 grid gap-8 lg:grid-cols-2">
        <article class="surface-card">
          <form class="space-y-5" @submit.prevent="submitForm">
            <div>
              <label for="name" class="mb-2 block text-sm font-semibold text-slate-700">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                class="form-control"
                v-model="form.name"
                required
              >
            </div>

            <div>
              <label for="email" class="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                class="form-control"
                v-model="form.email"
                required
              >
            </div>

            <div>
              <label for="subject" class="mb-2 block text-sm font-semibold text-slate-700">Subject</label>
              <input
                id="subject"
                type="text"
                placeholder="How can we help?"
                class="form-control"
                v-model="form.subject"
                required
              >
            </div>

            <div>
              <label for="message" class="mb-2 block text-sm font-semibold text-slate-700">Message</label>
              <textarea
                id="message"
                rows="5"
                placeholder="Write your message..."
                class="form-control"
                v-model="form.message"
                required
              ></textarea>
            </div>

            <button type="submit" class="btn-primary" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sending...' : 'Submit' }}
            </button>

            <p
              v-if="status.message"
              class="text-sm font-medium"
              :class="status.type === 'success' ? 'text-emerald-600' : 'text-rose-600'"
            >
              {{ status.message }}
            </p>
          </form>
        </article>

        <article class="surface-card">
          <div class="overflow-hidden rounded-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.842678994352!2d38.778480975950714!3d8.986620291073027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b84f833c5f24f%3A0xf4bc60b8a246e454!2zTW9oYW4gUGxjIHwgQm9sZSBNaWNoYWVsIHwg4Yie4YiD4YqVIOGNkuGKpOGIjeGIsiB8IOGJpuGIjCDhiJrhiqvhiqThiI0!5e0!3m2!1sen!2set!4v1727492554868!5m2!1sen!2set"
              width="100%"
              height="450"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>