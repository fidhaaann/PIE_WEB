'use client'

export default function LiquidGlassBackground() {
  return (
    <div className="lgb" aria-hidden="true">
      <div className="lgb__base" />

      <div className="lgb__aurora-field">
        <div className="lgb__aurora lgb__aurora--one" />
        <div className="lgb__aurora lgb__aurora--two" />
        <div className="lgb__aurora lgb__aurora--three" />
      </div>

      <div className="lgb__veil" />
      <div className="lgb__noise" />
    </div>
  )
}
