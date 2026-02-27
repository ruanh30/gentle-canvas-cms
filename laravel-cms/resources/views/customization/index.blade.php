@extends('layout.app')
@section('title', 'Personalização')
@section('content')
<form action="{{ route('admin.customization.update') }}" method="POST" id="themeForm">
@csrf
<input type="hidden" name="active_section" id="activeSectionInput" value="colors">

{{-- ============ TOP BAR (identical to React) ============ --}}
<div class="flex items-center justify-between px-4 py-2 bg-white border-b -mx-6 -mt-6 mb-0">
    <div class="flex items-center gap-2">
        <h1 class="text-sm font-bold text-gray-900">Editor de Tema</h1>
    </div>
    <div class="flex items-center gap-1.5">
        <button type="submit" class="inline-flex items-center gap-1 bg-gray-900 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-gray-800">
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/></svg>
            Salvar
        </button>
    </div>
</div>

{{-- ============ 3-COLUMN LAYOUT ============ --}}
<div class="flex -mx-6" style="height: calc(100vh - 140px);">

    {{-- COL 1: Sections list (w-56 = 224px) --}}
    <div class="w-56 border-r bg-white flex flex-col shrink-0">
        <div class="p-2 border-b">
            <div class="relative">
                <svg class="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input type="text" id="sectionSearch" placeholder="Buscar..." class="w-full pl-7 h-8 text-xs border border-gray-200 rounded-md focus:ring-1 focus:ring-gray-400" oninput="filterSections(this.value)">
            </div>
        </div>
        <div class="flex-1 overflow-y-auto p-1" id="sectionsList">
            {{-- Sistema --}}
            <p class="text-[10px] uppercase tracking-wider text-gray-400 font-semibold px-2 py-1.5">Sistema</p>
            <button type="button" onclick="showPanel('colors')" data-section="colors" class="section-btn active w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="15.5" r="2.5"/><circle cx="8.5" cy="8.5" r="2.5"/><circle cx="6.5" cy="15.5" r="2.5"/></svg>
                <span class="truncate">Cores</span>
            </button>
            <button type="button" onclick="showPanel('typography')" data-section="typography" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>
                <span class="truncate">Tipografia</span>
            </button>
            <button type="button" onclick="showPanel('global')" data-section="global" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                <span class="truncate">Layout Global</span>
            </button>
            <button type="button" onclick="showPanel('buttons')" data-section="buttons" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51z"/></svg>
                <span class="truncate">Botões</span>
            </button>
            <button type="button" onclick="showPanel('inputs')" data-section="inputs" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10v4"/></svg>
                <span class="truncate">Formulários</span>
            </button>

            {{-- Componentes --}}
            <p class="text-[10px] uppercase tracking-wider text-gray-400 font-semibold px-2 py-1.5 mt-1">Componentes</p>
            <button type="button" onclick="showPanel('logo')" data-section="logo" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
                <span class="truncate">Logo</span>
            </button>
            <button type="button" onclick="showPanel('header')" data-section="header" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
                <span class="truncate">Cabeçalho</span>
            </button>
            <button type="button" onclick="showPanel('hero')" data-section="hero" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                <span class="truncate">Hero / Banner</span>
            </button>
            <button type="button" onclick="showPanel('home-sections')" data-section="home-sections" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                <span class="truncate">Seções da Home</span>
            </button>
            <button type="button" onclick="showPanel('product-card')" data-section="product-card" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
                <span class="truncate">Card de Produto</span>
            </button>
            <button type="button" onclick="showPanel('product-page')" data-section="product-page" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                <span class="truncate">Página de Produto</span>
            </button>
            <button type="button" onclick="showPanel('category')" data-section="category" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                <span class="truncate">Categoria / Busca</span>
            </button>
            <button type="button" onclick="showPanel('cart')" data-section="cart" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                <span class="truncate">Carrinho</span>
            </button>
            <button type="button" onclick="showPanel('checkout')" data-section="checkout" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>
                <span class="truncate">Checkout</span>
            </button>
            <button type="button" onclick="showPanel('footer')" data-section="footer" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15h18"/></svg>
                <span class="truncate">Rodapé</span>
            </button>

            {{-- Extras --}}
            <p class="text-[10px] uppercase tracking-wider text-gray-400 font-semibold px-2 py-1.5 mt-1">Extras</p>
            <button type="button" onclick="showPanel('whatsapp')" data-section="whatsapp" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>
                <span class="truncate">WhatsApp</span>
            </button>
            <button type="button" onclick="showPanel('seo')" data-section="seo" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                <span class="truncate">SEO</span>
            </button>
            <button type="button" onclick="showPanel('custom-code')" data-section="custom-code" class="section-btn w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-xs">
                <svg class="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                <span class="truncate">Código Custom</span>
            </button>
        </div>
    </div>

    {{-- COL 2: Properties panel (w-80 = 320px) --}}
    <div class="w-80 border-r bg-white flex flex-col shrink-0">
        <div class="px-3 py-2 border-b flex items-center gap-2">
            <h2 class="text-sm font-semibold text-gray-900" id="panelTitle">Cores</h2>
        </div>
        <div class="flex-1 overflow-y-auto p-3 space-y-4" id="panelContent">
            @include('customization.panels.colors', ['t' => $theme])
        </div>
    </div>

    {{-- COL 3: Preview area --}}
    <div class="flex-1 bg-gray-50 flex flex-col min-w-0">
        <div class="flex items-center justify-center gap-2 py-2 border-b bg-white/50">
            <button type="button" onclick="setDevice('100%', this)" class="device-btn active p-1.5 rounded-md transition-colors">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
            </button>
            <button type="button" onclick="setDevice('768px', this)" class="device-btn p-1.5 rounded-md transition-colors">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M12 18h.01"/></svg>
            </button>
            <button type="button" onclick="setDevice('390px', this)" class="device-btn p-1.5 rounded-md transition-colors">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg>
            </button>
        </div>
        <div class="flex-1 flex items-start justify-center p-4 overflow-auto">
            <div id="previewFrame" class="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300" style="width:100%; max-width:100%; height:calc(100vh - 200px);">
                <iframe id="storePreviewIframe" src="{{ route('store.home', ['theme-preview' => '1']) }}" class="w-full h-full border-0" title="Preview da Loja"></iframe>
            </div>
        </div>
    </div>
</div>
</form>

{{-- ============ ALL PANELS (hidden, shown via JS) ============ --}}
<template id="panel-colors">@include('customization.panels.colors', ['t' => $theme])</template>
<template id="panel-typography">@include('customization.panels.typography', ['t' => $theme])</template>
<template id="panel-global">@include('customization.panels.global', ['t' => $theme])</template>
<template id="panel-buttons">@include('customization.panels.buttons', ['t' => $theme])</template>
<template id="panel-inputs">@include('customization.panels.inputs', ['t' => $theme])</template>
<template id="panel-logo">@include('customization.panels.logo', ['t' => $theme])</template>
<template id="panel-header">@include('customization.panels.header', ['t' => $theme])</template>
<template id="panel-hero">@include('customization.panels.hero', ['t' => $theme])</template>
<template id="panel-home-sections">@include('customization.panels.home-sections', ['t' => $theme])</template>
<template id="panel-product-card">@include('customization.panels.product-card', ['t' => $theme])</template>
<template id="panel-product-page">@include('customization.panels.product-page', ['t' => $theme])</template>
<template id="panel-category">@include('customization.panels.category', ['t' => $theme])</template>
<template id="panel-cart">@include('customization.panels.cart', ['t' => $theme])</template>
<template id="panel-checkout">@include('customization.panels.checkout', ['t' => $theme])</template>
<template id="panel-footer">@include('customization.panels.footer', ['t' => $theme])</template>
<template id="panel-whatsapp">@include('customization.panels.whatsapp', ['t' => $theme])</template>
<template id="panel-seo">@include('customization.panels.seo', ['t' => $theme])</template>
<template id="panel-custom-code">@include('customization.panels.custom-code', ['t' => $theme])</template>

<style>
.section-btn { color: #9ca3af; transition: all 0.15s; }
.section-btn:hover { background: #f1f5f9; color: #0f172a; }
.section-btn.active { background: #0f172a; color: #fff; font-weight: 500; }
.device-btn { color: #9ca3af; }
.device-btn:hover { background: #f1f5f9; }
.device-btn.active { background: #0f172a; color: #fff; }
.panel-section-title { font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em; color: #9ca3af; font-weight: 500; display: flex; align-items: center; gap: 8px; padding-top: 8px; }
.panel-section-title::before, .panel-section-title::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }
.ctrl-label { font-size: 12px; color: #9ca3af; display: block; margin-bottom: 4px; }
.ctrl-input { width: 100%; height: 36px; padding: 0 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 13px; }
.ctrl-input:focus { outline: none; border-color: #94a3b8; box-shadow: 0 0 0 2px rgba(148,163,184,0.2); }
.ctrl-select { width: 100%; height: 36px; padding: 0 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 13px; background: white; }
.ctrl-textarea { width: 100%; min-height: 100px; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 12px; font-family: monospace; resize: vertical; }
.toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
.toggle-row label { font-size: 14px; font-weight: 500; color: #0f172a; }
.toggle-row .hint { font-size: 11px; color: #9ca3af; }
.option-picker { display: flex; flex-wrap: wrap; gap: 6px; }
.option-btn { flex: 1; min-width: 60px; padding: 8px; border: 2px solid #e2e8f0; border-radius: 8px; font-size: 11px; font-weight: 500; text-align: center; cursor: pointer; transition: all 0.15s; background: white; }
.option-btn:hover { border-color: rgba(15,23,42,0.3); }
.option-btn.active { border-color: #0f172a; background: #f1f5f9; }
.option-btn .desc { font-size: 9px; color: #9ca3af; display: block; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.color-input-wrap { display: flex; align-items: center; gap: 8px; }
.color-swatch { width: 32px; height: 32px; border-radius: 6px; border: 1px solid #e2e8f0; cursor: pointer; padding: 0; }
.color-hex { width: 96px; height: 32px; font-family: monospace; font-size: 12px; text-transform: uppercase; padding: 0 8px; border: 1px solid #e2e8f0; border-radius: 6px; }
.slider-wrap { display: flex; align-items: center; gap: 8px; }
.slider-wrap input[type=range] { flex: 1; height: 4px; }
.slider-val { font-size: 12px; font-family: monospace; color: #9ca3af; min-width: 40px; text-align: right; }
</style>

<script>
const panelLabels = {
    'colors': 'Cores', 'typography': 'Tipografia', 'global': 'Layout Global', 'buttons': 'Botões',
    'inputs': 'Formulários', 'logo': 'Logo', 'header': 'Cabeçalho', 'hero': 'Hero / Banner',
    'home-sections': 'Seções da Home', 'product-card': 'Card de Produto', 'product-page': 'Página de Produto',
    'category': 'Categoria / Busca', 'cart': 'Carrinho', 'checkout': 'Checkout', 'footer': 'Rodapé',
    'whatsapp': 'WhatsApp', 'seo': 'SEO', 'custom-code': 'Código Custom',
};

const formEl = document.getElementById('themeForm');
const panelContentEl = document.getElementById('panelContent');
const activeSectionInputEl = document.getElementById('activeSectionInput');
const previewIframeEl = document.getElementById('storePreviewIframe');
let autoSaveTimer = null;

function showPanel(id) {
    document.querySelectorAll('.section-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-section="${id}"]`)?.classList.add('active');
    document.getElementById('panelTitle').textContent = panelLabels[id] || id;
    activeSectionInputEl.value = id;

    const tpl = document.getElementById('panel-' + id);
    if (tpl) {
        panelContentEl.innerHTML = tpl.innerHTML;
    }
}

function setDevice(w, btn) {
    document.getElementById('previewFrame').style.width = w;
    document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
    btn?.classList.add('active');
}

function filterSections(q) {
    q = q.toLowerCase();
    document.querySelectorAll('.section-btn').forEach(btn => {
        const text = btn.textContent.toLowerCase();
        btn.style.display = text.includes(q) ? '' : 'none';
    });
}

function selectOption(groupName, value) {
    const input = document.querySelector(`input[name="${groupName}"]`);
    if (input) input.value = value;
    document.querySelectorAll(`[data-option-group="${groupName}"] .option-btn`).forEach(btn => {
        btn.classList.toggle('active', btn.dataset.value === value);
    });
    queueAutoSave();
}

function buildFormData() {
    const formData = new FormData(formEl);
    panelContentEl.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (!cb.checked && cb.name) {
            formData.append(cb.name, '0');
        }
    });
    return formData;
}

/**
 * Build a nested theme object from the current form state.
 * This mirrors flatToNested() in PHP but runs client-side for instant preview.
 */
function bv(val) { return val === '1' || val === 'on' || val === 'true' || val === true; }

function buildNestedThemeFromForm() {
    const fd = buildFormData();
    const flat = {};
    for (const [key, value] of fd.entries()) {
        if (key === '_token' || key === 'action' || key === 'active_section') continue;
        flat[key] = value;
    }

    const annMsgs = [flat.ann_msg1, flat.ann_msg2, flat.ann_msg3].filter(m => m && m.trim());
    const bbImages = [flat.bannerBelow_imageUrl, flat.bannerBelow_img2, flat.bannerBelow_img3].filter(m => m && m.trim());

    const theme = {
        colors: {
            primary: flat.colors_primary || '#1a1a1a',
            primaryForeground: flat.colors_primaryForeground || '#fafafa',
            secondary: flat.colors_secondary || '#f5f5f5',
            secondaryForeground: flat.colors_secondaryForeground || '#1a1a1a',
            accent: flat.colors_accent || '#f5f5f5',
            accentForeground: flat.colors_accentForeground || '#1a1a1a',
            background: flat.colors_background || '#ffffff',
            foreground: flat.colors_foreground || '#1a1a1a',
            muted: flat.colors_muted || '#f5f5f5',
            mutedForeground: flat.colors_mutedForeground || '#737373',
            border: flat.colors_border || '#e5e5e5',
            success: flat.colors_success || '#16a34a',
            warning: flat.colors_warning || '#eab308',
            error: flat.colors_error || '#dc2626',
            buyNow: flat.colors_buyNow || '#dc2626',
            buyNowHover: flat.colors_buyNowHover || '#b91c1c',
        },
        typography: {
            headingFont: flat.typo_headingFont || 'Playfair Display',
            bodyFont: flat.typo_bodyFont || 'Inter',
            baseFontSize: parseInt(flat.typo_baseFontSize) || 16,
            headingWeight: parseInt(flat.typo_headingWeight) || 700,
            bodyWeight: parseInt(flat.typo_bodyWeight) || 400,
            lineHeight: parseFloat(flat.typo_lineHeight) || 1.6,
            letterSpacing: parseFloat(flat.typo_letterSpacing) || 0,
        },
        global: {
            containerWidth: flat.global_containerWidth || 'default',
            containerMaxPx: parseInt(flat.global_containerMaxPx) || 1400,
            sectionSpacing: flat.global_sectionSpacing || 'normal',
            borderRadius: flat.global_borderRadius || 'medium',
            shadowLevel: flat.global_shadowLevel || 'subtle',
            borderStyle: flat.global_borderStyle || 'thin',
            animationsEnabled: bv(flat.global_animationsEnabled),
            animationSpeed: flat.global_animationSpeed || 'normal',
            scrollBehavior: flat.global_scrollBehavior || 'smooth',
        },
        buttons: {
            style: flat.btn_style || 'filled',
            radius: flat.btn_radius || 'medium',
            size: flat.btn_size || 'medium',
            fontWeight: parseInt(flat.btn_fontWeight) || 500,
            uppercase: bv(flat.btn_uppercase),
            shadow: bv(flat.btn_shadow),
        },
        inputs: {
            style: flat.input_style || 'default',
            radius: flat.input_radius || 'medium',
            focusRing: bv(flat.input_focusRing),
            borderWidth: parseInt(flat.input_borderWidth) || 1,
        },
        logo: {
            text: flat.logo_text || 'MODA STORE',
            imageUrl: flat.logo_imageUrl || '',
            showText: bv(flat.logo_showText),
            maxHeight: parseInt(flat.logo_maxHeight) || 40,
            position: flat.logo_position || 'left',
        },
        header: {
            layout: flat.header_layout || 'classic',
            sticky: bv(flat.header_sticky),
            shrinkOnScroll: bv(flat.header_shrinkOnScroll),
            shadowOnScroll: bv(flat.header_shadowOnScroll),
            borderBottom: bv(flat.header_borderBottom),
            height: parseInt(flat.header_height) || 64,
            menuStyle: flat.header_menuStyle || 'horizontal',
            menuFontSize: parseInt(flat.header_menuFontSize) || 13,
            menuUppercase: bv(flat.header_menuUppercase),
            menuLetterSpacing: parseFloat(flat.header_menuLetterSpacing) || 0.1,
            iconSize: parseInt(flat.header_iconSize) || 20,
            showSearch: bv(flat.header_showSearch),
            searchStyle: flat.header_searchStyle || 'modal',
            showAccount: bv(flat.header_showAccount),
            showWishlist: bv(flat.header_showWishlist),
            showCart: bv(flat.header_showCart),
            cartBadgeStyle: flat.header_cartBadgeStyle || 'count',
            announcement: {
                enabled: bv(flat.ann_enabled),
                messages: annMsgs,
                speed: parseInt(flat.ann_speed) || 5,
                backgroundColor: flat.ann_backgroundColor || '#1a1a1a',
                textColor: flat.ann_textColor || '#fafafa',
                showIcon: bv(flat.ann_showIcon),
                icon: flat.ann_icon || 'truck',
                link: flat.ann_link || '',
                pauseOnHover: bv(flat.ann_pauseOnHover),
                style: flat.ann_style || 'static',
                direction: flat.ann_direction || 'rtl',
            },
            bannerBelow: {
                enabled: bv(flat.bannerBelow_enabled),
                imageUrl: flat.bannerBelow_imageUrl || '',
                images: bbImages,
                link: flat.bannerBelow_link || '',
                height: parseInt(flat.bannerBelow_height) || 60,
                fullWidth: bv(flat.bannerBelow_fullWidth),
                carousel: bv(flat.bannerBelow_carousel),
                carouselSpeed: parseInt(flat.bannerBelow_carouselSpeed) || 5,
            },
        },
        hero: {
            enabled: bv(flat.hero_enabled),
            height: flat.hero_height || 'large',
            autoplay: bv(flat.hero_autoplay),
            autoplaySpeed: parseInt(flat.hero_autoplaySpeed) || 5,
            showDots: bv(flat.hero_showDots),
            showArrows: bv(flat.hero_showArrows),
            transition: flat.hero_transition || 'fade',
            slides: [{
                id: 'hero-slide-1',
                title: flat.hero_title || '',
                subtitle: flat.hero_subtitle || '',
                description: flat.hero_description || '',
                ctaText: flat.hero_ctaText || 'Ver coleção',
                ctaLink: flat.hero_ctaLink || '/products',
                ctaStyle: 'filled',
                backgroundImage: flat.hero_backgroundImage || '',
                backgroundVideo: '',
                overlayColor: flat.hero_overlayColor || '#000000',
                overlayOpacity: parseFloat(flat.hero_overlayOpacity) || 0,
                contentAlign: flat.hero_contentAlign || 'left',
                textColor: '#ffffff',
            }],
        },
        productCard: {
            layout: flat.card_layout || 'standard',
            imageAspect: flat.card_imageAspect || '3:4',
            imageHover: flat.card_imageHover || 'zoom',
            imageBorderRadius: flat.card_imageBorderRadius || 'medium',
            showCategory: bv(flat.card_showCategory),
            showBrand: bv(flat.card_showBrand),
            showRating: bv(flat.card_showRating),
            showQuickView: bv(flat.card_showQuickView),
            quickViewStyle: flat.card_quickViewStyle || 'modal',
            showWishlist: bv(flat.card_showWishlist),
            showAddToCart: bv(flat.card_showAddToCart),
            showBuyNow: bv(flat.card_showBuyNow),
            buyNowText: flat.card_buyNowText || 'Comprar Agora',
            addToCartText: flat.card_addToCartText || 'Adicionar ao Carrinho',
            buttonVisibility: flat.card_buttonVisibility || 'both',
            buttonLayout: flat.card_buttonLayout || 'stacked',
            buttonStyle: flat.card_buttonStyle || 'solid',
            addToCartStyle: flat.card_addToCartStyle || 'full-width',
            clickBehavior: flat.card_clickBehavior || 'navigate',
            badgePosition: flat.card_badgePosition || 'top-left',
            badgeStyle: flat.card_badgeStyle || 'rounded',
            priceSize: flat.card_priceSize || 'medium',
            showComparePrice: bv(flat.card_showComparePrice),
            showDiscount: bv(flat.card_showDiscount),
            discountStyle: flat.card_discountStyle || 'percentage',
            showInstallments: bv(flat.card_showInstallments),
            titleLines: parseInt(flat.card_titleLines) || 2,
            contentAlign: flat.card_contentAlign || 'left',
            spacing: flat.card_spacing || 'normal',
            shadow: flat.card_shadow || 'none',
            hoverShadow: bv(flat.card_hoverShadow),
            border: bv(flat.card_border),
        },
        productPage: {
            galleryLayout: flat.pdp_galleryLayout || 'side-by-side',
            galleryPosition: flat.pdp_galleryPosition || 'left',
            imageZoom: bv(flat.pdp_imageZoom),
            stickyGallery: bv(flat.pdp_stickyGallery),
            showBreadcrumb: bv(flat.pdp_showBreadcrumb),
            showSKU: bv(flat.pdp_showSKU),
            showBrand: bv(flat.pdp_showBrand),
            showRating: bv(flat.pdp_showRating),
            showStock: bv(flat.pdp_showStock),
            showShareButtons: bv(flat.pdp_showShareButtons),
            variantStyle: flat.pdp_variantStyle || 'buttons',
            quantityStyle: flat.pdp_quantityStyle || 'stepper',
            ctaLayout: flat.pdp_ctaLayout || 'stacked',
            ctaStickyMobile: bv(flat.pdp_ctaStickyMobile),
            showTrustBadges: bv(flat.pdp_showTrustBadges),
            tabsStyle: flat.pdp_tabsStyle || 'tabs',
            showRelated: bv(flat.pdp_showRelated),
            relatedTitle: flat.pdp_relatedTitle || 'Você também pode gostar',
            showRecentlyViewed: bv(flat.pdp_showRecentlyViewed),
            sizeGuideEnabled: bv(flat.pdp_sizeGuideEnabled),
            shippingEstimate: bv(flat.pdp_shippingEstimate),
        },
        category: {
            layout: flat.cat_layout || 'sidebar-left',
            displayMode: flat.cat_displayMode || 'grid',
            columnsDesktop: parseInt(flat.cat_columnsDesktop) || 4,
            columnsMobile: parseInt(flat.cat_columnsMobile) || 2,
            filterStyle: flat.cat_filterStyle || 'accordion',
            showFilterCount: bv(flat.cat_showFilterCount),
            sortStyle: flat.cat_sortStyle || 'dropdown',
            pagination: flat.cat_pagination || 'load-more',
            productsPerPage: parseInt(flat.cat_productsPerPage) || 24,
            showBanner: bv(flat.cat_showBanner),
            bannerHeight: parseInt(flat.cat_bannerHeight) || 200,
            showBreadcrumb: bv(flat.cat_showBreadcrumb),
            showProductCount: bv(flat.cat_showProductCount),
            carouselAutoplay: bv(flat.cat_carouselAutoplay),
            carouselSpeed: parseInt(flat.cat_carouselSpeed) || 4,
            carouselDirection: flat.cat_carouselDirection || 'ltr',
            showAddToCartOnListing: bv(flat.cat_showAddToCartOnListing),
        },
        cart: {
            style: flat.cart_style || 'drawer',
            showThumbnails: bv(flat.cart_showThumbnails),
            showQuantity: bv(flat.cart_showQuantity),
            showCoupon: bv(flat.cart_showCoupon),
            showShippingEstimate: bv(flat.cart_showShippingEstimate),
            showRecommendations: bv(flat.cart_showRecommendations),
            recommendationsTitle: flat.cart_recommendationsTitle || 'Aproveite e leve também',
            showFreeShippingBar: bv(flat.cart_showFreeShippingBar),
            freeShippingThreshold: parseFloat(flat.cart_freeShippingThreshold) || 299,
            freeShippingMessage: flat.cart_freeShippingMessage || 'Frete grátis acima de R$ {value}',
            emptyCartMessage: flat.cart_emptyCartMessage || 'Seu carrinho está vazio',
            emptyCartCta: flat.cart_emptyCartCta || 'Continuar comprando',
            showContinueShopping: bv(flat.cart_showContinueShopping),
        },
        checkout: {
            layout: flat.checkout_layout || 'two-columns',
            stepsStyle: flat.checkout_stepsStyle || 'numbered',
            showOrderSummary: bv(flat.checkout_showOrderSummary),
            showCouponField: bv(flat.checkout_showCouponField),
            showTrustBadges: bv(flat.checkout_showTrustBadges),
            termsRequired: bv(flat.checkout_termsRequired),
            termsText: flat.checkout_termsText || '',
            successTitle: flat.checkout_successTitle || '',
            successMessage: flat.checkout_successMessage || '',
            showConfetti: bv(flat.checkout_showConfetti),
        },
        footer: {
            layout: flat.footer_layout || '4-columns',
            backgroundColor: flat.footer_backgroundColor || '#1a1a1a',
            textColor: flat.footer_textColor || '#fafafa',
            showNewsletter: bv(flat.footer_showNewsletter),
            newsletterTitle: flat.footer_newsletterTitle || '',
            newsletterDescription: flat.footer_newsletterDescription || '',
            showSocial: bv(flat.footer_showSocial),
            showPaymentIcons: bv(flat.footer_showPaymentIcons),
            showTrustSeals: bv(flat.footer_showTrustSeals),
            copyrightText: flat.footer_copyrightText || '',
            showBackToTop: bv(flat.footer_showBackToTop),
            columns: [
                {title:'Institucional',links:[{label:'Sobre nós',url:'/about'},{label:'Contato',url:'/contact'},{label:'FAQ',url:'/faq'}],enabled:true},
                {title:'Ajuda',links:[{label:'Entregas',url:'/shipping'},{label:'Trocas',url:'/returns'},{label:'Privacidade',url:'/privacy'}],enabled:true},
                {title:'Contato',links:[{label:'contato@loja.com',url:'mailto:contato@loja.com'},{label:'(11) 99999-0000',url:'tel:+5511999990000'}],enabled:true},
            ],
            socialLinks:[{platform:'instagram',url:'#'},{platform:'facebook',url:'#'}],
            bottomLinks:[{label:'Termos de Uso',url:'/terms'},{label:'Política de Privacidade',url:'/privacy'}],
        },
        whatsapp: {
            enabled: bv(flat.wa_enabled),
            number: flat.wa_number || '',
            message: flat.wa_message || '',
            position: flat.wa_position || 'bottom-right',
            showLabel: bv(flat.wa_showLabel),
            label: flat.wa_label || '',
            backgroundColor: flat.wa_backgroundColor || '#25d366',
            delay: parseInt(flat.wa_delay) || 3,
        },
        seo: {
            titleTemplate: flat.seo_titleTemplate || '',
            defaultDescription: flat.seo_defaultDescription || '',
            ogImage: flat.seo_ogImage || '',
            showBreadcrumbs: bv(flat.seo_showBreadcrumbs),
        },
        customCode: {
            css: flat.code_css || '',
            headScripts: flat.code_headScripts || '',
        },
        homepageSections: window.__homepageSections || @json($theme['homepageSections'] ?? []),
    };
    return theme;
}

/**
 * Send theme to iframe via postMessage for INSTANT preview.
 * Then save to DB in background via AJAX (no iframe reload needed).
 */
function sendThemeToPreview() {
    const theme = buildNestedThemeFromForm();
    try {
        previewIframeEl.contentWindow.postMessage({
            type: 'theme-preview-update',
            theme: theme,
        }, '*');
    } catch (_) {}
}

async function saveDraftToServer() {
    const formData = buildFormData();
    try {
        const response = await fetch(formEl.action, {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json',
            },
            body: formData,
        });
        if (!response.ok) console.warn('Save failed:', response.status);
    } catch (_) {}
}

function queueAutoSave() {
    // Instant visual feedback via postMessage
    sendThemeToPreview();

    // Debounced save to server
    clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(saveDraftToServer, 600);
}

panelContentEl.addEventListener('input', (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement) {
        // Sync color inputs: color swatch ↔ hex text
        if (target.type === 'color' && target.nextElementSibling?.classList.contains('color-hex')) {
            target.nextElementSibling.value = target.value;
        }
        if (target.classList.contains('color-hex') && target.previousElementSibling?.type === 'color') {
            target.previousElementSibling.value = target.value;
        }
        queueAutoSave();
    }
});

panelContentEl.addEventListener('change', queueAutoSave);

formEl.addEventListener('submit', async (event) => {
    event.preventDefault();
    await saveDraftToServer();
    // Reload iframe to pick up structural changes (sections, hero content, etc.)
    const previewUrl = new URL(previewIframeEl.src, window.location.origin);
    previewUrl.searchParams.set('theme-preview', '1');
    previewUrl.searchParams.set('_t', String(Date.now()));
    previewIframeEl.src = previewUrl.toString();
});
</script>
@endsection
