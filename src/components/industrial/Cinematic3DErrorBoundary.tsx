'use client'
import React, { Component, ReactNode } from 'react'

// Error boundary for the 3D cinematic canvas.
// If WebGL fails / context lost / any runtime error in the 3D subtree,
// we gracefully fall back to the 2D static cinematic — never a raw error screen.
export default class Cinematic3DErrorBoundary extends Component<{
  fallback: ReactNode
  children: ReactNode
}, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(err: unknown) {
    console.warn('[IndustryScope] Cinematic 3D fallback engaged:', err)
  }
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}
