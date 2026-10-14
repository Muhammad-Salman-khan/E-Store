import { describe, it, expect } from 'vitest'
import { ShippingSchema, PaymentSchema } from './validation'

describe('ShippingSchema', () => {
  it('valid input passes', () => {
    const valid = {
      fullName: 'Ali Khan',
      email: 'ali@example.com',
      phone: '03001234567',
      address: '123 Main St',
      city: 'Karachi',
      postalCode: '75600',
      country: 'PK'
    }
    expect(ShippingSchema.safeParse(valid).success).toBe(true)
  })
  it('rejects short full name', () => {
    const data = { fullName: 'A', email: 'a@b.com', phone: '1234567', address: 'addr', city: 'c', postalCode: '123', country: 'PK' }
    const res = ShippingSchema.safeParse(data)
    expect(res.success).toBe(false)
    expect(res.error?.issues[0].message).toBe('Full name required')
  })
  it('rejects invalid email', () => {
    const data = { fullName: 'Ali', email: 'not-email', phone: '1234567', address: 'addr', city: 'c', postalCode: '123', country: 'PK' }
    expect(ShippingSchema.safeParse(data).success).toBe(false)
  })
})

describe('PaymentSchema', () => {
  it('valid input passes', () => {
    const valid = { cardNumber: '1234567812345678', expiry: '12/25', cvc: '123', nameOnCard: 'Ali Khan' }
    expect(PaymentSchema.safeParse(valid).success).toBe(true)
  })
  it('rejects short card number', () => {
    const data = { cardNumber: '1234', expiry: '12/25', cvc: '123', nameOnCard: 'Ali' }
    const res = PaymentSchema.safeParse(data)
    expect(res.success).toBe(false)
    expect(res.error?.issues[0].message).toBe('16 digits required')
  })
  it('rejects bad expiry', () => {
    const data = { cardNumber: '1234567812345678', expiry: '13/25', cvc: '123', nameOnCard: 'Ali' }
    expect(PaymentSchema.safeParse(data).success).toBe(false)
  })
  it('rejects short cvc', () => {
    const data = { cardNumber: '1234567812345678', expiry: '01/25', cvc: '12', nameOnCard: 'Ali' }
    expect(PaymentSchema.safeParse(data).success).toBe(false)
  })
})
