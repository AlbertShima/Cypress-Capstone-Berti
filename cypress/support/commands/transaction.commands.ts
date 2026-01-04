import { apiUrl, retryRequest } from '../utils'
import type { CreateTransactionInput } from '../../types/transactions'

/**
 * Create a transaction via API with retry
 */
Cypress.Commands.add(
  'createTransaction',
  (input: CreateTransactionInput) => {
    const payload = {
      transactionType: input.type ?? 'payment',
      amount: input.amount,
      description: input.note ?? input.description,
      senderId: input.senderId,
      receiverId: input.receiverId,
    }

    return retryRequest({
      method: 'POST',
      url: apiUrl('/transactions'),
      body: payload,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201])

      const transaction = response.body.transaction
      expect(transaction).to.have.property('id')
      expect(transaction).to.have.property('receiverId', payload.receiverId)
      return transaction
    })
  }
)