!(function(t) {
  var e = {};
  function r(n) {
    if (e[n]) return e[n].exports;
    var o = (e[n] = { i: n, l: !1, exports: {} });
    return t[n].call(o.exports, o, o.exports, r), (o.l = !0), o.exports;
  }
  (r.m = t),
    (r.c = e),
    (r.d = function(t, e, n) {
      r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
    }),
    (r.r = function(t) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 });
    }),
    (r.t = function(t, e) {
      if ((1 & e && (t = r(t)), 8 & e)) return t;
      if (4 & e && 'object' == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if ((r.r(n), Object.defineProperty(n, 'default', { enumerable: !0, value: t }), 2 & e && 'string' != typeof t))
        for (var o in t)
          r.d(
            n,
            o,
            function(e) {
              return t[e];
            }.bind(null, o)
          );
      return n;
    }),
    (r.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return r.d(e, 'a', e), e;
    }),
    (r.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (r.p = ''),
    r((r.s = 25));
})([
  function(t, e, r) {
    function n(t) {
      if (t)
        return (function(t) {
          for (var e in n.prototype) t[e] = n.prototype[e];
          return t;
        })(t);
    }
    (t.exports = n),
      (n.prototype.on = n.prototype.addEventListener = function(t, e) {
        return (
          (this._callbacks = this._callbacks || {}),
          (this._callbacks['$' + t] = this._callbacks['$' + t] || []).push(e),
          this
        );
      }),
      (n.prototype.once = function(t, e) {
        function r() {
          this.off(t, r), e.apply(this, arguments);
        }
        return (r.fn = e), this.on(t, r), this;
      }),
      (n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(
        t,
        e
      ) {
        if (((this._callbacks = this._callbacks || {}), 0 == arguments.length)) return (this._callbacks = {}), this;
        var r,
          n = this._callbacks['$' + t];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks['$' + t], this;
        for (var o = 0; o < n.length; o++)
          if ((r = n[o]) === e || r.fn === e) {
            n.splice(o, 1);
            break;
          }
        return this;
      }),
      (n.prototype.emit = function(t) {
        this._callbacks = this._callbacks || {};
        var e = [].slice.call(arguments, 1),
          r = this._callbacks['$' + t];
        if (r) for (var n = 0, o = (r = r.slice(0)).length; n < o; ++n) r[n].apply(this, e);
        return this;
      }),
      (n.prototype.listeners = function(t) {
        return (this._callbacks = this._callbacks || {}), this._callbacks['$' + t] || [];
      }),
      (n.prototype.hasListeners = function(t) {
        return !!this.listeners(t).length;
      });
  },
  function(t, e, r) {
    var n,
      o = r(39),
      i = r(19),
      s = r(41),
      a = r(42),
      c = r(43);
    'undefined' != typeof ArrayBuffer && (n = r(44));
    var u = 'undefined' != typeof navigator && /Android/i.test(navigator.userAgent),
      f = 'undefined' != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
      h = u || f;
    e.protocol = 3;
    var p = (e.packets = { open: 0, close: 1, ping: 2, pong: 3, message: 4, upgrade: 5, noop: 6 }),
      l = o(p),
      d = { type: 'error', data: 'parser error' },
      y = r(45);
    function g(t, e, r) {
      for (
        var n = new Array(t.length),
          o = a(t.length, r),
          i = function(t, r, o) {
            e(r, function(e, r) {
              (n[t] = r), o(e, n);
            });
          },
          s = 0;
        s < t.length;
        s++
      )
        i(s, t[s], o);
    }
    (e.encodePacket = function(t, r, n, o) {
      'function' == typeof r && ((o = r), (r = !1)), 'function' == typeof n && ((o = n), (n = null));
      var i = void 0 === t.data ? void 0 : t.data.buffer || t.data;
      if ('undefined' != typeof ArrayBuffer && i instanceof ArrayBuffer)
        return (function(t, r, n) {
          if (!r) return e.encodeBase64Packet(t, n);
          var o = t.data,
            i = new Uint8Array(o),
            s = new Uint8Array(1 + o.byteLength);
          s[0] = p[t.type];
          for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
          return n(s.buffer);
        })(t, r, o);
      if (void 0 !== y && i instanceof y)
        return (function(t, r, n) {
          if (!r) return e.encodeBase64Packet(t, n);
          if (h)
            return (function(t, r, n) {
              if (!r) return e.encodeBase64Packet(t, n);
              var o = new FileReader();
              return (
                (o.onload = function() {
                  e.encodePacket({ type: t.type, data: o.result }, r, !0, n);
                }),
                o.readAsArrayBuffer(t.data)
              );
            })(t, r, n);
          var o = new Uint8Array(1);
          o[0] = p[t.type];
          var i = new y([o.buffer, t.data]);
          return n(i);
        })(t, r, o);
      if (i && i.base64)
        return (function(t, r) {
          var n = 'b' + e.packets[t.type] + t.data.data;
          return r(n);
        })(t, o);
      var s = p[t.type];
      return void 0 !== t.data && (s += n ? c.encode(String(t.data), { strict: !1 }) : String(t.data)), o('' + s);
    }),
      (e.encodeBase64Packet = function(t, r) {
        var n,
          o = 'b' + e.packets[t.type];
        if (void 0 !== y && t.data instanceof y) {
          var i = new FileReader();
          return (
            (i.onload = function() {
              var t = i.result.split(',')[1];
              r(o + t);
            }),
            i.readAsDataURL(t.data)
          );
        }
        try {
          n = String.fromCharCode.apply(null, new Uint8Array(t.data));
        } catch (e) {
          for (var s = new Uint8Array(t.data), a = new Array(s.length), c = 0; c < s.length; c++) a[c] = s[c];
          n = String.fromCharCode.apply(null, a);
        }
        return (o += btoa(n)), r(o);
      }),
      (e.decodePacket = function(t, r, n) {
        if (void 0 === t) return d;
        if ('string' == typeof t) {
          if ('b' === t.charAt(0)) return e.decodeBase64Packet(t.substr(1), r);
          if (
            n &&
            !1 ===
              (t = (function(t) {
                try {
                  t = c.decode(t, { strict: !1 });
                } catch (t) {
                  return !1;
                }
                return t;
              })(t))
          )
            return d;
          var o = t.charAt(0);
          return Number(o) == o && l[o] ? (t.length > 1 ? { type: l[o], data: t.substring(1) } : { type: l[o] }) : d;
        }
        o = new Uint8Array(t)[0];
        var i = s(t, 1);
        return y && 'blob' === r && (i = new y([i])), { type: l[o], data: i };
      }),
      (e.decodeBase64Packet = function(t, e) {
        var r = l[t.charAt(0)];
        if (!n) return { type: r, data: { base64: !0, data: t.substr(1) } };
        var o = n.decode(t.substr(1));
        return 'blob' === e && y && (o = new y([o])), { type: r, data: o };
      }),
      (e.encodePayload = function(t, r, n) {
        'function' == typeof r && ((n = r), (r = null));
        var o = i(t);
        if (r && o) return y && !h ? e.encodePayloadAsBlob(t, n) : e.encodePayloadAsArrayBuffer(t, n);
        if (!t.length) return n('0:');
        g(
          t,
          function(t, n) {
            e.encodePacket(t, !!o && r, !1, function(t) {
              n(
                null,
                (function(t) {
                  return t.length + ':' + t;
                })(t)
              );
            });
          },
          function(t, e) {
            return n(e.join(''));
          }
        );
      }),
      (e.decodePayload = function(t, r, n) {
        if ('string' != typeof t) return e.decodePayloadAsBinary(t, r, n);
        var o;
        if (('function' == typeof r && ((n = r), (r = null)), '' === t)) return n(d, 0, 1);
        for (var i, s, a = '', c = 0, u = t.length; c < u; c++) {
          var f = t.charAt(c);
          if (':' === f) {
            if ('' === a || a != (i = Number(a))) return n(d, 0, 1);
            if (a != (s = t.substr(c + 1, i)).length) return n(d, 0, 1);
            if (s.length) {
              if (((o = e.decodePacket(s, r, !1)), d.type === o.type && d.data === o.data)) return n(d, 0, 1);
              if (!1 === n(o, c + i, u)) return;
            }
            (c += i), (a = '');
          } else a += f;
        }
        return '' !== a ? n(d, 0, 1) : void 0;
      }),
      (e.encodePayloadAsArrayBuffer = function(t, r) {
        if (!t.length) return r(new ArrayBuffer(0));
        g(
          t,
          function(t, r) {
            e.encodePacket(t, !0, !0, function(t) {
              return r(null, t);
            });
          },
          function(t, e) {
            var n = e.reduce(function(t, e) {
                var r;
                return t + (r = 'string' == typeof e ? e.length : e.byteLength).toString().length + r + 2;
              }, 0),
              o = new Uint8Array(n),
              i = 0;
            return (
              e.forEach(function(t) {
                var e = 'string' == typeof t,
                  r = t;
                if (e) {
                  for (var n = new Uint8Array(t.length), s = 0; s < t.length; s++) n[s] = t.charCodeAt(s);
                  r = n.buffer;
                }
                o[i++] = e ? 0 : 1;
                var a = r.byteLength.toString();
                for (s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
                o[i++] = 255;
                for (n = new Uint8Array(r), s = 0; s < n.length; s++) o[i++] = n[s];
              }),
              r(o.buffer)
            );
          }
        );
      }),
      (e.encodePayloadAsBlob = function(t, r) {
        g(
          t,
          function(t, r) {
            e.encodePacket(t, !0, !0, function(t) {
              var e = new Uint8Array(1);
              if (((e[0] = 1), 'string' == typeof t)) {
                for (var n = new Uint8Array(t.length), o = 0; o < t.length; o++) n[o] = t.charCodeAt(o);
                (t = n.buffer), (e[0] = 0);
              }
              var i = (t instanceof ArrayBuffer ? t.byteLength : t.size).toString(),
                s = new Uint8Array(i.length + 1);
              for (o = 0; o < i.length; o++) s[o] = parseInt(i[o]);
              if (((s[i.length] = 255), y)) {
                var a = new y([e.buffer, s.buffer, t]);
                r(null, a);
              }
            });
          },
          function(t, e) {
            return r(new y(e));
          }
        );
      }),
      (e.decodePayloadAsBinary = function(t, r, n) {
        'function' == typeof r && ((n = r), (r = null));
        for (var o = t, i = []; o.byteLength > 0; ) {
          for (var a = new Uint8Array(o), c = 0 === a[0], u = '', f = 1; 255 !== a[f]; f++) {
            if (u.length > 310) return n(d, 0, 1);
            u += a[f];
          }
          (o = s(o, 2 + u.length)), (u = parseInt(u));
          var h = s(o, 0, u);
          if (c)
            try {
              h = String.fromCharCode.apply(null, new Uint8Array(h));
            } catch (t) {
              var p = new Uint8Array(h);
              h = '';
              for (f = 0; f < p.length; f++) h += String.fromCharCode(p[f]);
            }
          i.push(h), (o = s(o, u));
        }
        var l = i.length;
        i.forEach(function(t, o) {
          n(e.decodePacket(t, r, !0), o, l);
        });
      });
  },
  function(t, e, r) {
    (function(n) {
      function o() {
        var t;
        try {
          t = e.storage.debug;
        } catch (t) {}
        return !t && void 0 !== n && 'env' in n && (t = n.env.DEBUG), t;
      }
      ((e = t.exports = r(28)).log = function() {
        return (
          'object' == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        );
      }),
        (e.formatArgs = function(t) {
          var r = this.useColors;
          if (
            ((t[0] =
              (r ? '%c' : '') +
              this.namespace +
              (r ? ' %c' : ' ') +
              t[0] +
              (r ? '%c ' : ' ') +
              '+' +
              e.humanize(this.diff)),
            !r)
          )
            return;
          var n = 'color: ' + this.color;
          t.splice(1, 0, n, 'color: inherit');
          var o = 0,
            i = 0;
          t[0].replace(/%[a-zA-Z%]/g, function(t) {
            '%%' !== t && (o++, '%c' === t && (i = o));
          }),
            t.splice(i, 0, n);
        }),
        (e.save = function(t) {
          try {
            null == t ? e.storage.removeItem('debug') : (e.storage.debug = t);
          } catch (t) {}
        }),
        (e.load = o),
        (e.useColors = function() {
          if ('undefined' != typeof window && window.process && 'renderer' === window.process.type) return !0;
          if (
            'undefined' != typeof navigator &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
          )
            return !1;
          return (
            ('undefined' != typeof document &&
              document.documentElement &&
              document.documentElement.style &&
              document.documentElement.style.WebkitAppearance) ||
            ('undefined' != typeof window &&
              window.console &&
              (window.console.firebug || (window.console.exception && window.console.table))) ||
            ('undefined' != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
              parseInt(RegExp.$1, 10) >= 31) ||
            ('undefined' != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
          );
        }),
        (e.storage =
          'undefined' != typeof chrome && void 0 !== chrome.storage
            ? chrome.storage.local
            : (function() {
                try {
                  return window.localStorage;
                } catch (t) {}
              })()),
        (e.colors = [
          '#0000CC',
          '#0000FF',
          '#0033CC',
          '#0033FF',
          '#0066CC',
          '#0066FF',
          '#0099CC',
          '#0099FF',
          '#00CC00',
          '#00CC33',
          '#00CC66',
          '#00CC99',
          '#00CCCC',
          '#00CCFF',
          '#3300CC',
          '#3300FF',
          '#3333CC',
          '#3333FF',
          '#3366CC',
          '#3366FF',
          '#3399CC',
          '#3399FF',
          '#33CC00',
          '#33CC33',
          '#33CC66',
          '#33CC99',
          '#33CCCC',
          '#33CCFF',
          '#6600CC',
          '#6600FF',
          '#6633CC',
          '#6633FF',
          '#66CC00',
          '#66CC33',
          '#9900CC',
          '#9900FF',
          '#9933CC',
          '#9933FF',
          '#99CC00',
          '#99CC33',
          '#CC0000',
          '#CC0033',
          '#CC0066',
          '#CC0099',
          '#CC00CC',
          '#CC00FF',
          '#CC3300',
          '#CC3333',
          '#CC3366',
          '#CC3399',
          '#CC33CC',
          '#CC33FF',
          '#CC6600',
          '#CC6633',
          '#CC9900',
          '#CC9933',
          '#CCCC00',
          '#CCCC33',
          '#FF0000',
          '#FF0033',
          '#FF0066',
          '#FF0099',
          '#FF00CC',
          '#FF00FF',
          '#FF3300',
          '#FF3333',
          '#FF3366',
          '#FF3399',
          '#FF33CC',
          '#FF33FF',
          '#FF6600',
          '#FF6633',
          '#FF9900',
          '#FF9933',
          '#FFCC00',
          '#FFCC33',
        ]),
        (e.formatters.j = function(t) {
          try {
            return JSON.stringify(t);
          } catch (t) {
            return '[UnexpectedJSONParseError]: ' + t.message;
          }
        }),
        e.enable(o());
    }.call(this, r(6)));
  },
  function(t, e) {
    (e.encode = function(t) {
      var e = '';
      for (var r in t)
        t.hasOwnProperty(r) && (e.length && (e += '&'), (e += encodeURIComponent(r) + '=' + encodeURIComponent(t[r])));
      return e;
    }),
      (e.decode = function(t) {
        for (var e = {}, r = t.split('&'), n = 0, o = r.length; n < o; n++) {
          var i = r[n].split('=');
          e[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
        }
        return e;
      });
  },
  function(t, e) {
    t.exports = function(t, e) {
      var r = function() {};
      (r.prototype = e.prototype), (t.prototype = new r()), (t.prototype.constructor = t);
    };
  },
  function(t, e, r) {
    (function(n) {
      function o() {
        var t;
        try {
          t = e.storage.debug;
        } catch (t) {}
        return !t && void 0 !== n && 'env' in n && (t = n.env.DEBUG), t;
      }
      ((e = t.exports = r(46)).log = function() {
        return (
          'object' == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        );
      }),
        (e.formatArgs = function(t) {
          var r = this.useColors;
          if (
            ((t[0] =
              (r ? '%c' : '') +
              this.namespace +
              (r ? ' %c' : ' ') +
              t[0] +
              (r ? '%c ' : ' ') +
              '+' +
              e.humanize(this.diff)),
            !r)
          )
            return;
          var n = 'color: ' + this.color;
          t.splice(1, 0, n, 'color: inherit');
          var o = 0,
            i = 0;
          t[0].replace(/%[a-zA-Z%]/g, function(t) {
            '%%' !== t && (o++, '%c' === t && (i = o));
          }),
            t.splice(i, 0, n);
        }),
        (e.save = function(t) {
          try {
            null == t ? e.storage.removeItem('debug') : (e.storage.debug = t);
          } catch (t) {}
        }),
        (e.load = o),
        (e.useColors = function() {
          if ('undefined' != typeof window && window.process && 'renderer' === window.process.type) return !0;
          if (
            'undefined' != typeof navigator &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
          )
            return !1;
          return (
            ('undefined' != typeof document &&
              document.documentElement &&
              document.documentElement.style &&
              document.documentElement.style.WebkitAppearance) ||
            ('undefined' != typeof window &&
              window.console &&
              (window.console.firebug || (window.console.exception && window.console.table))) ||
            ('undefined' != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
              parseInt(RegExp.$1, 10) >= 31) ||
            ('undefined' != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
          );
        }),
        (e.storage =
          'undefined' != typeof chrome && void 0 !== chrome.storage
            ? chrome.storage.local
            : (function() {
                try {
                  return window.localStorage;
                } catch (t) {}
              })()),
        (e.colors = [
          '#0000CC',
          '#0000FF',
          '#0033CC',
          '#0033FF',
          '#0066CC',
          '#0066FF',
          '#0099CC',
          '#0099FF',
          '#00CC00',
          '#00CC33',
          '#00CC66',
          '#00CC99',
          '#00CCCC',
          '#00CCFF',
          '#3300CC',
          '#3300FF',
          '#3333CC',
          '#3333FF',
          '#3366CC',
          '#3366FF',
          '#3399CC',
          '#3399FF',
          '#33CC00',
          '#33CC33',
          '#33CC66',
          '#33CC99',
          '#33CCCC',
          '#33CCFF',
          '#6600CC',
          '#6600FF',
          '#6633CC',
          '#6633FF',
          '#66CC00',
          '#66CC33',
          '#9900CC',
          '#9900FF',
          '#9933CC',
          '#9933FF',
          '#99CC00',
          '#99CC33',
          '#CC0000',
          '#CC0033',
          '#CC0066',
          '#CC0099',
          '#CC00CC',
          '#CC00FF',
          '#CC3300',
          '#CC3333',
          '#CC3366',
          '#CC3399',
          '#CC33CC',
          '#CC33FF',
          '#CC6600',
          '#CC6633',
          '#CC9900',
          '#CC9933',
          '#CCCC00',
          '#CCCC33',
          '#FF0000',
          '#FF0033',
          '#FF0066',
          '#FF0099',
          '#FF00CC',
          '#FF00FF',
          '#FF3300',
          '#FF3333',
          '#FF3366',
          '#FF3399',
          '#FF33CC',
          '#FF33FF',
          '#FF6600',
          '#FF6633',
          '#FF9900',
          '#FF9933',
          '#FFCC00',
          '#FFCC33',
        ]),
        (e.formatters.j = function(t) {
          try {
            return JSON.stringify(t);
          } catch (t) {
            return '[UnexpectedJSONParseError]: ' + t.message;
          }
        }),
        e.enable(o());
    }.call(this, r(6)));
  },
  function(t, e) {
    var r,
      n,
      o = (t.exports = {});
    function i() {
      throw new Error('setTimeout has not been defined');
    }
    function s() {
      throw new Error('clearTimeout has not been defined');
    }
    function a(t) {
      if (r === setTimeout) return setTimeout(t, 0);
      if ((r === i || !r) && setTimeout) return (r = setTimeout), setTimeout(t, 0);
      try {
        return r(t, 0);
      } catch (e) {
        try {
          return r.call(null, t, 0);
        } catch (e) {
          return r.call(this, t, 0);
        }
      }
    }
    !(function() {
      try {
        r = 'function' == typeof setTimeout ? setTimeout : i;
      } catch (t) {
        r = i;
      }
      try {
        n = 'function' == typeof clearTimeout ? clearTimeout : s;
      } catch (t) {
        n = s;
      }
    })();
    var c,
      u = [],
      f = !1,
      h = -1;
    function p() {
      f && c && ((f = !1), c.length ? (u = c.concat(u)) : (h = -1), u.length && l());
    }
    function l() {
      if (!f) {
        var t = a(p);
        f = !0;
        for (var e = u.length; e; ) {
          for (c = u, u = []; ++h < e; ) c && c[h].run();
          (h = -1), (e = u.length);
        }
        (c = null),
          (f = !1),
          (function(t) {
            if (n === clearTimeout) return clearTimeout(t);
            if ((n === s || !n) && clearTimeout) return (n = clearTimeout), clearTimeout(t);
            try {
              n(t);
            } catch (e) {
              try {
                return n.call(null, t);
              } catch (e) {
                return n.call(this, t);
              }
            }
          })(t);
      }
    }
    function d(t, e) {
      (this.fun = t), (this.array = e);
    }
    function y() {}
    (o.nextTick = function(t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
      u.push(new d(t, e)), 1 !== u.length || f || a(l);
    }),
      (d.prototype.run = function() {
        this.fun.apply(null, this.array);
      }),
      (o.title = 'browser'),
      (o.browser = !0),
      (o.env = {}),
      (o.argv = []),
      (o.version = ''),
      (o.versions = {}),
      (o.on = y),
      (o.addListener = y),
      (o.once = y),
      (o.off = y),
      (o.removeListener = y),
      (o.removeAllListeners = y),
      (o.emit = y),
      (o.prependListener = y),
      (o.prependOnceListener = y),
      (o.listeners = function(t) {
        return [];
      }),
      (o.binding = function(t) {
        throw new Error('process.binding is not supported');
      }),
      (o.cwd = function() {
        return '/';
      }),
      (o.chdir = function(t) {
        throw new Error('process.chdir is not supported');
      }),
      (o.umask = function() {
        return 0;
      });
  },
  function(t, e) {
    var r = 1e3,
      n = 60 * r,
      o = 60 * n,
      i = 24 * o,
      s = 365.25 * i;
    function a(t, e, r) {
      if (!(t < e)) return t < 1.5 * e ? Math.floor(t / e) + ' ' + r : Math.ceil(t / e) + ' ' + r + 's';
    }
    t.exports = function(t, e) {
      e = e || {};
      var c,
        u = typeof t;
      if ('string' === u && t.length > 0)
        return (function(t) {
          if ((t = String(t)).length > 100) return;
          var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
            t
          );
          if (!e) return;
          var a = parseFloat(e[1]);
          switch ((e[2] || 'ms').toLowerCase()) {
            case 'years':
            case 'year':
            case 'yrs':
            case 'yr':
            case 'y':
              return a * s;
            case 'days':
            case 'day':
            case 'd':
              return a * i;
            case 'hours':
            case 'hour':
            case 'hrs':
            case 'hr':
            case 'h':
              return a * o;
            case 'minutes':
            case 'minute':
            case 'mins':
            case 'min':
            case 'm':
              return a * n;
            case 'seconds':
            case 'second':
            case 'secs':
            case 'sec':
            case 's':
              return a * r;
            case 'milliseconds':
            case 'millisecond':
            case 'msecs':
            case 'msec':
            case 'ms':
              return a;
            default:
              return;
          }
        })(t);
      if ('number' === u && !1 === isNaN(t))
        return e.long
          ? a((c = t), i, 'day') || a(c, o, 'hour') || a(c, n, 'minute') || a(c, r, 'second') || c + ' ms'
          : (function(t) {
              if (t >= i) return Math.round(t / i) + 'd';
              if (t >= o) return Math.round(t / o) + 'h';
              if (t >= n) return Math.round(t / n) + 'm';
              if (t >= r) return Math.round(t / r) + 's';
              return t + 'ms';
            })(t);
      throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(t));
    };
  },
  function(t, e, r) {
    var n = r(29)('socket.io-parser'),
      o = r(0),
      i = r(31),
      s = r(13),
      a = r(14);
    function c() {}
    (e.protocol = 4),
      (e.types = ['CONNECT', 'DISCONNECT', 'EVENT', 'ACK', 'ERROR', 'BINARY_EVENT', 'BINARY_ACK']),
      (e.CONNECT = 0),
      (e.DISCONNECT = 1),
      (e.EVENT = 2),
      (e.ACK = 3),
      (e.ERROR = 4),
      (e.BINARY_EVENT = 5),
      (e.BINARY_ACK = 6),
      (e.Encoder = c),
      (e.Decoder = h);
    var u = e.ERROR + '"encode error"';
    function f(t) {
      var r = '' + t.type;
      if (
        ((e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type) || (r += t.attachments + '-'),
        t.nsp && '/' !== t.nsp && (r += t.nsp + ','),
        null != t.id && (r += t.id),
        null != t.data)
      ) {
        var o = (function(t) {
          try {
            return JSON.stringify(t);
          } catch (t) {
            return !1;
          }
        })(t.data);
        if (!1 === o) return u;
        r += o;
      }
      return n('encoded %j as %s', t, r), r;
    }
    function h() {
      this.reconstructor = null;
    }
    function p(t) {
      (this.reconPack = t), (this.buffers = []);
    }
    function l(t) {
      return { type: e.ERROR, data: 'parser error: ' + t };
    }
    (c.prototype.encode = function(t, r) {
      (n('encoding packet %j', t), e.BINARY_EVENT === t.type || e.BINARY_ACK === t.type)
        ? (function(t, e) {
            i.removeBlobs(t, function(t) {
              var r = i.deconstructPacket(t),
                n = f(r.packet),
                o = r.buffers;
              o.unshift(n), e(o);
            });
          })(t, r)
        : r([f(t)]);
    }),
      o(h.prototype),
      (h.prototype.add = function(t) {
        var r;
        if ('string' == typeof t)
          (r = (function(t) {
            var r = 0,
              o = { type: Number(t.charAt(0)) };
            if (null == e.types[o.type]) return l('unknown packet type ' + o.type);
            if (e.BINARY_EVENT === o.type || e.BINARY_ACK === o.type) {
              for (var i = ''; '-' !== t.charAt(++r) && ((i += t.charAt(r)), r != t.length); );
              if (i != Number(i) || '-' !== t.charAt(r)) throw new Error('Illegal attachments');
              o.attachments = Number(i);
            }
            if ('/' === t.charAt(r + 1))
              for (o.nsp = ''; ++r; ) {
                var a = t.charAt(r);
                if (',' === a) break;
                if (((o.nsp += a), r === t.length)) break;
              }
            else o.nsp = '/';
            var c = t.charAt(r + 1);
            if ('' !== c && Number(c) == c) {
              for (o.id = ''; ++r; ) {
                var a = t.charAt(r);
                if (null == a || Number(a) != a) {
                  --r;
                  break;
                }
                if (((o.id += t.charAt(r)), r === t.length)) break;
              }
              o.id = Number(o.id);
            }
            if (t.charAt(++r)) {
              var u = (function(t) {
                  try {
                    return JSON.parse(t);
                  } catch (t) {
                    return !1;
                  }
                })(t.substr(r)),
                f = !1 !== u && (o.type === e.ERROR || s(u));
              if (!f) return l('invalid payload');
              o.data = u;
            }
            return n('decoded %s as %j', t, o), o;
          })(t)),
            e.BINARY_EVENT === r.type || e.BINARY_ACK === r.type
              ? ((this.reconstructor = new p(r)),
                0 === this.reconstructor.reconPack.attachments && this.emit('decoded', r))
              : this.emit('decoded', r);
        else {
          if (!a(t) && !t.base64) throw new Error('Unknown type: ' + t);
          if (!this.reconstructor) throw new Error('got binary data when not reconstructing a packet');
          (r = this.reconstructor.takeBinaryData(t)) && ((this.reconstructor = null), this.emit('decoded', r));
        }
      }),
      (h.prototype.destroy = function() {
        this.reconstructor && this.reconstructor.finishedReconstruction();
      }),
      (p.prototype.takeBinaryData = function(t) {
        if ((this.buffers.push(t), this.buffers.length === this.reconPack.attachments)) {
          var e = i.reconstructPacket(this.reconPack, this.buffers);
          return this.finishedReconstruction(), e;
        }
        return null;
      }),
      (p.prototype.finishedReconstruction = function() {
        (this.reconPack = null), (this.buffers = []);
      });
  },
  function(t, e, r) {
    'use strict';
    (function(t) {
      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */
      var n = r(32),
        o = r(33),
        i = r(34);
      function s() {
        return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function a(t, e) {
        if (s() < e) throw new RangeError('Invalid typed array length');
        return (
          c.TYPED_ARRAY_SUPPORT
            ? ((t = new Uint8Array(e)).__proto__ = c.prototype)
            : (null === t && (t = new c(e)), (t.length = e)),
          t
        );
      }
      function c(t, e, r) {
        if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(t, e, r);
        if ('number' == typeof t) {
          if ('string' == typeof e) throw new Error('If encoding is specified then the first argument must be a string');
          return h(this, t);
        }
        return u(this, t, e, r);
      }
      function u(t, e, r, n) {
        if ('number' == typeof e) throw new TypeError('"value" argument must not be a number');
        return 'undefined' != typeof ArrayBuffer && e instanceof ArrayBuffer
          ? (function(t, e, r, n) {
              if ((e.byteLength, r < 0 || e.byteLength < r)) throw new RangeError("'offset' is out of bounds");
              if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
              e =
                void 0 === r && void 0 === n
                  ? new Uint8Array(e)
                  : void 0 === n
                  ? new Uint8Array(e, r)
                  : new Uint8Array(e, r, n);
              c.TYPED_ARRAY_SUPPORT ? ((t = e).__proto__ = c.prototype) : (t = p(t, e));
              return t;
            })(t, e, r, n)
          : 'string' == typeof e
          ? (function(t, e, r) {
              ('string' == typeof r && '' !== r) || (r = 'utf8');
              if (!c.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
              var n = 0 | d(e, r),
                o = (t = a(t, n)).write(e, r);
              o !== n && (t = t.slice(0, o));
              return t;
            })(t, e, r)
          : (function(t, e) {
              if (c.isBuffer(e)) {
                var r = 0 | l(e.length);
                return 0 === (t = a(t, r)).length ? t : (e.copy(t, 0, 0, r), t);
              }
              if (e) {
                if (('undefined' != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer) || 'length' in e)
                  return 'number' != typeof e.length || (n = e.length) != n ? a(t, 0) : p(t, e);
                if ('Buffer' === e.type && i(e.data)) return p(t, e.data);
              }
              var n;
              throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
            })(t, e);
      }
      function f(t) {
        if ('number' != typeof t) throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative');
      }
      function h(t, e) {
        if ((f(e), (t = a(t, e < 0 ? 0 : 0 | l(e))), !c.TYPED_ARRAY_SUPPORT)) for (var r = 0; r < e; ++r) t[r] = 0;
        return t;
      }
      function p(t, e) {
        var r = e.length < 0 ? 0 : 0 | l(e.length);
        t = a(t, r);
        for (var n = 0; n < r; n += 1) t[n] = 255 & e[n];
        return t;
      }
      function l(t) {
        if (t >= s())
          throw new RangeError('Attempt to allocate Buffer larger than maximum size: 0x' + s().toString(16) + ' bytes');
        return 0 | t;
      }
      function d(t, e) {
        if (c.isBuffer(t)) return t.length;
        if (
          'undefined' != typeof ArrayBuffer &&
          'function' == typeof ArrayBuffer.isView &&
          (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
        )
          return t.byteLength;
        'string' != typeof t && (t = '' + t);
        var r = t.length;
        if (0 === r) return 0;
        for (var n = !1; ; )
          switch (e) {
            case 'ascii':
            case 'latin1':
            case 'binary':
              return r;
            case 'utf8':
            case 'utf-8':
            case void 0:
              return j(t).length;
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return 2 * r;
            case 'hex':
              return r >>> 1;
            case 'base64':
              return q(t).length;
            default:
              if (n) return j(t).length;
              (e = ('' + e).toLowerCase()), (n = !0);
          }
      }
      function y(t, e, r) {
        var n = t[e];
        (t[e] = t[r]), (t[r] = n);
      }
      function g(t, e, r, n, o) {
        if (0 === t.length) return -1;
        if (
          ('string' == typeof r
            ? ((n = r), (r = 0))
            : r > 2147483647
            ? (r = 2147483647)
            : r < -2147483648 && (r = -2147483648),
          (r = +r),
          isNaN(r) && (r = o ? 0 : t.length - 1),
          r < 0 && (r = t.length + r),
          r >= t.length)
        ) {
          if (o) return -1;
          r = t.length - 1;
        } else if (r < 0) {
          if (!o) return -1;
          r = 0;
        }
        if (('string' == typeof e && (e = c.from(e, n)), c.isBuffer(e))) return 0 === e.length ? -1 : m(t, e, r, n, o);
        if ('number' == typeof e)
          return (
            (e &= 255),
            c.TYPED_ARRAY_SUPPORT && 'function' == typeof Uint8Array.prototype.indexOf
              ? o
                ? Uint8Array.prototype.indexOf.call(t, e, r)
                : Uint8Array.prototype.lastIndexOf.call(t, e, r)
              : m(t, [e], r, n, o)
          );
        throw new TypeError('val must be string, number or Buffer');
      }
      function m(t, e, r, n, o) {
        var i,
          s = 1,
          a = t.length,
          c = e.length;
        if (
          void 0 !== n &&
          ('ucs2' === (n = String(n).toLowerCase()) || 'ucs-2' === n || 'utf16le' === n || 'utf-16le' === n)
        ) {
          if (t.length < 2 || e.length < 2) return -1;
          (s = 2), (a /= 2), (c /= 2), (r /= 2);
        }
        function u(t, e) {
          return 1 === s ? t[e] : t.readUInt16BE(e * s);
        }
        if (o) {
          var f = -1;
          for (i = r; i < a; i++)
            if (u(t, i) === u(e, -1 === f ? 0 : i - f)) {
              if ((-1 === f && (f = i), i - f + 1 === c)) return f * s;
            } else -1 !== f && (i -= i - f), (f = -1);
        } else
          for (r + c > a && (r = a - c), i = r; i >= 0; i--) {
            for (var h = !0, p = 0; p < c; p++)
              if (u(t, i + p) !== u(e, p)) {
                h = !1;
                break;
              }
            if (h) return i;
          }
        return -1;
      }
      function v(t, e, r, n) {
        r = Number(r) || 0;
        var o = t.length - r;
        n ? (n = Number(n)) > o && (n = o) : (n = o);
        var i = e.length;
        if (i % 2 != 0) throw new TypeError('Invalid hex string');
        n > i / 2 && (n = i / 2);
        for (var s = 0; s < n; ++s) {
          var a = parseInt(e.substr(2 * s, 2), 16);
          if (isNaN(a)) return s;
          t[r + s] = a;
        }
        return s;
      }
      function C(t, e, r, n) {
        return Y(j(e, t.length - r), t, r, n);
      }
      function b(t, e, r, n) {
        return Y(
          (function(t) {
            for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
            return e;
          })(e),
          t,
          r,
          n
        );
      }
      function w(t, e, r, n) {
        return b(t, e, r, n);
      }
      function A(t, e, r, n) {
        return Y(q(e), t, r, n);
      }
      function k(t, e, r, n) {
        return Y(
          (function(t, e) {
            for (var r, n, o, i = [], s = 0; s < t.length && !((e -= 2) < 0); ++s)
              (r = t.charCodeAt(s)), (n = r >> 8), (o = r % 256), i.push(o), i.push(n);
            return i;
          })(e, t.length - r),
          t,
          r,
          n
        );
      }
      function F(t, e, r) {
        return 0 === e && r === t.length ? n.fromByteArray(t) : n.fromByteArray(t.slice(e, r));
      }
      function E(t, e, r) {
        r = Math.min(t.length, r);
        for (var n = [], o = e; o < r; ) {
          var i,
            s,
            a,
            c,
            u = t[o],
            f = null,
            h = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
          if (o + h <= r)
            switch (h) {
              case 1:
                u < 128 && (f = u);
                break;
              case 2:
                128 == (192 & (i = t[o + 1])) && (c = ((31 & u) << 6) | (63 & i)) > 127 && (f = c);
                break;
              case 3:
                (i = t[o + 1]),
                  (s = t[o + 2]),
                  128 == (192 & i) &&
                    128 == (192 & s) &&
                    (c = ((15 & u) << 12) | ((63 & i) << 6) | (63 & s)) > 2047 &&
                    (c < 55296 || c > 57343) &&
                    (f = c);
                break;
              case 4:
                (i = t[o + 1]),
                  (s = t[o + 2]),
                  (a = t[o + 3]),
                  128 == (192 & i) &&
                    128 == (192 & s) &&
                    128 == (192 & a) &&
                    (c = ((15 & u) << 18) | ((63 & i) << 12) | ((63 & s) << 6) | (63 & a)) > 65535 &&
                    c < 1114112 &&
                    (f = c);
            }
          null === f
            ? ((f = 65533), (h = 1))
            : f > 65535 && ((f -= 65536), n.push(((f >>> 10) & 1023) | 55296), (f = 56320 | (1023 & f))),
            n.push(f),
            (o += h);
        }
        return (function(t) {
          var e = t.length;
          if (e <= B) return String.fromCharCode.apply(String, t);
          var r = '',
            n = 0;
          for (; n < e; ) r += String.fromCharCode.apply(String, t.slice(n, (n += B)));
          return r;
        })(n);
      }
      (e.Buffer = c),
        (e.SlowBuffer = function(t) {
          +t != t && (t = 0);
          return c.alloc(+t);
        }),
        (e.INSPECT_MAX_BYTES = 50),
        (c.TYPED_ARRAY_SUPPORT =
          void 0 !== t.TYPED_ARRAY_SUPPORT
            ? t.TYPED_ARRAY_SUPPORT
            : (function() {
                try {
                  var t = new Uint8Array(1);
                  return (
                    (t.__proto__ = {
                      __proto__: Uint8Array.prototype,
                      foo: function() {
                        return 42;
                      },
                    }),
                    42 === t.foo() && 'function' == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                  );
                } catch (t) {
                  return !1;
                }
              })()),
        (e.kMaxLength = s()),
        (c.poolSize = 8192),
        (c._augment = function(t) {
          return (t.__proto__ = c.prototype), t;
        }),
        (c.from = function(t, e, r) {
          return u(null, t, e, r);
        }),
        c.TYPED_ARRAY_SUPPORT &&
          ((c.prototype.__proto__ = Uint8Array.prototype),
          (c.__proto__ = Uint8Array),
          'undefined' != typeof Symbol &&
            Symbol.species &&
            c[Symbol.species] === c &&
            Object.defineProperty(c, Symbol.species, { value: null, configurable: !0 })),
        (c.alloc = function(t, e, r) {
          return (function(t, e, r, n) {
            return (
              f(e),
              e <= 0 ? a(t, e) : void 0 !== r ? ('string' == typeof n ? a(t, e).fill(r, n) : a(t, e).fill(r)) : a(t, e)
            );
          })(null, t, e, r);
        }),
        (c.allocUnsafe = function(t) {
          return h(null, t);
        }),
        (c.allocUnsafeSlow = function(t) {
          return h(null, t);
        }),
        (c.isBuffer = function(t) {
          return !(null == t || !t._isBuffer);
        }),
        (c.compare = function(t, e) {
          if (!c.isBuffer(t) || !c.isBuffer(e)) throw new TypeError('Arguments must be Buffers');
          if (t === e) return 0;
          for (var r = t.length, n = e.length, o = 0, i = Math.min(r, n); o < i; ++o)
            if (t[o] !== e[o]) {
              (r = t[o]), (n = e[o]);
              break;
            }
          return r < n ? -1 : n < r ? 1 : 0;
        }),
        (c.isEncoding = function(t) {
          switch (String(t).toLowerCase()) {
            case 'hex':
            case 'utf8':
            case 'utf-8':
            case 'ascii':
            case 'latin1':
            case 'binary':
            case 'base64':
            case 'ucs2':
            case 'ucs-2':
            case 'utf16le':
            case 'utf-16le':
              return !0;
            default:
              return !1;
          }
        }),
        (c.concat = function(t, e) {
          if (!i(t)) throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === t.length) return c.alloc(0);
          var r;
          if (void 0 === e) for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
          var n = c.allocUnsafe(e),
            o = 0;
          for (r = 0; r < t.length; ++r) {
            var s = t[r];
            if (!c.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
            s.copy(n, o), (o += s.length);
          }
          return n;
        }),
        (c.byteLength = d),
        (c.prototype._isBuffer = !0),
        (c.prototype.swap16 = function() {
          var t = this.length;
          if (t % 2 != 0) throw new RangeError('Buffer size must be a multiple of 16-bits');
          for (var e = 0; e < t; e += 2) y(this, e, e + 1);
          return this;
        }),
        (c.prototype.swap32 = function() {
          var t = this.length;
          if (t % 4 != 0) throw new RangeError('Buffer size must be a multiple of 32-bits');
          for (var e = 0; e < t; e += 4) y(this, e, e + 3), y(this, e + 1, e + 2);
          return this;
        }),
        (c.prototype.swap64 = function() {
          var t = this.length;
          if (t % 8 != 0) throw new RangeError('Buffer size must be a multiple of 64-bits');
          for (var e = 0; e < t; e += 8)
            y(this, e, e + 7), y(this, e + 1, e + 6), y(this, e + 2, e + 5), y(this, e + 3, e + 4);
          return this;
        }),
        (c.prototype.toString = function() {
          var t = 0 | this.length;
          return 0 === t
            ? ''
            : 0 === arguments.length
            ? E(this, 0, t)
            : function(t, e, r) {
                var n = !1;
                if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return '';
                if (((void 0 === r || r > this.length) && (r = this.length), r <= 0)) return '';
                if ((r >>>= 0) <= (e >>>= 0)) return '';
                for (t || (t = 'utf8'); ; )
                  switch (t) {
                    case 'hex':
                      return S(this, e, r);
                    case 'utf8':
                    case 'utf-8':
                      return E(this, e, r);
                    case 'ascii':
                      return x(this, e, r);
                    case 'latin1':
                    case 'binary':
                      return R(this, e, r);
                    case 'base64':
                      return F(this, e, r);
                    case 'ucs2':
                    case 'ucs-2':
                    case 'utf16le':
                    case 'utf-16le':
                      return T(this, e, r);
                    default:
                      if (n) throw new TypeError('Unknown encoding: ' + t);
                      (t = (t + '').toLowerCase()), (n = !0);
                  }
              }.apply(this, arguments);
        }),
        (c.prototype.equals = function(t) {
          if (!c.isBuffer(t)) throw new TypeError('Argument must be a Buffer');
          return this === t || 0 === c.compare(this, t);
        }),
        (c.prototype.inspect = function() {
          var t = '',
            r = e.INSPECT_MAX_BYTES;
          return (
            this.length > 0 &&
              ((t = this.toString('hex', 0, r)
                .match(/.{2}/g)
                .join(' ')),
              this.length > r && (t += ' ... ')),
            '<Buffer ' + t + '>'
          );
        }),
        (c.prototype.compare = function(t, e, r, n, o) {
          if (!c.isBuffer(t)) throw new TypeError('Argument must be a Buffer');
          if (
            (void 0 === e && (e = 0),
            void 0 === r && (r = t ? t.length : 0),
            void 0 === n && (n = 0),
            void 0 === o && (o = this.length),
            e < 0 || r > t.length || n < 0 || o > this.length)
          )
            throw new RangeError('out of range index');
          if (n >= o && e >= r) return 0;
          if (n >= o) return -1;
          if (e >= r) return 1;
          if (this === t) return 0;
          for (
            var i = (o >>>= 0) - (n >>>= 0),
              s = (r >>>= 0) - (e >>>= 0),
              a = Math.min(i, s),
              u = this.slice(n, o),
              f = t.slice(e, r),
              h = 0;
            h < a;
            ++h
          )
            if (u[h] !== f[h]) {
              (i = u[h]), (s = f[h]);
              break;
            }
          return i < s ? -1 : s < i ? 1 : 0;
        }),
        (c.prototype.includes = function(t, e, r) {
          return -1 !== this.indexOf(t, e, r);
        }),
        (c.prototype.indexOf = function(t, e, r) {
          return g(this, t, e, r, !0);
        }),
        (c.prototype.lastIndexOf = function(t, e, r) {
          return g(this, t, e, r, !1);
        }),
        (c.prototype.write = function(t, e, r, n) {
          if (void 0 === e) (n = 'utf8'), (r = this.length), (e = 0);
          else if (void 0 === r && 'string' == typeof e) (n = e), (r = this.length), (e = 0);
          else {
            if (!isFinite(e)) throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
            (e |= 0), isFinite(r) ? ((r |= 0), void 0 === n && (n = 'utf8')) : ((n = r), (r = void 0));
          }
          var o = this.length - e;
          if (((void 0 === r || r > o) && (r = o), (t.length > 0 && (r < 0 || e < 0)) || e > this.length))
            throw new RangeError('Attempt to write outside buffer bounds');
          n || (n = 'utf8');
          for (var i = !1; ; )
            switch (n) {
              case 'hex':
                return v(this, t, e, r);
              case 'utf8':
              case 'utf-8':
                return C(this, t, e, r);
              case 'ascii':
                return b(this, t, e, r);
              case 'latin1':
              case 'binary':
                return w(this, t, e, r);
              case 'base64':
                return A(this, t, e, r);
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return k(this, t, e, r);
              default:
                if (i) throw new TypeError('Unknown encoding: ' + n);
                (n = ('' + n).toLowerCase()), (i = !0);
            }
        }),
        (c.prototype.toJSON = function() {
          return { type: 'Buffer', data: Array.prototype.slice.call(this._arr || this, 0) };
        });
      var B = 4096;
      function x(t, e, r) {
        var n = '';
        r = Math.min(t.length, r);
        for (var o = e; o < r; ++o) n += String.fromCharCode(127 & t[o]);
        return n;
      }
      function R(t, e, r) {
        var n = '';
        r = Math.min(t.length, r);
        for (var o = e; o < r; ++o) n += String.fromCharCode(t[o]);
        return n;
      }
      function S(t, e, r) {
        var n = t.length;
        (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
        for (var o = '', i = e; i < r; ++i) o += M(t[i]);
        return o;
      }
      function T(t, e, r) {
        for (var n = t.slice(e, r), o = '', i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
        return o;
      }
      function P(t, e, r) {
        if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint');
        if (t + e > r) throw new RangeError('Trying to access beyond buffer length');
      }
      function _(t, e, r, n, o, i) {
        if (!c.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > o || e < i) throw new RangeError('"value" argument is out of bounds');
        if (r + n > t.length) throw new RangeError('Index out of range');
      }
      function O(t, e, r, n) {
        e < 0 && (e = 65535 + e + 1);
        for (var o = 0, i = Math.min(t.length - r, 2); o < i; ++o)
          t[r + o] = (e & (255 << (8 * (n ? o : 1 - o)))) >>> (8 * (n ? o : 1 - o));
      }
      function U(t, e, r, n) {
        e < 0 && (e = 4294967295 + e + 1);
        for (var o = 0, i = Math.min(t.length - r, 4); o < i; ++o) t[r + o] = (e >>> (8 * (n ? o : 3 - o))) & 255;
      }
      function N(t, e, r, n, o, i) {
        if (r + n > t.length) throw new RangeError('Index out of range');
        if (r < 0) throw new RangeError('Index out of range');
      }
      function D(t, e, r, n, i) {
        return i || N(t, 0, r, 4), o.write(t, e, r, n, 23, 4), r + 4;
      }
      function I(t, e, r, n, i) {
        return i || N(t, 0, r, 8), o.write(t, e, r, n, 52, 8), r + 8;
      }
      (c.prototype.slice = function(t, e) {
        var r,
          n = this.length;
        if (
          ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
          (e = void 0 === e ? n : ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n),
          e < t && (e = t),
          c.TYPED_ARRAY_SUPPORT)
        )
          (r = this.subarray(t, e)).__proto__ = c.prototype;
        else {
          var o = e - t;
          r = new c(o, void 0);
          for (var i = 0; i < o; ++i) r[i] = this[i + t];
        }
        return r;
      }),
        (c.prototype.readUIntLE = function(t, e, r) {
          (t |= 0), (e |= 0), r || P(t, e, this.length);
          for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256); ) n += this[t + i] * o;
          return n;
        }),
        (c.prototype.readUIntBE = function(t, e, r) {
          (t |= 0), (e |= 0), r || P(t, e, this.length);
          for (var n = this[t + --e], o = 1; e > 0 && (o *= 256); ) n += this[t + --e] * o;
          return n;
        }),
        (c.prototype.readUInt8 = function(t, e) {
          return e || P(t, 1, this.length), this[t];
        }),
        (c.prototype.readUInt16LE = function(t, e) {
          return e || P(t, 2, this.length), this[t] | (this[t + 1] << 8);
        }),
        (c.prototype.readUInt16BE = function(t, e) {
          return e || P(t, 2, this.length), (this[t] << 8) | this[t + 1];
        }),
        (c.prototype.readUInt32LE = function(t, e) {
          return (
            e || P(t, 4, this.length), (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3]
          );
        }),
        (c.prototype.readUInt32BE = function(t, e) {
          return (
            e || P(t, 4, this.length), 16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
          );
        }),
        (c.prototype.readIntLE = function(t, e, r) {
          (t |= 0), (e |= 0), r || P(t, e, this.length);
          for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256); ) n += this[t + i] * o;
          return n >= (o *= 128) && (n -= Math.pow(2, 8 * e)), n;
        }),
        (c.prototype.readIntBE = function(t, e, r) {
          (t |= 0), (e |= 0), r || P(t, e, this.length);
          for (var n = e, o = 1, i = this[t + --n]; n > 0 && (o *= 256); ) i += this[t + --n] * o;
          return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i;
        }),
        (c.prototype.readInt8 = function(t, e) {
          return e || P(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
        }),
        (c.prototype.readInt16LE = function(t, e) {
          e || P(t, 2, this.length);
          var r = this[t] | (this[t + 1] << 8);
          return 32768 & r ? 4294901760 | r : r;
        }),
        (c.prototype.readInt16BE = function(t, e) {
          e || P(t, 2, this.length);
          var r = this[t + 1] | (this[t] << 8);
          return 32768 & r ? 4294901760 | r : r;
        }),
        (c.prototype.readInt32LE = function(t, e) {
          return e || P(t, 4, this.length), this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24);
        }),
        (c.prototype.readInt32BE = function(t, e) {
          return e || P(t, 4, this.length), (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3];
        }),
        (c.prototype.readFloatLE = function(t, e) {
          return e || P(t, 4, this.length), o.read(this, t, !0, 23, 4);
        }),
        (c.prototype.readFloatBE = function(t, e) {
          return e || P(t, 4, this.length), o.read(this, t, !1, 23, 4);
        }),
        (c.prototype.readDoubleLE = function(t, e) {
          return e || P(t, 8, this.length), o.read(this, t, !0, 52, 8);
        }),
        (c.prototype.readDoubleBE = function(t, e) {
          return e || P(t, 8, this.length), o.read(this, t, !1, 52, 8);
        }),
        (c.prototype.writeUIntLE = function(t, e, r, n) {
          ((t = +t), (e |= 0), (r |= 0), n) || _(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
          var o = 1,
            i = 0;
          for (this[e] = 255 & t; ++i < r && (o *= 256); ) this[e + i] = (t / o) & 255;
          return e + r;
        }),
        (c.prototype.writeUIntBE = function(t, e, r, n) {
          ((t = +t), (e |= 0), (r |= 0), n) || _(this, t, e, r, Math.pow(2, 8 * r) - 1, 0);
          var o = r - 1,
            i = 1;
          for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); ) this[e + o] = (t / i) & 255;
          return e + r;
        }),
        (c.prototype.writeUInt8 = function(t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || _(this, t, e, 1, 255, 0),
            c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            (this[e] = 255 & t),
            e + 1
          );
        }),
        (c.prototype.writeUInt16LE = function(t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || _(this, t, e, 2, 65535, 0),
            c.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8)) : O(this, t, e, !0),
            e + 2
          );
        }),
        (c.prototype.writeUInt16BE = function(t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || _(this, t, e, 2, 65535, 0),
            c.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t)) : O(this, t, e, !1),
            e + 2
          );
        }),
        (c.prototype.writeUInt32LE = function(t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || _(this, t, e, 4, 4294967295, 0),
            c.TYPED_ARRAY_SUPPORT
              ? ((this[e + 3] = t >>> 24), (this[e + 2] = t >>> 16), (this[e + 1] = t >>> 8), (this[e] = 255 & t))
              : U(this, t, e, !0),
            e + 4
          );
        }),
        (c.prototype.writeUInt32BE = function(t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || _(this, t, e, 4, 4294967295, 0),
            c.TYPED_ARRAY_SUPPORT
              ? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = 255 & t))
              : U(this, t, e, !1),
            e + 4
          );
        }),
        (c.prototype.writeIntLE = function(t, e, r, n) {
          if (((t = +t), (e |= 0), !n)) {
            var o = Math.pow(2, 8 * r - 1);
            _(this, t, e, r, o - 1, -o);
          }
          var i = 0,
            s = 1,
            a = 0;
          for (this[e] = 255 & t; ++i < r && (s *= 256); )
            t < 0 && 0 === a && 0 !== this[e + i - 1] && (a = 1), (this[e + i] = (((t / s) >> 0) - a) & 255);
          return e + r;
        }),
        (c.prototype.writeIntBE = function(t, e, r, n) {
          if (((t = +t), (e |= 0), !n)) {
            var o = Math.pow(2, 8 * r - 1);
            _(this, t, e, r, o - 1, -o);
          }
          var i = r - 1,
            s = 1,
            a = 0;
          for (this[e + i] = 255 & t; --i >= 0 && (s *= 256); )
            t < 0 && 0 === a && 0 !== this[e + i + 1] && (a = 1), (this[e + i] = (((t / s) >> 0) - a) & 255);
          return e + r;
        }),
        (c.prototype.writeInt8 = function(t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || _(this, t, e, 1, 127, -128),
            c.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
            t < 0 && (t = 255 + t + 1),
            (this[e] = 255 & t),
            e + 1
          );
        }),
        (c.prototype.writeInt16LE = function(t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || _(this, t, e, 2, 32767, -32768),
            c.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8)) : O(this, t, e, !0),
            e + 2
          );
        }),
        (c.prototype.writeInt16BE = function(t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || _(this, t, e, 2, 32767, -32768),
            c.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t)) : O(this, t, e, !1),
            e + 2
          );
        }),
        (c.prototype.writeInt32LE = function(t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || _(this, t, e, 4, 2147483647, -2147483648),
            c.TYPED_ARRAY_SUPPORT
              ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8), (this[e + 2] = t >>> 16), (this[e + 3] = t >>> 24))
              : U(this, t, e, !0),
            e + 4
          );
        }),
        (c.prototype.writeInt32BE = function(t, e, r) {
          return (
            (t = +t),
            (e |= 0),
            r || _(this, t, e, 4, 2147483647, -2147483648),
            t < 0 && (t = 4294967295 + t + 1),
            c.TYPED_ARRAY_SUPPORT
              ? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = 255 & t))
              : U(this, t, e, !1),
            e + 4
          );
        }),
        (c.prototype.writeFloatLE = function(t, e, r) {
          return D(this, t, e, !0, r);
        }),
        (c.prototype.writeFloatBE = function(t, e, r) {
          return D(this, t, e, !1, r);
        }),
        (c.prototype.writeDoubleLE = function(t, e, r) {
          return I(this, t, e, !0, r);
        }),
        (c.prototype.writeDoubleBE = function(t, e, r) {
          return I(this, t, e, !1, r);
        }),
        (c.prototype.copy = function(t, e, r, n) {
          if (
            (r || (r = 0),
            n || 0 === n || (n = this.length),
            e >= t.length && (e = t.length),
            e || (e = 0),
            n > 0 && n < r && (n = r),
            n === r)
          )
            return 0;
          if (0 === t.length || 0 === this.length) return 0;
          if (e < 0) throw new RangeError('targetStart out of bounds');
          if (r < 0 || r >= this.length) throw new RangeError('sourceStart out of bounds');
          if (n < 0) throw new RangeError('sourceEnd out of bounds');
          n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
          var o,
            i = n - r;
          if (this === t && r < e && e < n) for (o = i - 1; o >= 0; --o) t[o + e] = this[o + r];
          else if (i < 1e3 || !c.TYPED_ARRAY_SUPPORT) for (o = 0; o < i; ++o) t[o + e] = this[o + r];
          else Uint8Array.prototype.set.call(t, this.subarray(r, r + i), e);
          return i;
        }),
        (c.prototype.fill = function(t, e, r, n) {
          if ('string' == typeof t) {
            if (
              ('string' == typeof e
                ? ((n = e), (e = 0), (r = this.length))
                : 'string' == typeof r && ((n = r), (r = this.length)),
              1 === t.length)
            ) {
              var o = t.charCodeAt(0);
              o < 256 && (t = o);
            }
            if (void 0 !== n && 'string' != typeof n) throw new TypeError('encoding must be a string');
            if ('string' == typeof n && !c.isEncoding(n)) throw new TypeError('Unknown encoding: ' + n);
          } else 'number' == typeof t && (t &= 255);
          if (e < 0 || this.length < e || this.length < r) throw new RangeError('Out of range index');
          if (r <= e) return this;
          var i;
          if (((e >>>= 0), (r = void 0 === r ? this.length : r >>> 0), t || (t = 0), 'number' == typeof t))
            for (i = e; i < r; ++i) this[i] = t;
          else {
            var s = c.isBuffer(t) ? t : j(new c(t, n).toString()),
              a = s.length;
            for (i = 0; i < r - e; ++i) this[i + e] = s[i % a];
          }
          return this;
        });
      var L = /[^+\/0-9A-Za-z-_]/g;
      function M(t) {
        return t < 16 ? '0' + t.toString(16) : t.toString(16);
      }
      function j(t, e) {
        var r;
        e = e || 1 / 0;
        for (var n = t.length, o = null, i = [], s = 0; s < n; ++s) {
          if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
            if (!o) {
              if (r > 56319) {
                (e -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }
              if (s + 1 === n) {
                (e -= 3) > -1 && i.push(239, 191, 189);
                continue;
              }
              o = r;
              continue;
            }
            if (r < 56320) {
              (e -= 3) > -1 && i.push(239, 191, 189), (o = r);
              continue;
            }
            r = 65536 + (((o - 55296) << 10) | (r - 56320));
          } else o && (e -= 3) > -1 && i.push(239, 191, 189);
          if (((o = null), r < 128)) {
            if ((e -= 1) < 0) break;
            i.push(r);
          } else if (r < 2048) {
            if ((e -= 2) < 0) break;
            i.push((r >> 6) | 192, (63 & r) | 128);
          } else if (r < 65536) {
            if ((e -= 3) < 0) break;
            i.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
          } else {
            if (!(r < 1114112)) throw new Error('Invalid code point');
            if ((e -= 4) < 0) break;
            i.push((r >> 18) | 240, ((r >> 12) & 63) | 128, ((r >> 6) & 63) | 128, (63 & r) | 128);
          }
        }
        return i;
      }
      function q(t) {
        return n.toByteArray(
          (function(t) {
            if (
              (t = (function(t) {
                return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '');
              })(t).replace(L, '')).length < 2
            )
              return '';
            for (; t.length % 4 != 0; ) t += '=';
            return t;
          })(t)
        );
      }
      function Y(t, e, r, n) {
        for (var o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o) e[o + r] = t[o];
        return o;
      }
    }.call(this, r(15)));
  },
  function(t, e, r) {
    var n = r(37);
    t.exports = function(t) {
      var e = t.xdomain,
        r = t.xscheme,
        o = t.enablesXDR;
      try {
        if ('undefined' != typeof XMLHttpRequest && (!e || n)) return new XMLHttpRequest();
      } catch (t) {}
      try {
        if ('undefined' != typeof XDomainRequest && !r && o) return new XDomainRequest();
      } catch (t) {}
      if (!e)
        try {
          return new self[(['Active'].concat('Object').join('X'))]('Microsoft.XMLHTTP');
        } catch (t) {}
    };
  },
  function(t, e, r) {
    var n = r(1),
      o = r(0);
    function i(t) {
      (this.path = t.path),
        (this.hostname = t.hostname),
        (this.port = t.port),
        (this.secure = t.secure),
        (this.query = t.query),
        (this.timestampParam = t.timestampParam),
        (this.timestampRequests = t.timestampRequests),
        (this.readyState = ''),
        (this.agent = t.agent || !1),
        (this.socket = t.socket),
        (this.enablesXDR = t.enablesXDR),
        (this.pfx = t.pfx),
        (this.key = t.key),
        (this.passphrase = t.passphrase),
        (this.cert = t.cert),
        (this.ca = t.ca),
        (this.ciphers = t.ciphers),
        (this.rejectUnauthorized = t.rejectUnauthorized),
        (this.forceNode = t.forceNode),
        (this.isReactNative = t.isReactNative),
        (this.extraHeaders = t.extraHeaders),
        (this.localAddress = t.localAddress);
    }
    (t.exports = i),
      o(i.prototype),
      (i.prototype.onError = function(t, e) {
        var r = new Error(t);
        return (r.type = 'TransportError'), (r.description = e), this.emit('error', r), this;
      }),
      (i.prototype.open = function() {
        return (
          ('closed' !== this.readyState && '' !== this.readyState) || ((this.readyState = 'opening'), this.doOpen()),
          this
        );
      }),
      (i.prototype.close = function() {
        return ('opening' !== this.readyState && 'open' !== this.readyState) || (this.doClose(), this.onClose()), this;
      }),
      (i.prototype.send = function(t) {
        if ('open' !== this.readyState) throw new Error('Transport not open');
        this.write(t);
      }),
      (i.prototype.onOpen = function() {
        (this.readyState = 'open'), (this.writable = !0), this.emit('open');
      }),
      (i.prototype.onData = function(t) {
        var e = n.decodePacket(t, this.socket.binaryType);
        this.onPacket(e);
      }),
      (i.prototype.onPacket = function(t) {
        this.emit('packet', t);
      }),
      (i.prototype.onClose = function() {
        (this.readyState = 'closed'), this.emit('close');
      });
  },
  function(t, e) {
    var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
      n = [
        'source',
        'protocol',
        'authority',
        'userInfo',
        'user',
        'password',
        'host',
        'port',
        'relative',
        'path',
        'directory',
        'file',
        'query',
        'anchor',
      ];
    t.exports = function(t) {
      var e = t,
        o = t.indexOf('['),
        i = t.indexOf(']');
      -1 != o && -1 != i && (t = t.substring(0, o) + t.substring(o, i).replace(/:/g, ';') + t.substring(i, t.length));
      for (var s = r.exec(t || ''), a = {}, c = 14; c--; ) a[n[c]] = s[c] || '';
      return (
        -1 != o &&
          -1 != i &&
          ((a.source = e),
          (a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ':')),
          (a.authority = a.authority
            .replace('[', '')
            .replace(']', '')
            .replace(/;/g, ':')),
          (a.ipv6uri = !0)),
        a
      );
    };
  },
  function(t, e) {
    var r = {}.toString;
    t.exports =
      Array.isArray ||
      function(t) {
        return '[object Array]' == r.call(t);
      };
  },
  function(t, e, r) {
    (function(e) {
      t.exports = function(t) {
        return (r && e.isBuffer(t)) || (n && (t instanceof ArrayBuffer || o(t)));
      };
      var r = 'function' == typeof e && 'function' == typeof e.isBuffer,
        n = 'function' == typeof ArrayBuffer,
        o = function(t) {
          return 'function' == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : t.buffer instanceof ArrayBuffer;
        };
    }.call(this, r(9).Buffer));
  },
  function(t, e) {
    var r;
    r = (function() {
      return this;
    })();
    try {
      r = r || new Function('return this')();
    } catch (t) {
      'object' == typeof window && (r = window);
    }
    t.exports = r;
  },
  function(t, e, r) {
    var n = r(35),
      o = r(22),
      i = r(0),
      s = r(8),
      a = r(23),
      c = r(24),
      u = r(2)('socket.io-client:manager'),
      f = r(21),
      h = r(51),
      p = Object.prototype.hasOwnProperty;
    function l(t, e) {
      if (!(this instanceof l)) return new l(t, e);
      t && 'object' == typeof t && ((e = t), (t = void 0)),
        ((e = e || {}).path = e.path || '/socket.io'),
        (this.nsps = {}),
        (this.subs = []),
        (this.opts = e),
        this.reconnection(!1 !== e.reconnection),
        this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0),
        this.reconnectionDelay(e.reconnectionDelay || 1e3),
        this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3),
        this.randomizationFactor(e.randomizationFactor || 0.5),
        (this.backoff = new h({
          min: this.reconnectionDelay(),
          max: this.reconnectionDelayMax(),
          jitter: this.randomizationFactor(),
        })),
        this.timeout(null == e.timeout ? 2e4 : e.timeout),
        (this.readyState = 'closed'),
        (this.uri = t),
        (this.connecting = []),
        (this.lastPing = null),
        (this.encoding = !1),
        (this.packetBuffer = []);
      var r = e.parser || s;
      (this.encoder = new r.Encoder()),
        (this.decoder = new r.Decoder()),
        (this.autoConnect = !1 !== e.autoConnect),
        this.autoConnect && this.open();
    }
    (t.exports = l),
      (l.prototype.emitAll = function() {
        for (var t in (this.emit.apply(this, arguments), this.nsps))
          p.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments);
      }),
      (l.prototype.updateSocketIds = function() {
        for (var t in this.nsps) p.call(this.nsps, t) && (this.nsps[t].id = this.generateId(t));
      }),
      (l.prototype.generateId = function(t) {
        return ('/' === t ? '' : t + '#') + this.engine.id;
      }),
      i(l.prototype),
      (l.prototype.reconnection = function(t) {
        return arguments.length ? ((this._reconnection = !!t), this) : this._reconnection;
      }),
      (l.prototype.reconnectionAttempts = function(t) {
        return arguments.length ? ((this._reconnectionAttempts = t), this) : this._reconnectionAttempts;
      }),
      (l.prototype.reconnectionDelay = function(t) {
        return arguments.length
          ? ((this._reconnectionDelay = t), this.backoff && this.backoff.setMin(t), this)
          : this._reconnectionDelay;
      }),
      (l.prototype.randomizationFactor = function(t) {
        return arguments.length
          ? ((this._randomizationFactor = t), this.backoff && this.backoff.setJitter(t), this)
          : this._randomizationFactor;
      }),
      (l.prototype.reconnectionDelayMax = function(t) {
        return arguments.length
          ? ((this._reconnectionDelayMax = t), this.backoff && this.backoff.setMax(t), this)
          : this._reconnectionDelayMax;
      }),
      (l.prototype.timeout = function(t) {
        return arguments.length ? ((this._timeout = t), this) : this._timeout;
      }),
      (l.prototype.maybeReconnectOnOpen = function() {
        !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
      }),
      (l.prototype.open = l.prototype.connect = function(t, e) {
        if ((u('readyState %s', this.readyState), ~this.readyState.indexOf('open'))) return this;
        u('opening %s', this.uri), (this.engine = n(this.uri, this.opts));
        var r = this.engine,
          o = this;
        (this.readyState = 'opening'), (this.skipReconnect = !1);
        var i = a(r, 'open', function() {
            o.onopen(), t && t();
          }),
          s = a(r, 'error', function(e) {
            if ((u('connect_error'), o.cleanup(), (o.readyState = 'closed'), o.emitAll('connect_error', e), t)) {
              var r = new Error('Connection error');
              (r.data = e), t(r);
            } else o.maybeReconnectOnOpen();
          });
        if (!1 !== this._timeout) {
          var c = this._timeout;
          u('connect attempt will timeout after %d', c);
          var f = setTimeout(function() {
            u('connect attempt timed out after %d', c),
              i.destroy(),
              r.close(),
              r.emit('error', 'timeout'),
              o.emitAll('connect_timeout', c);
          }, c);
          this.subs.push({
            destroy: function() {
              clearTimeout(f);
            },
          });
        }
        return this.subs.push(i), this.subs.push(s), this;
      }),
      (l.prototype.onopen = function() {
        u('open'), this.cleanup(), (this.readyState = 'open'), this.emit('open');
        var t = this.engine;
        this.subs.push(a(t, 'data', c(this, 'ondata'))),
          this.subs.push(a(t, 'ping', c(this, 'onping'))),
          this.subs.push(a(t, 'pong', c(this, 'onpong'))),
          this.subs.push(a(t, 'error', c(this, 'onerror'))),
          this.subs.push(a(t, 'close', c(this, 'onclose'))),
          this.subs.push(a(this.decoder, 'decoded', c(this, 'ondecoded')));
      }),
      (l.prototype.onping = function() {
        (this.lastPing = new Date()), this.emitAll('ping');
      }),
      (l.prototype.onpong = function() {
        this.emitAll('pong', new Date() - this.lastPing);
      }),
      (l.prototype.ondata = function(t) {
        this.decoder.add(t);
      }),
      (l.prototype.ondecoded = function(t) {
        this.emit('packet', t);
      }),
      (l.prototype.onerror = function(t) {
        u('error', t), this.emitAll('error', t);
      }),
      (l.prototype.socket = function(t, e) {
        var r = this.nsps[t];
        if (!r) {
          (r = new o(this, t, e)), (this.nsps[t] = r);
          var n = this;
          r.on('connecting', i),
            r.on('connect', function() {
              r.id = n.generateId(t);
            }),
            this.autoConnect && i();
        }
        function i() {
          ~f(n.connecting, r) || n.connecting.push(r);
        }
        return r;
      }),
      (l.prototype.destroy = function(t) {
        var e = f(this.connecting, t);
        ~e && this.connecting.splice(e, 1), this.connecting.length || this.close();
      }),
      (l.prototype.packet = function(t) {
        u('writing packet %j', t);
        var e = this;
        t.query && 0 === t.type && (t.nsp += '?' + t.query),
          e.encoding
            ? e.packetBuffer.push(t)
            : ((e.encoding = !0),
              this.encoder.encode(t, function(r) {
                for (var n = 0; n < r.length; n++) e.engine.write(r[n], t.options);
                (e.encoding = !1), e.processPacketQueue();
              }));
      }),
      (l.prototype.processPacketQueue = function() {
        if (this.packetBuffer.length > 0 && !this.encoding) {
          var t = this.packetBuffer.shift();
          this.packet(t);
        }
      }),
      (l.prototype.cleanup = function() {
        u('cleanup');
        for (var t = this.subs.length, e = 0; e < t; e++) {
          this.subs.shift().destroy();
        }
        (this.packetBuffer = []), (this.encoding = !1), (this.lastPing = null), this.decoder.destroy();
      }),
      (l.prototype.close = l.prototype.disconnect = function() {
        u('disconnect'),
          (this.skipReconnect = !0),
          (this.reconnecting = !1),
          'opening' === this.readyState && this.cleanup(),
          this.backoff.reset(),
          (this.readyState = 'closed'),
          this.engine && this.engine.close();
      }),
      (l.prototype.onclose = function(t) {
        u('onclose'),
          this.cleanup(),
          this.backoff.reset(),
          (this.readyState = 'closed'),
          this.emit('close', t),
          this._reconnection && !this.skipReconnect && this.reconnect();
      }),
      (l.prototype.reconnect = function() {
        if (this.reconnecting || this.skipReconnect) return this;
        var t = this;
        if (this.backoff.attempts >= this._reconnectionAttempts)
          u('reconnect failed'), this.backoff.reset(), this.emitAll('reconnect_failed'), (this.reconnecting = !1);
        else {
          var e = this.backoff.duration();
          u('will wait %dms before reconnect attempt', e), (this.reconnecting = !0);
          var r = setTimeout(function() {
            t.skipReconnect ||
              (u('attempting reconnect'),
              t.emitAll('reconnect_attempt', t.backoff.attempts),
              t.emitAll('reconnecting', t.backoff.attempts),
              t.skipReconnect ||
                t.open(function(e) {
                  e
                    ? (u('reconnect attempt error'),
                      (t.reconnecting = !1),
                      t.reconnect(),
                      t.emitAll('reconnect_error', e.data))
                    : (u('reconnect success'), t.onreconnect());
                }));
          }, e);
          this.subs.push({
            destroy: function() {
              clearTimeout(r);
            },
          });
        }
      }),
      (l.prototype.onreconnect = function() {
        var t = this.backoff.attempts;
        (this.reconnecting = !1), this.backoff.reset(), this.updateSocketIds(), this.emitAll('reconnect', t);
      });
  },
  function(t, e, r) {
    var n = r(10),
      o = r(38),
      i = r(47),
      s = r(48);
    (e.polling = function(t) {
      var e = !1,
        r = !1,
        s = !1 !== t.jsonp;
      if ('undefined' != typeof location) {
        var a = 'https:' === location.protocol,
          c = location.port;
        c || (c = a ? 443 : 80), (e = t.hostname !== location.hostname || c !== t.port), (r = t.secure !== a);
      }
      if (((t.xdomain = e), (t.xscheme = r), 'open' in new n(t) && !t.forceJSONP)) return new o(t);
      if (!s) throw new Error('JSONP disabled');
      return new i(t);
    }),
      (e.websocket = s);
  },
  function(t, e, r) {
    var n = r(11),
      o = r(3),
      i = r(1),
      s = r(4),
      a = r(20),
      c = r(5)('engine.io-client:polling');
    t.exports = f;
    var u = null != new (r(10))({ xdomain: !1 }).responseType;
    function f(t) {
      var e = t && t.forceBase64;
      (u && !e) || (this.supportsBinary = !1), n.call(this, t);
    }
    s(f, n),
      (f.prototype.name = 'polling'),
      (f.prototype.doOpen = function() {
        this.poll();
      }),
      (f.prototype.pause = function(t) {
        var e = this;
        function r() {
          c('paused'), (e.readyState = 'paused'), t();
        }
        if (((this.readyState = 'pausing'), this.polling || !this.writable)) {
          var n = 0;
          this.polling &&
            (c('we are currently polling - waiting to pause'),
            n++,
            this.once('pollComplete', function() {
              c('pre-pause polling complete'), --n || r();
            })),
            this.writable ||
              (c('we are currently writing - waiting to pause'),
              n++,
              this.once('drain', function() {
                c('pre-pause writing complete'), --n || r();
              }));
        } else r();
      }),
      (f.prototype.poll = function() {
        c('polling'), (this.polling = !0), this.doPoll(), this.emit('poll');
      }),
      (f.prototype.onData = function(t) {
        var e = this;
        c('polling got data %s', t);
        i.decodePayload(t, this.socket.binaryType, function(t, r, n) {
          if (('opening' === e.readyState && e.onOpen(), 'close' === t.type)) return e.onClose(), !1;
          e.onPacket(t);
        }),
          'closed' !== this.readyState &&
            ((this.polling = !1),
            this.emit('pollComplete'),
            'open' === this.readyState ? this.poll() : c('ignoring poll - transport state "%s"', this.readyState));
      }),
      (f.prototype.doClose = function() {
        var t = this;
        function e() {
          c('writing close packet'), t.write([{ type: 'close' }]);
        }
        'open' === this.readyState
          ? (c('transport open - closing'), e())
          : (c('transport not open - deferring close'), this.once('open', e));
      }),
      (f.prototype.write = function(t) {
        var e = this;
        this.writable = !1;
        var r = function() {
          (e.writable = !0), e.emit('drain');
        };
        i.encodePayload(t, this.supportsBinary, function(t) {
          e.doWrite(t, r);
        });
      }),
      (f.prototype.uri = function() {
        var t = this.query || {},
          e = this.secure ? 'https' : 'http',
          r = '';
        return (
          !1 !== this.timestampRequests && (t[this.timestampParam] = a()),
          this.supportsBinary || t.sid || (t.b64 = 1),
          (t = o.encode(t)),
          this.port &&
            (('https' === e && 443 !== Number(this.port)) || ('http' === e && 80 !== Number(this.port))) &&
            (r = ':' + this.port),
          t.length && (t = '?' + t),
          e + '://' + (-1 !== this.hostname.indexOf(':') ? '[' + this.hostname + ']' : this.hostname) + r + this.path + t
        );
      });
  },
  function(t, e, r) {
    (function(e) {
      var n = r(40),
        o = Object.prototype.toString,
        i = 'function' == typeof Blob || ('undefined' != typeof Blob && '[object BlobConstructor]' === o.call(Blob)),
        s = 'function' == typeof File || ('undefined' != typeof File && '[object FileConstructor]' === o.call(File));
      t.exports = function t(r) {
        if (!r || 'object' != typeof r) return !1;
        if (n(r)) {
          for (var o = 0, a = r.length; o < a; o++) if (t(r[o])) return !0;
          return !1;
        }
        if (
          ('function' == typeof e && e.isBuffer && e.isBuffer(r)) ||
          ('function' == typeof ArrayBuffer && r instanceof ArrayBuffer) ||
          (i && r instanceof Blob) ||
          (s && r instanceof File)
        )
          return !0;
        if (r.toJSON && 'function' == typeof r.toJSON && 1 === arguments.length) return t(r.toJSON(), !0);
        for (var c in r) if (Object.prototype.hasOwnProperty.call(r, c) && t(r[c])) return !0;
        return !1;
      };
    }.call(this, r(9).Buffer));
  },
  function(t, e, r) {
    'use strict';
    var n,
      o = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
      i = 64,
      s = {},
      a = 0,
      c = 0;
    function u(t) {
      var e = '';
      do {
        (e = o[t % i] + e), (t = Math.floor(t / i));
      } while (t > 0);
      return e;
    }
    function f() {
      var t = u(+new Date());
      return t !== n ? ((a = 0), (n = t)) : t + '.' + u(a++);
    }
    for (; c < i; c++) s[o[c]] = c;
    (f.encode = u),
      (f.decode = function(t) {
        var e = 0;
        for (c = 0; c < t.length; c++) e = e * i + s[t.charAt(c)];
        return e;
      }),
      (t.exports = f);
  },
  function(t, e) {
    var r = [].indexOf;
    t.exports = function(t, e) {
      if (r) return t.indexOf(e);
      for (var n = 0; n < t.length; ++n) if (t[n] === e) return n;
      return -1;
    };
  },
  function(t, e, r) {
    var n = r(8),
      o = r(0),
      i = r(50),
      s = r(23),
      a = r(24),
      c = r(2)('socket.io-client:socket'),
      u = r(3),
      f = r(19);
    t.exports = l;
    var h = {
        connect: 1,
        connect_error: 1,
        connect_timeout: 1,
        connecting: 1,
        disconnect: 1,
        error: 1,
        reconnect: 1,
        reconnect_attempt: 1,
        reconnect_failed: 1,
        reconnect_error: 1,
        reconnecting: 1,
        ping: 1,
        pong: 1,
      },
      p = o.prototype.emit;
    function l(t, e, r) {
      (this.io = t),
        (this.nsp = e),
        (this.json = this),
        (this.ids = 0),
        (this.acks = {}),
        (this.receiveBuffer = []),
        (this.sendBuffer = []),
        (this.connected = !1),
        (this.disconnected = !0),
        (this.flags = {}),
        r && r.query && (this.query = r.query),
        this.io.autoConnect && this.open();
    }
    o(l.prototype),
      (l.prototype.subEvents = function() {
        if (!this.subs) {
          var t = this.io;
          this.subs = [
            s(t, 'open', a(this, 'onopen')),
            s(t, 'packet', a(this, 'onpacket')),
            s(t, 'close', a(this, 'onclose')),
          ];
        }
      }),
      (l.prototype.open = l.prototype.connect = function() {
        return this.connected
          ? this
          : (this.subEvents(),
            this.io.open(),
            'open' === this.io.readyState && this.onopen(),
            this.emit('connecting'),
            this);
      }),
      (l.prototype.send = function() {
        var t = i(arguments);
        return t.unshift('message'), this.emit.apply(this, t), this;
      }),
      (l.prototype.emit = function(t) {
        if (h.hasOwnProperty(t)) return p.apply(this, arguments), this;
        var e = i(arguments),
          r = {
            type: (void 0 !== this.flags.binary ? this.flags.binary : f(e)) ? n.BINARY_EVENT : n.EVENT,
            data: e,
            options: {},
          };
        return (
          (r.options.compress = !this.flags || !1 !== this.flags.compress),
          'function' == typeof e[e.length - 1] &&
            (c('emitting packet with ack id %d', this.ids), (this.acks[this.ids] = e.pop()), (r.id = this.ids++)),
          this.connected ? this.packet(r) : this.sendBuffer.push(r),
          (this.flags = {}),
          this
        );
      }),
      (l.prototype.packet = function(t) {
        (t.nsp = this.nsp), this.io.packet(t);
      }),
      (l.prototype.onopen = function() {
        if ((c('transport is open - connecting'), '/' !== this.nsp))
          if (this.query) {
            var t = 'object' == typeof this.query ? u.encode(this.query) : this.query;
            c('sending connect packet with query %s', t), this.packet({ type: n.CONNECT, query: t });
          } else this.packet({ type: n.CONNECT });
      }),
      (l.prototype.onclose = function(t) {
        c('close (%s)', t), (this.connected = !1), (this.disconnected = !0), delete this.id, this.emit('disconnect', t);
      }),
      (l.prototype.onpacket = function(t) {
        var e = t.nsp === this.nsp,
          r = t.type === n.ERROR && '/' === t.nsp;
        if (e || r)
          switch (t.type) {
            case n.CONNECT:
              this.onconnect();
              break;
            case n.EVENT:
            case n.BINARY_EVENT:
              this.onevent(t);
              break;
            case n.ACK:
            case n.BINARY_ACK:
              this.onack(t);
              break;
            case n.DISCONNECT:
              this.ondisconnect();
              break;
            case n.ERROR:
              this.emit('error', t.data);
          }
      }),
      (l.prototype.onevent = function(t) {
        var e = t.data || [];
        c('emitting event %j', e),
          null != t.id && (c('attaching ack callback to event'), e.push(this.ack(t.id))),
          this.connected ? p.apply(this, e) : this.receiveBuffer.push(e);
      }),
      (l.prototype.ack = function(t) {
        var e = this,
          r = !1;
        return function() {
          if (!r) {
            r = !0;
            var o = i(arguments);
            c('sending ack %j', o), e.packet({ type: f(o) ? n.BINARY_ACK : n.ACK, id: t, data: o });
          }
        };
      }),
      (l.prototype.onack = function(t) {
        var e = this.acks[t.id];
        'function' == typeof e
          ? (c('calling ack %s with %j', t.id, t.data), e.apply(this, t.data), delete this.acks[t.id])
          : c('bad ack %s', t.id);
      }),
      (l.prototype.onconnect = function() {
        (this.connected = !0), (this.disconnected = !1), this.emit('connect'), this.emitBuffered();
      }),
      (l.prototype.emitBuffered = function() {
        var t;
        for (t = 0; t < this.receiveBuffer.length; t++) p.apply(this, this.receiveBuffer[t]);
        for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
        this.sendBuffer = [];
      }),
      (l.prototype.ondisconnect = function() {
        c('server disconnect (%s)', this.nsp), this.destroy(), this.onclose('io server disconnect');
      }),
      (l.prototype.destroy = function() {
        if (this.subs) {
          for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
          this.subs = null;
        }
        this.io.destroy(this);
      }),
      (l.prototype.close = l.prototype.disconnect = function() {
        return (
          this.connected && (c('performing disconnect (%s)', this.nsp), this.packet({ type: n.DISCONNECT })),
          this.destroy(),
          this.connected && this.onclose('io client disconnect'),
          this
        );
      }),
      (l.prototype.compress = function(t) {
        return (this.flags.compress = t), this;
      }),
      (l.prototype.binary = function(t) {
        return (this.flags.binary = t), this;
      });
  },
  function(t, e) {
    t.exports = function(t, e, r) {
      return (
        t.on(e, r),
        {
          destroy: function() {
            t.removeListener(e, r);
          },
        }
      );
    };
  },
  function(t, e) {
    var r = [].slice;
    t.exports = function(t, e) {
      if (('string' == typeof e && (e = t[e]), 'function' != typeof e)) throw new Error('bind() requires a function');
      var n = r.call(arguments, 2);
      return function() {
        return e.apply(t, n.concat(r.call(arguments)));
      };
    };
  },
  function(t, e, r) {
    'use strict';
    Object.defineProperty(e, '__esModule', { value: !0 });
    var n = r(26)('http://localhost:5000/');
    n.on('message', function(t) {
      console.log(t);
    });
    var o = { up: !1, down: !1, left: !1, right: !1 };
    document.addEventListener('keydown', function(t) {
      switch (t.keyCode) {
        case 65:
          o.left = !0;
          break;
        case 87:
          o.up = !0;
          break;
        case 68:
          o.right = !0;
          break;
        case 83:
          o.down = !0;
      }
    }),
      document.addEventListener('keyup', function(t) {
        switch (t.keyCode) {
          case 65:
            o.left = !1;
            break;
          case 87:
            o.up = !1;
            break;
          case 68:
            o.right = !1;
            break;
          case 83:
            o.down = !1;
        }
      }),
      n.emit('new player'),
      setInterval(function() {
        n.emit('movement', o);
      }, 1e3 / 60);
    var i = document.getElementById('canvas');
    (i.width = 800), (i.height = 600);
    var s = i.getContext('2d');
    (s.font = '20px Georgia'),
      n.on('state', function(t) {
        for (var e in (s.clearRect(0, 0, 800, 600), t)) {
          var r = t[e];
          (s.fillStyle = r.color),
            s.beginPath(),
            s.arc(r.x, r.y, 10, 0, 2 * Math.PI),
            s.fill(),
            s.fillText('x: ' + r.x + ', y: ' + r.y, r.x, r.y);
        }
      });
  },
  function(t, e, r) {
    var n = r(27),
      o = r(8),
      i = r(16),
      s = r(2)('socket.io-client');
    t.exports = e = c;
    var a = (e.managers = {});
    function c(t, e) {
      'object' == typeof t && ((e = t), (t = void 0)), (e = e || {});
      var r,
        o = n(t),
        c = o.source,
        u = o.id,
        f = o.path,
        h = a[u] && f in a[u].nsps;
      return (
        e.forceNew || e['force new connection'] || !1 === e.multiplex || h
          ? (s('ignoring socket cache for %s', c), (r = i(c, e)))
          : (a[u] || (s('new io instance for %s', c), (a[u] = i(c, e))), (r = a[u])),
        o.query && !e.query && (e.query = o.query),
        r.socket(o.path, e)
      );
    }
    (e.protocol = o.protocol), (e.connect = c), (e.Manager = r(16)), (e.Socket = r(22));
  },
  function(t, e, r) {
    var n = r(12),
      o = r(2)('socket.io-client:url');
    t.exports = function(t, e) {
      var r = t;
      (e = e || ('undefined' != typeof location && location)), null == t && (t = e.protocol + '//' + e.host);
      'string' == typeof t &&
        ('/' === t.charAt(0) && (t = '/' === t.charAt(1) ? e.protocol + t : e.host + t),
        /^(https?|wss?):\/\//.test(t) ||
          (o('protocol-less url %s', t), (t = void 0 !== e ? e.protocol + '//' + t : 'https://' + t)),
        o('parse %s', t),
        (r = n(t)));
      r.port || (/^(http|ws)$/.test(r.protocol) ? (r.port = '80') : /^(http|ws)s$/.test(r.protocol) && (r.port = '443'));
      r.path = r.path || '/';
      var i = -1 !== r.host.indexOf(':') ? '[' + r.host + ']' : r.host;
      return (
        (r.id = r.protocol + '://' + i + ':' + r.port),
        (r.href = r.protocol + '://' + i + (e && e.port === r.port ? '' : ':' + r.port)),
        r
      );
    };
  },
  function(t, e, r) {
    function n(t) {
      var r;
      function n() {
        if (n.enabled) {
          var t = n,
            o = +new Date(),
            i = o - (r || o);
          (t.diff = i), (t.prev = r), (t.curr = o), (r = o);
          for (var s = new Array(arguments.length), a = 0; a < s.length; a++) s[a] = arguments[a];
          (s[0] = e.coerce(s[0])), 'string' != typeof s[0] && s.unshift('%O');
          var c = 0;
          (s[0] = s[0].replace(/%([a-zA-Z%])/g, function(r, n) {
            if ('%%' === r) return r;
            c++;
            var o = e.formatters[n];
            if ('function' == typeof o) {
              var i = s[c];
              (r = o.call(t, i)), s.splice(c, 1), c--;
            }
            return r;
          })),
            e.formatArgs.call(t, s),
            (n.log || e.log || console.log.bind(console)).apply(t, s);
        }
      }
      return (
        (n.namespace = t),
        (n.enabled = e.enabled(t)),
        (n.useColors = e.useColors()),
        (n.color = (function(t) {
          var r,
            n = 0;
          for (r in t) (n = (n << 5) - n + t.charCodeAt(r)), (n |= 0);
          return e.colors[Math.abs(n) % e.colors.length];
        })(t)),
        (n.destroy = o),
        'function' == typeof e.init && e.init(n),
        e.instances.push(n),
        n
      );
    }
    function o() {
      var t = e.instances.indexOf(this);
      return -1 !== t && (e.instances.splice(t, 1), !0);
    }
    ((e = t.exports = n.debug = n.default = n).coerce = function(t) {
      return t instanceof Error ? t.stack || t.message : t;
    }),
      (e.disable = function() {
        e.enable('');
      }),
      (e.enable = function(t) {
        var r;
        e.save(t), (e.names = []), (e.skips = []);
        var n = ('string' == typeof t ? t : '').split(/[\s,]+/),
          o = n.length;
        for (r = 0; r < o; r++)
          n[r] &&
            ('-' === (t = n[r].replace(/\*/g, '.*?'))[0]
              ? e.skips.push(new RegExp('^' + t.substr(1) + '$'))
              : e.names.push(new RegExp('^' + t + '$')));
        for (r = 0; r < e.instances.length; r++) {
          var i = e.instances[r];
          i.enabled = e.enabled(i.namespace);
        }
      }),
      (e.enabled = function(t) {
        if ('*' === t[t.length - 1]) return !0;
        var r, n;
        for (r = 0, n = e.skips.length; r < n; r++) if (e.skips[r].test(t)) return !1;
        for (r = 0, n = e.names.length; r < n; r++) if (e.names[r].test(t)) return !0;
        return !1;
      }),
      (e.humanize = r(7)),
      (e.instances = []),
      (e.names = []),
      (e.skips = []),
      (e.formatters = {});
  },
  function(t, e, r) {
    (function(n) {
      function o() {
        var t;
        try {
          t = e.storage.debug;
        } catch (t) {}
        return !t && void 0 !== n && 'env' in n && (t = n.env.DEBUG), t;
      }
      ((e = t.exports = r(30)).log = function() {
        return (
          'object' == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments)
        );
      }),
        (e.formatArgs = function(t) {
          var r = this.useColors;
          if (
            ((t[0] =
              (r ? '%c' : '') +
              this.namespace +
              (r ? ' %c' : ' ') +
              t[0] +
              (r ? '%c ' : ' ') +
              '+' +
              e.humanize(this.diff)),
            !r)
          )
            return;
          var n = 'color: ' + this.color;
          t.splice(1, 0, n, 'color: inherit');
          var o = 0,
            i = 0;
          t[0].replace(/%[a-zA-Z%]/g, function(t) {
            '%%' !== t && (o++, '%c' === t && (i = o));
          }),
            t.splice(i, 0, n);
        }),
        (e.save = function(t) {
          try {
            null == t ? e.storage.removeItem('debug') : (e.storage.debug = t);
          } catch (t) {}
        }),
        (e.load = o),
        (e.useColors = function() {
          if ('undefined' != typeof window && window.process && 'renderer' === window.process.type) return !0;
          if (
            'undefined' != typeof navigator &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)
          )
            return !1;
          return (
            ('undefined' != typeof document &&
              document.documentElement &&
              document.documentElement.style &&
              document.documentElement.style.WebkitAppearance) ||
            ('undefined' != typeof window &&
              window.console &&
              (window.console.firebug || (window.console.exception && window.console.table))) ||
            ('undefined' != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
              parseInt(RegExp.$1, 10) >= 31) ||
            ('undefined' != typeof navigator &&
              navigator.userAgent &&
              navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
          );
        }),
        (e.storage =
          'undefined' != typeof chrome && void 0 !== chrome.storage
            ? chrome.storage.local
            : (function() {
                try {
                  return window.localStorage;
                } catch (t) {}
              })()),
        (e.colors = [
          '#0000CC',
          '#0000FF',
          '#0033CC',
          '#0033FF',
          '#0066CC',
          '#0066FF',
          '#0099CC',
          '#0099FF',
          '#00CC00',
          '#00CC33',
          '#00CC66',
          '#00CC99',
          '#00CCCC',
          '#00CCFF',
          '#3300CC',
          '#3300FF',
          '#3333CC',
          '#3333FF',
          '#3366CC',
          '#3366FF',
          '#3399CC',
          '#3399FF',
          '#33CC00',
          '#33CC33',
          '#33CC66',
          '#33CC99',
          '#33CCCC',
          '#33CCFF',
          '#6600CC',
          '#6600FF',
          '#6633CC',
          '#6633FF',
          '#66CC00',
          '#66CC33',
          '#9900CC',
          '#9900FF',
          '#9933CC',
          '#9933FF',
          '#99CC00',
          '#99CC33',
          '#CC0000',
          '#CC0033',
          '#CC0066',
          '#CC0099',
          '#CC00CC',
          '#CC00FF',
          '#CC3300',
          '#CC3333',
          '#CC3366',
          '#CC3399',
          '#CC33CC',
          '#CC33FF',
          '#CC6600',
          '#CC6633',
          '#CC9900',
          '#CC9933',
          '#CCCC00',
          '#CCCC33',
          '#FF0000',
          '#FF0033',
          '#FF0066',
          '#FF0099',
          '#FF00CC',
          '#FF00FF',
          '#FF3300',
          '#FF3333',
          '#FF3366',
          '#FF3399',
          '#FF33CC',
          '#FF33FF',
          '#FF6600',
          '#FF6633',
          '#FF9900',
          '#FF9933',
          '#FFCC00',
          '#FFCC33',
        ]),
        (e.formatters.j = function(t) {
          try {
            return JSON.stringify(t);
          } catch (t) {
            return '[UnexpectedJSONParseError]: ' + t.message;
          }
        }),
        e.enable(o());
    }.call(this, r(6)));
  },
  function(t, e, r) {
    function n(t) {
      var r;
      function n() {
        if (n.enabled) {
          var t = n,
            o = +new Date(),
            i = o - (r || o);
          (t.diff = i), (t.prev = r), (t.curr = o), (r = o);
          for (var s = new Array(arguments.length), a = 0; a < s.length; a++) s[a] = arguments[a];
          (s[0] = e.coerce(s[0])), 'string' != typeof s[0] && s.unshift('%O');
          var c = 0;
          (s[0] = s[0].replace(/%([a-zA-Z%])/g, function(r, n) {
            if ('%%' === r) return r;
            c++;
            var o = e.formatters[n];
            if ('function' == typeof o) {
              var i = s[c];
              (r = o.call(t, i)), s.splice(c, 1), c--;
            }
            return r;
          })),
            e.formatArgs.call(t, s),
            (n.log || e.log || console.log.bind(console)).apply(t, s);
        }
      }
      return (
        (n.namespace = t),
        (n.enabled = e.enabled(t)),
        (n.useColors = e.useColors()),
        (n.color = (function(t) {
          var r,
            n = 0;
          for (r in t) (n = (n << 5) - n + t.charCodeAt(r)), (n |= 0);
          return e.colors[Math.abs(n) % e.colors.length];
        })(t)),
        (n.destroy = o),
        'function' == typeof e.init && e.init(n),
        e.instances.push(n),
        n
      );
    }
    function o() {
      var t = e.instances.indexOf(this);
      return -1 !== t && (e.instances.splice(t, 1), !0);
    }
    ((e = t.exports = n.debug = n.default = n).coerce = function(t) {
      return t instanceof Error ? t.stack || t.message : t;
    }),
      (e.disable = function() {
        e.enable('');
      }),
      (e.enable = function(t) {
        var r;
        e.save(t), (e.names = []), (e.skips = []);
        var n = ('string' == typeof t ? t : '').split(/[\s,]+/),
          o = n.length;
        for (r = 0; r < o; r++)
          n[r] &&
            ('-' === (t = n[r].replace(/\*/g, '.*?'))[0]
              ? e.skips.push(new RegExp('^' + t.substr(1) + '$'))
              : e.names.push(new RegExp('^' + t + '$')));
        for (r = 0; r < e.instances.length; r++) {
          var i = e.instances[r];
          i.enabled = e.enabled(i.namespace);
        }
      }),
      (e.enabled = function(t) {
        if ('*' === t[t.length - 1]) return !0;
        var r, n;
        for (r = 0, n = e.skips.length; r < n; r++) if (e.skips[r].test(t)) return !1;
        for (r = 0, n = e.names.length; r < n; r++) if (e.names[r].test(t)) return !0;
        return !1;
      }),
      (e.humanize = r(7)),
      (e.instances = []),
      (e.names = []),
      (e.skips = []),
      (e.formatters = {});
  },
  function(t, e, r) {
    var n = r(13),
      o = r(14),
      i = Object.prototype.toString,
      s = 'function' == typeof Blob || ('undefined' != typeof Blob && '[object BlobConstructor]' === i.call(Blob)),
      a = 'function' == typeof File || ('undefined' != typeof File && '[object FileConstructor]' === i.call(File));
    (e.deconstructPacket = function(t) {
      var e = [],
        r = t.data,
        i = t;
      return (
        (i.data = (function t(e, r) {
          if (!e) return e;
          if (o(e)) {
            var i = { _placeholder: !0, num: r.length };
            return r.push(e), i;
          }
          if (n(e)) {
            for (var s = new Array(e.length), a = 0; a < e.length; a++) s[a] = t(e[a], r);
            return s;
          }
          if ('object' == typeof e && !(e instanceof Date)) {
            var s = {};
            for (var c in e) s[c] = t(e[c], r);
            return s;
          }
          return e;
        })(r, e)),
        (i.attachments = e.length),
        { packet: i, buffers: e }
      );
    }),
      (e.reconstructPacket = function(t, e) {
        return (
          (t.data = (function t(e, r) {
            if (!e) return e;
            if (e && e._placeholder) return r[e.num];
            if (n(e)) for (var o = 0; o < e.length; o++) e[o] = t(e[o], r);
            else if ('object' == typeof e) for (var i in e) e[i] = t(e[i], r);
            return e;
          })(t.data, e)),
          (t.attachments = void 0),
          t
        );
      }),
      (e.removeBlobs = function(t, e) {
        var r = 0,
          i = t;
        !(function t(c, u, f) {
          if (!c) return c;
          if ((s && c instanceof Blob) || (a && c instanceof File)) {
            r++;
            var h = new FileReader();
            (h.onload = function() {
              f ? (f[u] = this.result) : (i = this.result), --r || e(i);
            }),
              h.readAsArrayBuffer(c);
          } else if (n(c)) for (var p = 0; p < c.length; p++) t(c[p], p, c);
          else if ('object' == typeof c && !o(c)) for (var l in c) t(c[l], l, c);
        })(i),
          r || e(i);
      });
  },
  function(t, e, r) {
    'use strict';
    (e.byteLength = function(t) {
      var e = u(t),
        r = e[0],
        n = e[1];
      return (3 * (r + n)) / 4 - n;
    }),
      (e.toByteArray = function(t) {
        for (
          var e,
            r = u(t),
            n = r[0],
            s = r[1],
            a = new i(
              (function(t, e, r) {
                return (3 * (e + r)) / 4 - r;
              })(0, n, s)
            ),
            c = 0,
            f = s > 0 ? n - 4 : n,
            h = 0;
          h < f;
          h += 4
        )
          (e =
            (o[t.charCodeAt(h)] << 18) |
            (o[t.charCodeAt(h + 1)] << 12) |
            (o[t.charCodeAt(h + 2)] << 6) |
            o[t.charCodeAt(h + 3)]),
            (a[c++] = (e >> 16) & 255),
            (a[c++] = (e >> 8) & 255),
            (a[c++] = 255 & e);
        2 === s && ((e = (o[t.charCodeAt(h)] << 2) | (o[t.charCodeAt(h + 1)] >> 4)), (a[c++] = 255 & e));
        1 === s &&
          ((e = (o[t.charCodeAt(h)] << 10) | (o[t.charCodeAt(h + 1)] << 4) | (o[t.charCodeAt(h + 2)] >> 2)),
          (a[c++] = (e >> 8) & 255),
          (a[c++] = 255 & e));
        return a;
      }),
      (e.fromByteArray = function(t) {
        for (var e, r = t.length, o = r % 3, i = [], s = 0, a = r - o; s < a; s += 16383)
          i.push(f(t, s, s + 16383 > a ? a : s + 16383));
        1 === o
          ? ((e = t[r - 1]), i.push(n[e >> 2] + n[(e << 4) & 63] + '=='))
          : 2 === o &&
            ((e = (t[r - 2] << 8) + t[r - 1]), i.push(n[e >> 10] + n[(e >> 4) & 63] + n[(e << 2) & 63] + '='));
        return i.join('');
      });
    for (
      var n = [],
        o = [],
        i = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
        s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        a = 0,
        c = s.length;
      a < c;
      ++a
    )
      (n[a] = s[a]), (o[s.charCodeAt(a)] = a);
    function u(t) {
      var e = t.length;
      if (e % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4');
      var r = t.indexOf('=');
      return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)];
    }
    function f(t, e, r) {
      for (var o, i, s = [], a = e; a < r; a += 3)
        (o = ((t[a] << 16) & 16711680) + ((t[a + 1] << 8) & 65280) + (255 & t[a + 2])),
          s.push(n[((i = o) >> 18) & 63] + n[(i >> 12) & 63] + n[(i >> 6) & 63] + n[63 & i]);
      return s.join('');
    }
    (o['-'.charCodeAt(0)] = 62), (o['_'.charCodeAt(0)] = 63);
  },
  function(t, e) {
    (e.read = function(t, e, r, n, o) {
      var i,
        s,
        a = 8 * o - n - 1,
        c = (1 << a) - 1,
        u = c >> 1,
        f = -7,
        h = r ? o - 1 : 0,
        p = r ? -1 : 1,
        l = t[e + h];
      for (h += p, i = l & ((1 << -f) - 1), l >>= -f, f += a; f > 0; i = 256 * i + t[e + h], h += p, f -= 8);
      for (s = i & ((1 << -f) - 1), i >>= -f, f += n; f > 0; s = 256 * s + t[e + h], h += p, f -= 8);
      if (0 === i) i = 1 - u;
      else {
        if (i === c) return s ? NaN : (1 / 0) * (l ? -1 : 1);
        (s += Math.pow(2, n)), (i -= u);
      }
      return (l ? -1 : 1) * s * Math.pow(2, i - n);
    }),
      (e.write = function(t, e, r, n, o, i) {
        var s,
          a,
          c,
          u = 8 * i - o - 1,
          f = (1 << u) - 1,
          h = f >> 1,
          p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          l = n ? 0 : i - 1,
          d = n ? 1 : -1,
          y = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
        for (
          e = Math.abs(e),
            isNaN(e) || e === 1 / 0
              ? ((a = isNaN(e) ? 1 : 0), (s = f))
              : ((s = Math.floor(Math.log(e) / Math.LN2)),
                e * (c = Math.pow(2, -s)) < 1 && (s--, (c *= 2)),
                (e += s + h >= 1 ? p / c : p * Math.pow(2, 1 - h)) * c >= 2 && (s++, (c /= 2)),
                s + h >= f
                  ? ((a = 0), (s = f))
                  : s + h >= 1
                  ? ((a = (e * c - 1) * Math.pow(2, o)), (s += h))
                  : ((a = e * Math.pow(2, h - 1) * Math.pow(2, o)), (s = 0)));
          o >= 8;
          t[r + l] = 255 & a, l += d, a /= 256, o -= 8
        );
        for (s = (s << o) | a, u += o; u > 0; t[r + l] = 255 & s, l += d, s /= 256, u -= 8);
        t[r + l - d] |= 128 * y;
      });
  },
  function(t, e) {
    var r = {}.toString;
    t.exports =
      Array.isArray ||
      function(t) {
        return '[object Array]' == r.call(t);
      };
  },
  function(t, e, r) {
    (t.exports = r(36)), (t.exports.parser = r(1));
  },
  function(t, e, r) {
    var n = r(17),
      o = r(0),
      i = r(5)('engine.io-client:socket'),
      s = r(21),
      a = r(1),
      c = r(12),
      u = r(3);
    function f(t, e) {
      if (!(this instanceof f)) return new f(t, e);
      (e = e || {}),
        t && 'object' == typeof t && ((e = t), (t = null)),
        t
          ? ((t = c(t)),
            (e.hostname = t.host),
            (e.secure = 'https' === t.protocol || 'wss' === t.protocol),
            (e.port = t.port),
            t.query && (e.query = t.query))
          : e.host && (e.hostname = c(e.host).host),
        (this.secure = null != e.secure ? e.secure : 'undefined' != typeof location && 'https:' === location.protocol),
        e.hostname && !e.port && (e.port = this.secure ? '443' : '80'),
        (this.agent = e.agent || !1),
        (this.hostname = e.hostname || ('undefined' != typeof location ? location.hostname : 'localhost')),
        (this.port =
          e.port || ('undefined' != typeof location && location.port ? location.port : this.secure ? 443 : 80)),
        (this.query = e.query || {}),
        'string' == typeof this.query && (this.query = u.decode(this.query)),
        (this.upgrade = !1 !== e.upgrade),
        (this.path = (e.path || '/engine.io').replace(/\/$/, '') + '/'),
        (this.forceJSONP = !!e.forceJSONP),
        (this.jsonp = !1 !== e.jsonp),
        (this.forceBase64 = !!e.forceBase64),
        (this.enablesXDR = !!e.enablesXDR),
        (this.timestampParam = e.timestampParam || 't'),
        (this.timestampRequests = e.timestampRequests),
        (this.transports = e.transports || ['polling', 'websocket']),
        (this.transportOptions = e.transportOptions || {}),
        (this.readyState = ''),
        (this.writeBuffer = []),
        (this.prevBufferLen = 0),
        (this.policyPort = e.policyPort || 843),
        (this.rememberUpgrade = e.rememberUpgrade || !1),
        (this.binaryType = null),
        (this.onlyBinaryUpgrades = e.onlyBinaryUpgrades),
        (this.perMessageDeflate = !1 !== e.perMessageDeflate && (e.perMessageDeflate || {})),
        !0 === this.perMessageDeflate && (this.perMessageDeflate = {}),
        this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024),
        (this.pfx = e.pfx || null),
        (this.key = e.key || null),
        (this.passphrase = e.passphrase || null),
        (this.cert = e.cert || null),
        (this.ca = e.ca || null),
        (this.ciphers = e.ciphers || null),
        (this.rejectUnauthorized = void 0 === e.rejectUnauthorized || e.rejectUnauthorized),
        (this.forceNode = !!e.forceNode),
        (this.isReactNative =
          'undefined' != typeof navigator &&
          'string' == typeof navigator.product &&
          'reactnative' === navigator.product.toLowerCase()),
        ('undefined' == typeof self || this.isReactNative) &&
          (e.extraHeaders && Object.keys(e.extraHeaders).length > 0 && (this.extraHeaders = e.extraHeaders),
          e.localAddress && (this.localAddress = e.localAddress)),
        (this.id = null),
        (this.upgrades = null),
        (this.pingInterval = null),
        (this.pingTimeout = null),
        (this.pingIntervalTimer = null),
        (this.pingTimeoutTimer = null),
        this.open();
    }
    (t.exports = f),
      (f.priorWebsocketSuccess = !1),
      o(f.prototype),
      (f.protocol = a.protocol),
      (f.Socket = f),
      (f.Transport = r(11)),
      (f.transports = r(17)),
      (f.parser = r(1)),
      (f.prototype.createTransport = function(t) {
        i('creating transport "%s"', t);
        var e = (function(t) {
          var e = {};
          for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
          return e;
        })(this.query);
        (e.EIO = a.protocol), (e.transport = t);
        var r = this.transportOptions[t] || {};
        return (
          this.id && (e.sid = this.id),
          new n[t]({
            query: e,
            socket: this,
            agent: r.agent || this.agent,
            hostname: r.hostname || this.hostname,
            port: r.port || this.port,
            secure: r.secure || this.secure,
            path: r.path || this.path,
            forceJSONP: r.forceJSONP || this.forceJSONP,
            jsonp: r.jsonp || this.jsonp,
            forceBase64: r.forceBase64 || this.forceBase64,
            enablesXDR: r.enablesXDR || this.enablesXDR,
            timestampRequests: r.timestampRequests || this.timestampRequests,
            timestampParam: r.timestampParam || this.timestampParam,
            policyPort: r.policyPort || this.policyPort,
            pfx: r.pfx || this.pfx,
            key: r.key || this.key,
            passphrase: r.passphrase || this.passphrase,
            cert: r.cert || this.cert,
            ca: r.ca || this.ca,
            ciphers: r.ciphers || this.ciphers,
            rejectUnauthorized: r.rejectUnauthorized || this.rejectUnauthorized,
            perMessageDeflate: r.perMessageDeflate || this.perMessageDeflate,
            extraHeaders: r.extraHeaders || this.extraHeaders,
            forceNode: r.forceNode || this.forceNode,
            localAddress: r.localAddress || this.localAddress,
            requestTimeout: r.requestTimeout || this.requestTimeout,
            protocols: r.protocols || void 0,
            isReactNative: this.isReactNative,
          })
        );
      }),
      (f.prototype.open = function() {
        var t;
        if (this.rememberUpgrade && f.priorWebsocketSuccess && -1 !== this.transports.indexOf('websocket'))
          t = 'websocket';
        else {
          if (0 === this.transports.length) {
            var e = this;
            return void setTimeout(function() {
              e.emit('error', 'No transports available');
            }, 0);
          }
          t = this.transports[0];
        }
        this.readyState = 'opening';
        try {
          t = this.createTransport(t);
        } catch (t) {
          return this.transports.shift(), void this.open();
        }
        t.open(), this.setTransport(t);
      }),
      (f.prototype.setTransport = function(t) {
        i('setting transport %s', t.name);
        var e = this;
        this.transport &&
          (i('clearing existing transport %s', this.transport.name), this.transport.removeAllListeners()),
          (this.transport = t),
          t
            .on('drain', function() {
              e.onDrain();
            })
            .on('packet', function(t) {
              e.onPacket(t);
            })
            .on('error', function(t) {
              e.onError(t);
            })
            .on('close', function() {
              e.onClose('transport close');
            });
      }),
      (f.prototype.probe = function(t) {
        i('probing transport "%s"', t);
        var e = this.createTransport(t, { probe: 1 }),
          r = !1,
          n = this;
        function o() {
          if (n.onlyBinaryUpgrades) {
            var o = !this.supportsBinary && n.transport.supportsBinary;
            r = r || o;
          }
          r ||
            (i('probe transport "%s" opened', t),
            e.send([{ type: 'ping', data: 'probe' }]),
            e.once('packet', function(o) {
              if (!r)
                if ('pong' === o.type && 'probe' === o.data) {
                  if ((i('probe transport "%s" pong', t), (n.upgrading = !0), n.emit('upgrading', e), !e)) return;
                  (f.priorWebsocketSuccess = 'websocket' === e.name),
                    i('pausing current transport "%s"', n.transport.name),
                    n.transport.pause(function() {
                      r ||
                        ('closed' !== n.readyState &&
                          (i('changing transport and sending upgrade packet'),
                          p(),
                          n.setTransport(e),
                          e.send([{ type: 'upgrade' }]),
                          n.emit('upgrade', e),
                          (e = null),
                          (n.upgrading = !1),
                          n.flush()));
                    });
                } else {
                  i('probe transport "%s" failed', t);
                  var s = new Error('probe error');
                  (s.transport = e.name), n.emit('upgradeError', s);
                }
            }));
        }
        function s() {
          r || ((r = !0), p(), e.close(), (e = null));
        }
        function a(r) {
          var o = new Error('probe error: ' + r);
          (o.transport = e.name),
            s(),
            i('probe transport "%s" failed because of error: %s', t, r),
            n.emit('upgradeError', o);
        }
        function c() {
          a('transport closed');
        }
        function u() {
          a('socket closed');
        }
        function h(t) {
          e && t.name !== e.name && (i('"%s" works - aborting "%s"', t.name, e.name), s());
        }
        function p() {
          e.removeListener('open', o),
            e.removeListener('error', a),
            e.removeListener('close', c),
            n.removeListener('close', u),
            n.removeListener('upgrading', h);
        }
        (f.priorWebsocketSuccess = !1),
          e.once('open', o),
          e.once('error', a),
          e.once('close', c),
          this.once('close', u),
          this.once('upgrading', h),
          e.open();
      }),
      (f.prototype.onOpen = function() {
        if (
          (i('socket open'),
          (this.readyState = 'open'),
          (f.priorWebsocketSuccess = 'websocket' === this.transport.name),
          this.emit('open'),
          this.flush(),
          'open' === this.readyState && this.upgrade && this.transport.pause)
        ) {
          i('starting upgrade probes');
          for (var t = 0, e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t]);
        }
      }),
      (f.prototype.onPacket = function(t) {
        if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState)
          switch (
            (i('socket receive: type "%s", data "%s"', t.type, t.data),
            this.emit('packet', t),
            this.emit('heartbeat'),
            t.type)
          ) {
            case 'open':
              this.onHandshake(JSON.parse(t.data));
              break;
            case 'pong':
              this.setPing(), this.emit('pong');
              break;
            case 'error':
              var e = new Error('server error');
              (e.code = t.data), this.onError(e);
              break;
            case 'message':
              this.emit('data', t.data), this.emit('message', t.data);
          }
        else i('packet received with socket readyState "%s"', this.readyState);
      }),
      (f.prototype.onHandshake = function(t) {
        this.emit('handshake', t),
          (this.id = t.sid),
          (this.transport.query.sid = t.sid),
          (this.upgrades = this.filterUpgrades(t.upgrades)),
          (this.pingInterval = t.pingInterval),
          (this.pingTimeout = t.pingTimeout),
          this.onOpen(),
          'closed' !== this.readyState &&
            (this.setPing(), this.removeListener('heartbeat', this.onHeartbeat), this.on('heartbeat', this.onHeartbeat));
      }),
      (f.prototype.onHeartbeat = function(t) {
        clearTimeout(this.pingTimeoutTimer);
        var e = this;
        e.pingTimeoutTimer = setTimeout(function() {
          'closed' !== e.readyState && e.onClose('ping timeout');
        }, t || e.pingInterval + e.pingTimeout);
      }),
      (f.prototype.setPing = function() {
        var t = this;
        clearTimeout(t.pingIntervalTimer),
          (t.pingIntervalTimer = setTimeout(function() {
            i('writing ping packet - expecting pong within %sms', t.pingTimeout), t.ping(), t.onHeartbeat(t.pingTimeout);
          }, t.pingInterval));
      }),
      (f.prototype.ping = function() {
        var t = this;
        this.sendPacket('ping', function() {
          t.emit('ping');
        });
      }),
      (f.prototype.onDrain = function() {
        this.writeBuffer.splice(0, this.prevBufferLen),
          (this.prevBufferLen = 0),
          0 === this.writeBuffer.length ? this.emit('drain') : this.flush();
      }),
      (f.prototype.flush = function() {
        'closed' !== this.readyState &&
          this.transport.writable &&
          !this.upgrading &&
          this.writeBuffer.length &&
          (i('flushing %d packets in socket', this.writeBuffer.length),
          this.transport.send(this.writeBuffer),
          (this.prevBufferLen = this.writeBuffer.length),
          this.emit('flush'));
      }),
      (f.prototype.write = f.prototype.send = function(t, e, r) {
        return this.sendPacket('message', t, e, r), this;
      }),
      (f.prototype.sendPacket = function(t, e, r, n) {
        if (
          ('function' == typeof e && ((n = e), (e = void 0)),
          'function' == typeof r && ((n = r), (r = null)),
          'closing' !== this.readyState && 'closed' !== this.readyState)
        ) {
          (r = r || {}).compress = !1 !== r.compress;
          var o = { type: t, data: e, options: r };
          this.emit('packetCreate', o), this.writeBuffer.push(o), n && this.once('flush', n), this.flush();
        }
      }),
      (f.prototype.close = function() {
        if ('opening' === this.readyState || 'open' === this.readyState) {
          this.readyState = 'closing';
          var t = this;
          this.writeBuffer.length
            ? this.once('drain', function() {
                this.upgrading ? n() : e();
              })
            : this.upgrading
            ? n()
            : e();
        }
        function e() {
          t.onClose('forced close'), i('socket closing - telling transport to close'), t.transport.close();
        }
        function r() {
          t.removeListener('upgrade', r), t.removeListener('upgradeError', r), e();
        }
        function n() {
          t.once('upgrade', r), t.once('upgradeError', r);
        }
        return this;
      }),
      (f.prototype.onError = function(t) {
        i('socket error %j', t),
          (f.priorWebsocketSuccess = !1),
          this.emit('error', t),
          this.onClose('transport error', t);
      }),
      (f.prototype.onClose = function(t, e) {
        if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
          i('socket close with reason: "%s"', t);
          clearTimeout(this.pingIntervalTimer),
            clearTimeout(this.pingTimeoutTimer),
            this.transport.removeAllListeners('close'),
            this.transport.close(),
            this.transport.removeAllListeners(),
            (this.readyState = 'closed'),
            (this.id = null),
            this.emit('close', t, e),
            (this.writeBuffer = []),
            (this.prevBufferLen = 0);
        }
      }),
      (f.prototype.filterUpgrades = function(t) {
        for (var e = [], r = 0, n = t.length; r < n; r++) ~s(this.transports, t[r]) && e.push(t[r]);
        return e;
      });
  },
  function(t, e) {
    try {
      t.exports = 'undefined' != typeof XMLHttpRequest && 'withCredentials' in new XMLHttpRequest();
    } catch (e) {
      t.exports = !1;
    }
  },
  function(t, e, r) {
    var n = r(10),
      o = r(18),
      i = r(0),
      s = r(4),
      a = r(5)('engine.io-client:polling-xhr');
    function c() {}
    function u(t) {
      if (
        (o.call(this, t),
        (this.requestTimeout = t.requestTimeout),
        (this.extraHeaders = t.extraHeaders),
        'undefined' != typeof location)
      ) {
        var e = 'https:' === location.protocol,
          r = location.port;
        r || (r = e ? 443 : 80),
          (this.xd = ('undefined' != typeof location && t.hostname !== location.hostname) || r !== t.port),
          (this.xs = t.secure !== e);
      }
    }
    function f(t) {
      (this.method = t.method || 'GET'),
        (this.uri = t.uri),
        (this.xd = !!t.xd),
        (this.xs = !!t.xs),
        (this.async = !1 !== t.async),
        (this.data = void 0 !== t.data ? t.data : null),
        (this.agent = t.agent),
        (this.isBinary = t.isBinary),
        (this.supportsBinary = t.supportsBinary),
        (this.enablesXDR = t.enablesXDR),
        (this.requestTimeout = t.requestTimeout),
        (this.pfx = t.pfx),
        (this.key = t.key),
        (this.passphrase = t.passphrase),
        (this.cert = t.cert),
        (this.ca = t.ca),
        (this.ciphers = t.ciphers),
        (this.rejectUnauthorized = t.rejectUnauthorized),
        (this.extraHeaders = t.extraHeaders),
        this.create();
    }
    if (
      ((t.exports = u),
      (t.exports.Request = f),
      s(u, o),
      (u.prototype.supportsBinary = !0),
      (u.prototype.request = function(t) {
        return (
          ((t = t || {}).uri = this.uri()),
          (t.xd = this.xd),
          (t.xs = this.xs),
          (t.agent = this.agent || !1),
          (t.supportsBinary = this.supportsBinary),
          (t.enablesXDR = this.enablesXDR),
          (t.pfx = this.pfx),
          (t.key = this.key),
          (t.passphrase = this.passphrase),
          (t.cert = this.cert),
          (t.ca = this.ca),
          (t.ciphers = this.ciphers),
          (t.rejectUnauthorized = this.rejectUnauthorized),
          (t.requestTimeout = this.requestTimeout),
          (t.extraHeaders = this.extraHeaders),
          new f(t)
        );
      }),
      (u.prototype.doWrite = function(t, e) {
        var r = 'string' != typeof t && void 0 !== t,
          n = this.request({ method: 'POST', data: t, isBinary: r }),
          o = this;
        n.on('success', e),
          n.on('error', function(t) {
            o.onError('xhr post error', t);
          }),
          (this.sendXhr = n);
      }),
      (u.prototype.doPoll = function() {
        a('xhr poll');
        var t = this.request(),
          e = this;
        t.on('data', function(t) {
          e.onData(t);
        }),
          t.on('error', function(t) {
            e.onError('xhr poll error', t);
          }),
          (this.pollXhr = t);
      }),
      i(f.prototype),
      (f.prototype.create = function() {
        var t = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };
        (t.pfx = this.pfx),
          (t.key = this.key),
          (t.passphrase = this.passphrase),
          (t.cert = this.cert),
          (t.ca = this.ca),
          (t.ciphers = this.ciphers),
          (t.rejectUnauthorized = this.rejectUnauthorized);
        var e = (this.xhr = new n(t)),
          r = this;
        try {
          a('xhr open %s: %s', this.method, this.uri), e.open(this.method, this.uri, this.async);
          try {
            if (this.extraHeaders)
              for (var o in (e.setDisableHeaderCheck && e.setDisableHeaderCheck(!0), this.extraHeaders))
                this.extraHeaders.hasOwnProperty(o) && e.setRequestHeader(o, this.extraHeaders[o]);
          } catch (t) {}
          if ('POST' === this.method)
            try {
              this.isBinary
                ? e.setRequestHeader('Content-type', 'application/octet-stream')
                : e.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
            } catch (t) {}
          try {
            e.setRequestHeader('Accept', '*/*');
          } catch (t) {}
          'withCredentials' in e && (e.withCredentials = !0),
            this.requestTimeout && (e.timeout = this.requestTimeout),
            this.hasXDR()
              ? ((e.onload = function() {
                  r.onLoad();
                }),
                (e.onerror = function() {
                  r.onError(e.responseText);
                }))
              : (e.onreadystatechange = function() {
                  if (2 === e.readyState)
                    try {
                      var t = e.getResponseHeader('Content-Type');
                      r.supportsBinary && 'application/octet-stream' === t && (e.responseType = 'arraybuffer');
                    } catch (t) {}
                  4 === e.readyState &&
                    (200 === e.status || 1223 === e.status
                      ? r.onLoad()
                      : setTimeout(function() {
                          r.onError(e.status);
                        }, 0));
                }),
            a('xhr data %s', this.data),
            e.send(this.data);
        } catch (t) {
          return void setTimeout(function() {
            r.onError(t);
          }, 0);
        }
        'undefined' != typeof document && ((this.index = f.requestsCount++), (f.requests[this.index] = this));
      }),
      (f.prototype.onSuccess = function() {
        this.emit('success'), this.cleanup();
      }),
      (f.prototype.onData = function(t) {
        this.emit('data', t), this.onSuccess();
      }),
      (f.prototype.onError = function(t) {
        this.emit('error', t), this.cleanup(!0);
      }),
      (f.prototype.cleanup = function(t) {
        if (void 0 !== this.xhr && null !== this.xhr) {
          if ((this.hasXDR() ? (this.xhr.onload = this.xhr.onerror = c) : (this.xhr.onreadystatechange = c), t))
            try {
              this.xhr.abort();
            } catch (t) {}
          'undefined' != typeof document && delete f.requests[this.index], (this.xhr = null);
        }
      }),
      (f.prototype.onLoad = function() {
        var t;
        try {
          var e;
          try {
            e = this.xhr.getResponseHeader('Content-Type');
          } catch (t) {}
          t = ('application/octet-stream' === e && this.xhr.response) || this.xhr.responseText;
        } catch (t) {
          this.onError(t);
        }
        null != t && this.onData(t);
      }),
      (f.prototype.hasXDR = function() {
        return 'undefined' != typeof XDomainRequest && !this.xs && this.enablesXDR;
      }),
      (f.prototype.abort = function() {
        this.cleanup();
      }),
      (f.requestsCount = 0),
      (f.requests = {}),
      'undefined' != typeof document)
    )
      if ('function' == typeof attachEvent) attachEvent('onunload', p);
      else if ('function' == typeof addEventListener) {
        var h = 'onpagehide' in self ? 'pagehide' : 'unload';
        addEventListener(h, p, !1);
      }
    function p() {
      for (var t in f.requests) f.requests.hasOwnProperty(t) && f.requests[t].abort();
    }
  },
  function(t, e) {
    t.exports =
      Object.keys ||
      function(t) {
        var e = [],
          r = Object.prototype.hasOwnProperty;
        for (var n in t) r.call(t, n) && e.push(n);
        return e;
      };
  },
  function(t, e) {
    var r = {}.toString;
    t.exports =
      Array.isArray ||
      function(t) {
        return '[object Array]' == r.call(t);
      };
  },
  function(t, e) {
    t.exports = function(t, e, r) {
      var n = t.byteLength;
      if (((e = e || 0), (r = r || n), t.slice)) return t.slice(e, r);
      if ((e < 0 && (e += n), r < 0 && (r += n), r > n && (r = n), e >= n || e >= r || 0 === n))
        return new ArrayBuffer(0);
      for (var o = new Uint8Array(t), i = new Uint8Array(r - e), s = e, a = 0; s < r; s++, a++) i[a] = o[s];
      return i.buffer;
    };
  },
  function(t, e) {
    function r() {}
    t.exports = function(t, e, n) {
      var o = !1;
      return (n = n || r), (i.count = t), 0 === t ? e() : i;
      function i(t, r) {
        if (i.count <= 0) throw new Error('after called too many times');
        --i.count, t ? ((o = !0), e(t), (e = n)) : 0 !== i.count || o || e(null, r);
      }
    };
  },
  function(t, e) {
    /*! https://mths.be/utf8js v2.1.2 by @mathias */
    var r,
      n,
      o,
      i = String.fromCharCode;
    function s(t) {
      for (var e, r, n = [], o = 0, i = t.length; o < i; )
        (e = t.charCodeAt(o++)) >= 55296 && e <= 56319 && o < i
          ? 56320 == (64512 & (r = t.charCodeAt(o++)))
            ? n.push(((1023 & e) << 10) + (1023 & r) + 65536)
            : (n.push(e), o--)
          : n.push(e);
      return n;
    }
    function a(t, e) {
      if (t >= 55296 && t <= 57343) {
        if (e) throw Error('Lone surrogate U+' + t.toString(16).toUpperCase() + ' is not a scalar value');
        return !1;
      }
      return !0;
    }
    function c(t, e) {
      return i(((t >> e) & 63) | 128);
    }
    function u(t, e) {
      if (0 == (4294967168 & t)) return i(t);
      var r = '';
      return (
        0 == (4294965248 & t)
          ? (r = i(((t >> 6) & 31) | 192))
          : 0 == (4294901760 & t)
          ? (a(t, e) || (t = 65533), (r = i(((t >> 12) & 15) | 224)), (r += c(t, 6)))
          : 0 == (4292870144 & t) && ((r = i(((t >> 18) & 7) | 240)), (r += c(t, 12)), (r += c(t, 6))),
        (r += i((63 & t) | 128))
      );
    }
    function f() {
      if (o >= n) throw Error('Invalid byte index');
      var t = 255 & r[o];
      if ((o++, 128 == (192 & t))) return 63 & t;
      throw Error('Invalid continuation byte');
    }
    function h(t) {
      var e, i;
      if (o > n) throw Error('Invalid byte index');
      if (o == n) return !1;
      if (((e = 255 & r[o]), o++, 0 == (128 & e))) return e;
      if (192 == (224 & e)) {
        if ((i = ((31 & e) << 6) | f()) >= 128) return i;
        throw Error('Invalid continuation byte');
      }
      if (224 == (240 & e)) {
        if ((i = ((15 & e) << 12) | (f() << 6) | f()) >= 2048) return a(i, t) ? i : 65533;
        throw Error('Invalid continuation byte');
      }
      if (240 == (248 & e) && (i = ((7 & e) << 18) | (f() << 12) | (f() << 6) | f()) >= 65536 && i <= 1114111) return i;
      throw Error('Invalid UTF-8 detected');
    }
    t.exports = {
      version: '2.1.2',
      encode: function(t, e) {
        for (var r = !1 !== (e = e || {}).strict, n = s(t), o = n.length, i = -1, a = ''; ++i < o; ) a += u(n[i], r);
        return a;
      },
      decode: function(t, e) {
        var a = !1 !== (e = e || {}).strict;
        (r = s(t)), (n = r.length), (o = 0);
        for (var c, u = []; !1 !== (c = h(a)); ) u.push(c);
        return (function(t) {
          for (var e, r = t.length, n = -1, o = ''; ++n < r; )
            (e = t[n]) > 65535 && ((o += i((((e -= 65536) >>> 10) & 1023) | 55296)), (e = 56320 | (1023 & e))),
              (o += i(e));
          return o;
        })(u);
      },
    };
  },
  function(t, e) {
    !(function() {
      'use strict';
      for (
        var t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', r = new Uint8Array(256), n = 0;
        n < t.length;
        n++
      )
        r[t.charCodeAt(n)] = n;
      (e.encode = function(e) {
        var r,
          n = new Uint8Array(e),
          o = n.length,
          i = '';
        for (r = 0; r < o; r += 3)
          (i += t[n[r] >> 2]),
            (i += t[((3 & n[r]) << 4) | (n[r + 1] >> 4)]),
            (i += t[((15 & n[r + 1]) << 2) | (n[r + 2] >> 6)]),
            (i += t[63 & n[r + 2]]);
        return (
          o % 3 == 2
            ? (i = i.substring(0, i.length - 1) + '=')
            : o % 3 == 1 && (i = i.substring(0, i.length - 2) + '=='),
          i
        );
      }),
        (e.decode = function(t) {
          var e,
            n,
            o,
            i,
            s,
            a = 0.75 * t.length,
            c = t.length,
            u = 0;
          '=' === t[t.length - 1] && (a--, '=' === t[t.length - 2] && a--);
          var f = new ArrayBuffer(a),
            h = new Uint8Array(f);
          for (e = 0; e < c; e += 4)
            (n = r[t.charCodeAt(e)]),
              (o = r[t.charCodeAt(e + 1)]),
              (i = r[t.charCodeAt(e + 2)]),
              (s = r[t.charCodeAt(e + 3)]),
              (h[u++] = (n << 2) | (o >> 4)),
              (h[u++] = ((15 & o) << 4) | (i >> 2)),
              (h[u++] = ((3 & i) << 6) | (63 & s));
          return f;
        });
    })();
  },
  function(t, e) {
    var r =
        void 0 !== r
          ? r
          : 'undefined' != typeof WebKitBlobBuilder
          ? WebKitBlobBuilder
          : 'undefined' != typeof MSBlobBuilder
          ? MSBlobBuilder
          : 'undefined' != typeof MozBlobBuilder && MozBlobBuilder,
      n = (function() {
        try {
          return 2 === new Blob(['hi']).size;
        } catch (t) {
          return !1;
        }
      })(),
      o =
        n &&
        (function() {
          try {
            return 2 === new Blob([new Uint8Array([1, 2])]).size;
          } catch (t) {
            return !1;
          }
        })(),
      i = r && r.prototype.append && r.prototype.getBlob;
    function s(t) {
      return t.map(function(t) {
        if (t.buffer instanceof ArrayBuffer) {
          var e = t.buffer;
          if (t.byteLength !== e.byteLength) {
            var r = new Uint8Array(t.byteLength);
            r.set(new Uint8Array(e, t.byteOffset, t.byteLength)), (e = r.buffer);
          }
          return e;
        }
        return t;
      });
    }
    function a(t, e) {
      e = e || {};
      var n = new r();
      return (
        s(t).forEach(function(t) {
          n.append(t);
        }),
        e.type ? n.getBlob(e.type) : n.getBlob()
      );
    }
    function c(t, e) {
      return new Blob(s(t), e || {});
    }
    'undefined' != typeof Blob && ((a.prototype = Blob.prototype), (c.prototype = Blob.prototype)),
      (t.exports = n ? (o ? Blob : c) : i ? a : void 0);
  },
  function(t, e, r) {
    function n(t) {
      var r;
      function n() {
        if (n.enabled) {
          var t = n,
            o = +new Date(),
            i = o - (r || o);
          (t.diff = i), (t.prev = r), (t.curr = o), (r = o);
          for (var s = new Array(arguments.length), a = 0; a < s.length; a++) s[a] = arguments[a];
          (s[0] = e.coerce(s[0])), 'string' != typeof s[0] && s.unshift('%O');
          var c = 0;
          (s[0] = s[0].replace(/%([a-zA-Z%])/g, function(r, n) {
            if ('%%' === r) return r;
            c++;
            var o = e.formatters[n];
            if ('function' == typeof o) {
              var i = s[c];
              (r = o.call(t, i)), s.splice(c, 1), c--;
            }
            return r;
          })),
            e.formatArgs.call(t, s),
            (n.log || e.log || console.log.bind(console)).apply(t, s);
        }
      }
      return (
        (n.namespace = t),
        (n.enabled = e.enabled(t)),
        (n.useColors = e.useColors()),
        (n.color = (function(t) {
          var r,
            n = 0;
          for (r in t) (n = (n << 5) - n + t.charCodeAt(r)), (n |= 0);
          return e.colors[Math.abs(n) % e.colors.length];
        })(t)),
        (n.destroy = o),
        'function' == typeof e.init && e.init(n),
        e.instances.push(n),
        n
      );
    }
    function o() {
      var t = e.instances.indexOf(this);
      return -1 !== t && (e.instances.splice(t, 1), !0);
    }
    ((e = t.exports = n.debug = n.default = n).coerce = function(t) {
      return t instanceof Error ? t.stack || t.message : t;
    }),
      (e.disable = function() {
        e.enable('');
      }),
      (e.enable = function(t) {
        var r;
        e.save(t), (e.names = []), (e.skips = []);
        var n = ('string' == typeof t ? t : '').split(/[\s,]+/),
          o = n.length;
        for (r = 0; r < o; r++)
          n[r] &&
            ('-' === (t = n[r].replace(/\*/g, '.*?'))[0]
              ? e.skips.push(new RegExp('^' + t.substr(1) + '$'))
              : e.names.push(new RegExp('^' + t + '$')));
        for (r = 0; r < e.instances.length; r++) {
          var i = e.instances[r];
          i.enabled = e.enabled(i.namespace);
        }
      }),
      (e.enabled = function(t) {
        if ('*' === t[t.length - 1]) return !0;
        var r, n;
        for (r = 0, n = e.skips.length; r < n; r++) if (e.skips[r].test(t)) return !1;
        for (r = 0, n = e.names.length; r < n; r++) if (e.names[r].test(t)) return !0;
        return !1;
      }),
      (e.humanize = r(7)),
      (e.instances = []),
      (e.names = []),
      (e.skips = []),
      (e.formatters = {});
  },
  function(t, e, r) {
    (function(e) {
      var n = r(18),
        o = r(4);
      t.exports = f;
      var i,
        s = /\n/g,
        a = /\\n/g;
      function c() {}
      function u() {
        return 'undefined' != typeof self ? self : 'undefined' != typeof window ? window : void 0 !== e ? e : {};
      }
      function f(t) {
        if ((n.call(this, t), (this.query = this.query || {}), !i)) {
          var e = u();
          i = e.___eio = e.___eio || [];
        }
        this.index = i.length;
        var r = this;
        i.push(function(t) {
          r.onData(t);
        }),
          (this.query.j = this.index),
          'function' == typeof addEventListener &&
            addEventListener(
              'beforeunload',
              function() {
                r.script && (r.script.onerror = c);
              },
              !1
            );
      }
      o(f, n),
        (f.prototype.supportsBinary = !1),
        (f.prototype.doClose = function() {
          this.script && (this.script.parentNode.removeChild(this.script), (this.script = null)),
            this.form && (this.form.parentNode.removeChild(this.form), (this.form = null), (this.iframe = null)),
            n.prototype.doClose.call(this);
        }),
        (f.prototype.doPoll = function() {
          var t = this,
            e = document.createElement('script');
          this.script && (this.script.parentNode.removeChild(this.script), (this.script = null)),
            (e.async = !0),
            (e.src = this.uri()),
            (e.onerror = function(e) {
              t.onError('jsonp poll error', e);
            });
          var r = document.getElementsByTagName('script')[0];
          r ? r.parentNode.insertBefore(e, r) : (document.head || document.body).appendChild(e),
            (this.script = e),
            'undefined' != typeof navigator &&
              /gecko/i.test(navigator.userAgent) &&
              setTimeout(function() {
                var t = document.createElement('iframe');
                document.body.appendChild(t), document.body.removeChild(t);
              }, 100);
        }),
        (f.prototype.doWrite = function(t, e) {
          var r = this;
          if (!this.form) {
            var n,
              o = document.createElement('form'),
              i = document.createElement('textarea'),
              c = (this.iframeId = 'eio_iframe_' + this.index);
            (o.className = 'socketio'),
              (o.style.position = 'absolute'),
              (o.style.top = '-1000px'),
              (o.style.left = '-1000px'),
              (o.target = c),
              (o.method = 'POST'),
              o.setAttribute('accept-charset', 'utf-8'),
              (i.name = 'd'),
              o.appendChild(i),
              document.body.appendChild(o),
              (this.form = o),
              (this.area = i);
          }
          function u() {
            f(), e();
          }
          function f() {
            if (r.iframe)
              try {
                r.form.removeChild(r.iframe);
              } catch (t) {
                r.onError('jsonp polling iframe removal error', t);
              }
            try {
              var t = '<iframe src="javascript:0" name="' + r.iframeId + '">';
              n = document.createElement(t);
            } catch (t) {
              ((n = document.createElement('iframe')).name = r.iframeId), (n.src = 'javascript:0');
            }
            (n.id = r.iframeId), r.form.appendChild(n), (r.iframe = n);
          }
          (this.form.action = this.uri()), f(), (t = t.replace(a, '\\\n')), (this.area.value = t.replace(s, '\\n'));
          try {
            this.form.submit();
          } catch (t) {}
          this.iframe.attachEvent
            ? (this.iframe.onreadystatechange = function() {
                'complete' === r.iframe.readyState && u();
              })
            : (this.iframe.onload = u);
        });
    }.call(this, r(15)));
  },
  function(t, e, r) {
    (function(e) {
      var n,
        o,
        i = r(11),
        s = r(1),
        a = r(3),
        c = r(4),
        u = r(20),
        f = r(5)('engine.io-client:websocket');
      if ('undefined' != typeof WebSocket) n = WebSocket;
      else if ('undefined' != typeof self) n = self.WebSocket || self.MozWebSocket;
      else
        try {
          o = r(49);
        } catch (t) {}
      var h = n || o;
      function p(t) {
        t && t.forceBase64 && (this.supportsBinary = !1),
          (this.perMessageDeflate = t.perMessageDeflate),
          (this.usingBrowserWebSocket = n && !t.forceNode),
          (this.protocols = t.protocols),
          this.usingBrowserWebSocket || (h = o),
          i.call(this, t);
      }
      (t.exports = p),
        c(p, i),
        (p.prototype.name = 'websocket'),
        (p.prototype.supportsBinary = !0),
        (p.prototype.doOpen = function() {
          if (this.check()) {
            var t = this.uri(),
              e = this.protocols,
              r = { agent: this.agent, perMessageDeflate: this.perMessageDeflate };
            (r.pfx = this.pfx),
              (r.key = this.key),
              (r.passphrase = this.passphrase),
              (r.cert = this.cert),
              (r.ca = this.ca),
              (r.ciphers = this.ciphers),
              (r.rejectUnauthorized = this.rejectUnauthorized),
              this.extraHeaders && (r.headers = this.extraHeaders),
              this.localAddress && (r.localAddress = this.localAddress);
            try {
              this.ws =
                this.usingBrowserWebSocket && !this.isReactNative ? (e ? new h(t, e) : new h(t)) : new h(t, e, r);
            } catch (t) {
              return this.emit('error', t);
            }
            void 0 === this.ws.binaryType && (this.supportsBinary = !1),
              this.ws.supports && this.ws.supports.binary
                ? ((this.supportsBinary = !0), (this.ws.binaryType = 'nodebuffer'))
                : (this.ws.binaryType = 'arraybuffer'),
              this.addEventListeners();
          }
        }),
        (p.prototype.addEventListeners = function() {
          var t = this;
          (this.ws.onopen = function() {
            t.onOpen();
          }),
            (this.ws.onclose = function() {
              t.onClose();
            }),
            (this.ws.onmessage = function(e) {
              t.onData(e.data);
            }),
            (this.ws.onerror = function(e) {
              t.onError('websocket error', e);
            });
        }),
        (p.prototype.write = function(t) {
          var r = this;
          this.writable = !1;
          for (var n = t.length, o = 0, i = n; o < i; o++)
            !(function(t) {
              s.encodePacket(t, r.supportsBinary, function(o) {
                if (!r.usingBrowserWebSocket) {
                  var i = {};
                  if ((t.options && (i.compress = t.options.compress), r.perMessageDeflate))
                    ('string' == typeof o ? e.byteLength(o) : o.length) < r.perMessageDeflate.threshold &&
                      (i.compress = !1);
                }
                try {
                  r.usingBrowserWebSocket ? r.ws.send(o) : r.ws.send(o, i);
                } catch (t) {
                  f('websocket closed before onclose event');
                }
                --n || a();
              });
            })(t[o]);
          function a() {
            r.emit('flush'),
              setTimeout(function() {
                (r.writable = !0), r.emit('drain');
              }, 0);
          }
        }),
        (p.prototype.onClose = function() {
          i.prototype.onClose.call(this);
        }),
        (p.prototype.doClose = function() {
          void 0 !== this.ws && this.ws.close();
        }),
        (p.prototype.uri = function() {
          var t = this.query || {},
            e = this.secure ? 'wss' : 'ws',
            r = '';
          return (
            this.port &&
              (('wss' === e && 443 !== Number(this.port)) || ('ws' === e && 80 !== Number(this.port))) &&
              (r = ':' + this.port),
            this.timestampRequests && (t[this.timestampParam] = u()),
            this.supportsBinary || (t.b64 = 1),
            (t = a.encode(t)).length && (t = '?' + t),
            e +
              '://' +
              (-1 !== this.hostname.indexOf(':') ? '[' + this.hostname + ']' : this.hostname) +
              r +
              this.path +
              t
          );
        }),
        (p.prototype.check = function() {
          return !(!h || ('__initialize' in h && this.name === p.prototype.name));
        });
    }.call(this, r(9).Buffer));
  },
  function(t, e) {},
  function(t, e) {
    t.exports = function(t, e) {
      for (var r = [], n = (e = e || 0) || 0; n < t.length; n++) r[n - e] = t[n];
      return r;
    };
  },
  function(t, e) {
    function r(t) {
      (t = t || {}),
        (this.ms = t.min || 100),
        (this.max = t.max || 1e4),
        (this.factor = t.factor || 2),
        (this.jitter = t.jitter > 0 && t.jitter <= 1 ? t.jitter : 0),
        (this.attempts = 0);
    }
    (t.exports = r),
      (r.prototype.duration = function() {
        var t = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
          var e = Math.random(),
            r = Math.floor(e * this.jitter * t);
          t = 0 == (1 & Math.floor(10 * e)) ? t - r : t + r;
        }
        return 0 | Math.min(t, this.max);
      }),
      (r.prototype.reset = function() {
        this.attempts = 0;
      }),
      (r.prototype.setMin = function(t) {
        this.ms = t;
      }),
      (r.prototype.setMax = function(t) {
        this.max = t;
      }),
      (r.prototype.setJitter = function(t) {
        this.jitter = t;
      });
  },
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2xpYi9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFyc2Vxcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWluaGVyaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3htbGh0dHByZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhcnNldXJpL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2lzLWJ1ZmZlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2xpYi9tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3BvbGxpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hhcy1iaW5hcnkyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy95ZWFzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5kZXhvZi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvc29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2xpYi9vbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWJpbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvbGliL3VybC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2JpbmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvc29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXMtY29ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9saWIva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaGFzLWJpbmFyeTIvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FycmF5YnVmZmVyLnNsaWNlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9saWIvdXRmOC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFzZTY0LWFycmF5YnVmZmVyL2xpYi9iYXNlNjQtYXJyYXlidWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jsb2IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9kZWJ1Zy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLWpzb25wLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3dlYnNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG8tYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhY2tvMi9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsIkVtaXR0ZXIiLCJvYmoiLCJtaXhpbiIsIm9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiZm4iLCJ0aGlzIiwiX2NhbGxiYWNrcyIsInB1c2giLCJvbmNlIiwib2ZmIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJyZW1vdmVMaXN0ZW5lciIsInJlbW92ZUFsbExpc3RlbmVycyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJsZW5ndGgiLCJjYiIsImNhbGxiYWNrcyIsInNwbGljZSIsImVtaXQiLCJhcmdzIiwic2xpY2UiLCJsZW4iLCJsaXN0ZW5lcnMiLCJoYXNMaXN0ZW5lcnMiLCJiYXNlNjRlbmNvZGVyIiwia2V5cyIsImhhc0JpbmFyeSIsInNsaWNlQnVmZmVyIiwiYWZ0ZXIiLCJ1dGY4IiwiQXJyYXlCdWZmZXIiLCJpc0FuZHJvaWQiLCJuYXZpZ2F0b3IiLCJ0ZXN0IiwidXNlckFnZW50IiwiaXNQaGFudG9tSlMiLCJkb250U2VuZEJsb2JzIiwicHJvdG9jb2wiLCJwYWNrZXRzIiwib3BlbiIsImNsb3NlIiwicGluZyIsInBvbmciLCJtZXNzYWdlIiwidXBncmFkZSIsIm5vb3AiLCJwYWNrZXRzbGlzdCIsImVyciIsInR5cGUiLCJkYXRhIiwiQmxvYiIsIm1hcCIsImFyeSIsImVhY2giLCJkb25lIiwicmVzdWx0IiwiQXJyYXkiLCJuZXh0IiwiZWFjaFdpdGhJbmRleCIsImVsIiwiZXJyb3IiLCJtc2ciLCJlbmNvZGVQYWNrZXQiLCJwYWNrZXQiLCJzdXBwb3J0c0JpbmFyeSIsInV0ZjhlbmNvZGUiLCJjYWxsYmFjayIsInVuZGVmaW5lZCIsImJ1ZmZlciIsImVuY29kZUJhc2U2NFBhY2tldCIsImNvbnRlbnRBcnJheSIsIlVpbnQ4QXJyYXkiLCJyZXN1bHRCdWZmZXIiLCJieXRlTGVuZ3RoIiwiZW5jb2RlQXJyYXlCdWZmZXIiLCJmciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImVuY29kZUJsb2JBc0FycmF5QnVmZmVyIiwiYmxvYiIsImVuY29kZUJsb2IiLCJiYXNlNjQiLCJlbmNvZGVCYXNlNjRPYmplY3QiLCJlbmNvZGVkIiwiZW5jb2RlIiwiU3RyaW5nIiwic3RyaWN0IiwiYjY0ZGF0YSIsImI2NCIsInNwbGl0IiwicmVhZEFzRGF0YVVSTCIsImZyb21DaGFyQ29kZSIsImUiLCJ0eXBlZCIsImJhc2ljIiwiYnRvYSIsImRlY29kZVBhY2tldCIsImJpbmFyeVR5cGUiLCJ1dGY4ZGVjb2RlIiwiY2hhckF0IiwiZGVjb2RlQmFzZTY0UGFja2V0Iiwic3Vic3RyIiwiZGVjb2RlIiwidHJ5RGVjb2RlIiwiTnVtYmVyIiwic3Vic3RyaW5nIiwicmVzdCIsImVuY29kZVBheWxvYWQiLCJpc0JpbmFyeSIsImVuY29kZVBheWxvYWRBc0Jsb2IiLCJlbmNvZGVQYXlsb2FkQXNBcnJheUJ1ZmZlciIsImRvbmVDYWxsYmFjayIsInNldExlbmd0aEhlYWRlciIsInJlc3VsdHMiLCJqb2luIiwiZGVjb2RlUGF5bG9hZCIsImRlY29kZVBheWxvYWRBc0JpbmFyeSIsImNociIsImVuY29kZWRQYWNrZXRzIiwidG90YWxMZW5ndGgiLCJyZWR1Y2UiLCJhY2MiLCJ0b1N0cmluZyIsInJlc3VsdEFycmF5IiwiYnVmZmVySW5kZXgiLCJmb3JFYWNoIiwiaXNTdHJpbmciLCJhYiIsInZpZXciLCJjaGFyQ29kZUF0IiwibGVuU3RyIiwicGFyc2VJbnQiLCJiaW5hcnlJZGVudGlmaWVyIiwic2l6ZSIsImxlbmd0aEFyeSIsImJ1ZmZlclRhaWwiLCJidWZmZXJzIiwidGFpbEFycmF5IiwibXNnTGVuZ3RoIiwidG90YWwiLCJwcm9jZXNzIiwibG9hZCIsInN0b3JhZ2UiLCJkZWJ1ZyIsImVudiIsIkRFQlVHIiwibG9nIiwiY29uc29sZSIsIkZ1bmN0aW9uIiwiZm9ybWF0QXJncyIsInVzZUNvbG9ycyIsIm5hbWVzcGFjZSIsImh1bWFuaXplIiwiZGlmZiIsImNvbG9yIiwiaW5kZXgiLCJsYXN0QyIsInJlcGxhY2UiLCJtYXRjaCIsInNhdmUiLCJuYW1lc3BhY2VzIiwicmVtb3ZlSXRlbSIsIndpbmRvdyIsInRvTG93ZXJDYXNlIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIldlYmtpdEFwcGVhcmFuY2UiLCJmaXJlYnVnIiwiZXhjZXB0aW9uIiwidGFibGUiLCJSZWdFeHAiLCIkMSIsImNocm9tZSIsImxvY2FsIiwibG9jYWxTdG9yYWdlIiwibG9jYWxzdG9yYWdlIiwiY29sb3JzIiwiZm9ybWF0dGVycyIsImoiLCJ2IiwiSlNPTiIsInN0cmluZ2lmeSIsImVuYWJsZSIsInN0ciIsImVuY29kZVVSSUNvbXBvbmVudCIsInFzIiwicXJ5IiwicGFpcnMiLCJwYWlyIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiYSIsImIiLCJjb25zdHJ1Y3RvciIsImNhY2hlZFNldFRpbWVvdXQiLCJjYWNoZWRDbGVhclRpbWVvdXQiLCJkZWZhdWx0U2V0VGltb3V0IiwiRXJyb3IiLCJkZWZhdWx0Q2xlYXJUaW1lb3V0IiwicnVuVGltZW91dCIsImZ1biIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJjdXJyZW50UXVldWUiLCJxdWV1ZSIsImRyYWluaW5nIiwicXVldWVJbmRleCIsImNsZWFuVXBOZXh0VGljayIsImNvbmNhdCIsImRyYWluUXVldWUiLCJ0aW1lb3V0IiwicnVuIiwibWFya2VyIiwicnVuQ2xlYXJUaW1lb3V0IiwiSXRlbSIsImFycmF5IiwibmV4dFRpY2siLCJ0aXRsZSIsImJyb3dzZXIiLCJhcmd2IiwidmVyc2lvbiIsInZlcnNpb25zIiwiYWRkTGlzdGVuZXIiLCJwcmVwZW5kTGlzdGVuZXIiLCJwcmVwZW5kT25jZUxpc3RlbmVyIiwiYmluZGluZyIsImN3ZCIsImNoZGlyIiwiZGlyIiwidW1hc2siLCJoIiwieSIsInBsdXJhbCIsIm1zIiwiTWF0aCIsImZsb29yIiwiY2VpbCIsInZhbCIsIm9wdGlvbnMiLCJleGVjIiwicGFyc2VGbG9hdCIsInBhcnNlIiwiaXNOYU4iLCJsb25nIiwicm91bmQiLCJmbXRTaG9ydCIsImJpbmFyeSIsImlzQXJyYXkiLCJpc0J1ZiIsIkVuY29kZXIiLCJ0eXBlcyIsIkNPTk5FQ1QiLCJESVNDT05ORUNUIiwiRVZFTlQiLCJBQ0siLCJFUlJPUiIsIkJJTkFSWV9FVkVOVCIsIkJJTkFSWV9BQ0siLCJEZWNvZGVyIiwiRVJST1JfUEFDS0VUIiwiZW5jb2RlQXNTdHJpbmciLCJhdHRhY2htZW50cyIsIm5zcCIsImlkIiwicGF5bG9hZCIsInRyeVN0cmluZ2lmeSIsInJlY29uc3RydWN0b3IiLCJCaW5hcnlSZWNvbnN0cnVjdG9yIiwicmVjb25QYWNrIiwicmVtb3ZlQmxvYnMiLCJibG9ibGVzc0RhdGEiLCJkZWNvbnN0cnVjdGlvbiIsImRlY29uc3RydWN0UGFja2V0IiwicGFjayIsInVuc2hpZnQiLCJlbmNvZGVBc0JpbmFyeSIsImFkZCIsImJ1ZiIsInRyeVBhcnNlIiwiaXNQYXlsb2FkVmFsaWQiLCJkZWNvZGVTdHJpbmciLCJ0YWtlQmluYXJ5RGF0YSIsImRlc3Ryb3kiLCJmaW5pc2hlZFJlY29uc3RydWN0aW9uIiwiYmluRGF0YSIsInJlY29uc3RydWN0UGFja2V0IiwiZ2xvYmFsIiwiaWVlZTc1NCIsImtNYXhMZW5ndGgiLCJCdWZmZXIiLCJUWVBFRF9BUlJBWV9TVVBQT1JUIiwiY3JlYXRlQnVmZmVyIiwidGhhdCIsIlJhbmdlRXJyb3IiLCJfX3Byb3RvX18iLCJhcmciLCJlbmNvZGluZ09yT2Zmc2V0IiwiYWxsb2NVbnNhZmUiLCJmcm9tIiwiVHlwZUVycm9yIiwiYnl0ZU9mZnNldCIsImZyb21BcnJheUxpa2UiLCJmcm9tQXJyYXlCdWZmZXIiLCJzdHJpbmciLCJlbmNvZGluZyIsImlzRW5jb2RpbmciLCJhY3R1YWwiLCJ3cml0ZSIsImZyb21TdHJpbmciLCJpc0J1ZmZlciIsImNoZWNrZWQiLCJjb3B5IiwiZnJvbU9iamVjdCIsImFzc2VydFNpemUiLCJpc1ZpZXciLCJsb3dlcmVkQ2FzZSIsInV0ZjhUb0J5dGVzIiwiYmFzZTY0VG9CeXRlcyIsInN3YXAiLCJiaWRpcmVjdGlvbmFsSW5kZXhPZiIsImFycmF5SW5kZXhPZiIsImluZGV4T2YiLCJsYXN0SW5kZXhPZiIsImFyciIsImluZGV4U2l6ZSIsImFyckxlbmd0aCIsInZhbExlbmd0aCIsInJlYWQiLCJyZWFkVUludDE2QkUiLCJmb3VuZEluZGV4IiwiZm91bmQiLCJoZXhXcml0ZSIsIm9mZnNldCIsInJlbWFpbmluZyIsInN0ckxlbiIsInBhcnNlZCIsInV0ZjhXcml0ZSIsImJsaXRCdWZmZXIiLCJhc2NpaVdyaXRlIiwiYnl0ZUFycmF5IiwiYXNjaWlUb0J5dGVzIiwibGF0aW4xV3JpdGUiLCJiYXNlNjRXcml0ZSIsInVjczJXcml0ZSIsInVuaXRzIiwiaGkiLCJsbyIsInV0ZjE2bGVUb0J5dGVzIiwiYmFzZTY0U2xpY2UiLCJzdGFydCIsImVuZCIsImZyb21CeXRlQXJyYXkiLCJ1dGY4U2xpY2UiLCJtaW4iLCJyZXMiLCJzZWNvbmRCeXRlIiwidGhpcmRCeXRlIiwiZm91cnRoQnl0ZSIsInRlbXBDb2RlUG9pbnQiLCJmaXJzdEJ5dGUiLCJjb2RlUG9pbnQiLCJieXRlc1BlclNlcXVlbmNlIiwiY29kZVBvaW50cyIsIk1BWF9BUkdVTUVOVFNfTEVOR1RIIiwiZGVjb2RlQ29kZVBvaW50c0FycmF5IiwiU2xvd0J1ZmZlciIsImFsbG9jIiwiSU5TUEVDVF9NQVhfQllURVMiLCJmb28iLCJzdWJhcnJheSIsInR5cGVkQXJyYXlTdXBwb3J0IiwicG9vbFNpemUiLCJfYXVnbWVudCIsInNwZWNpZXMiLCJjb25maWd1cmFibGUiLCJmaWxsIiwiYWxsb2NVbnNhZmVTbG93IiwiX2lzQnVmZmVyIiwiY29tcGFyZSIsIngiLCJsaXN0IiwicG9zIiwic3dhcDE2Iiwic3dhcDMyIiwic3dhcDY0IiwiaGV4U2xpY2UiLCJhc2NpaVNsaWNlIiwibGF0aW4xU2xpY2UiLCJ1dGYxNmxlU2xpY2UiLCJlcXVhbHMiLCJpbnNwZWN0IiwibWF4IiwidGFyZ2V0IiwidGhpc1N0YXJ0IiwidGhpc0VuZCIsInRoaXNDb3B5IiwidGFyZ2V0Q29weSIsImluY2x1ZGVzIiwiaXNGaW5pdGUiLCJ0b0pTT04iLCJfYXJyIiwicmV0Iiwib3V0IiwidG9IZXgiLCJieXRlcyIsImNoZWNrT2Zmc2V0IiwiZXh0IiwiY2hlY2tJbnQiLCJvYmplY3RXcml0ZVVJbnQxNiIsImxpdHRsZUVuZGlhbiIsIm9iamVjdFdyaXRlVUludDMyIiwiY2hlY2tJRUVFNzU0Iiwid3JpdGVGbG9hdCIsIm5vQXNzZXJ0Iiwid3JpdGVEb3VibGUiLCJuZXdCdWYiLCJzbGljZUxlbiIsInJlYWRVSW50TEUiLCJtdWwiLCJyZWFkVUludEJFIiwicmVhZFVJbnQ4IiwicmVhZFVJbnQxNkxFIiwicmVhZFVJbnQzMkxFIiwicmVhZFVJbnQzMkJFIiwicmVhZEludExFIiwicG93IiwicmVhZEludEJFIiwicmVhZEludDgiLCJyZWFkSW50MTZMRSIsInJlYWRJbnQxNkJFIiwicmVhZEludDMyTEUiLCJyZWFkSW50MzJCRSIsInJlYWRGbG9hdExFIiwicmVhZEZsb2F0QkUiLCJyZWFkRG91YmxlTEUiLCJyZWFkRG91YmxlQkUiLCJ3cml0ZVVJbnRMRSIsIndyaXRlVUludEJFIiwid3JpdGVVSW50OCIsIndyaXRlVUludDE2TEUiLCJ3cml0ZVVJbnQxNkJFIiwid3JpdGVVSW50MzJMRSIsIndyaXRlVUludDMyQkUiLCJ3cml0ZUludExFIiwibGltaXQiLCJzdWIiLCJ3cml0ZUludEJFIiwid3JpdGVJbnQ4Iiwid3JpdGVJbnQxNkxFIiwid3JpdGVJbnQxNkJFIiwid3JpdGVJbnQzMkxFIiwid3JpdGVJbnQzMkJFIiwid3JpdGVGbG9hdExFIiwid3JpdGVGbG9hdEJFIiwid3JpdGVEb3VibGVMRSIsIndyaXRlRG91YmxlQkUiLCJ0YXJnZXRTdGFydCIsInNldCIsImNvZGUiLCJJTlZBTElEX0JBU0U2NF9SRSIsIkluZmluaXR5IiwibGVhZFN1cnJvZ2F0ZSIsInRvQnl0ZUFycmF5IiwidHJpbSIsInN0cmluZ3RyaW0iLCJiYXNlNjRjbGVhbiIsInNyYyIsImRzdCIsImhhc0NPUlMiLCJvcHRzIiwieGRvbWFpbiIsInhzY2hlbWUiLCJlbmFibGVzWERSIiwiWE1MSHR0cFJlcXVlc3QiLCJYRG9tYWluUmVxdWVzdCIsInNlbGYiLCJwYXJzZXIiLCJUcmFuc3BvcnQiLCJwYXRoIiwiaG9zdG5hbWUiLCJwb3J0Iiwic2VjdXJlIiwicXVlcnkiLCJ0aW1lc3RhbXBQYXJhbSIsInRpbWVzdGFtcFJlcXVlc3RzIiwicmVhZHlTdGF0ZSIsImFnZW50Iiwic29ja2V0IiwicGZ4IiwicGFzc3BocmFzZSIsImNlcnQiLCJjYSIsImNpcGhlcnMiLCJyZWplY3RVbmF1dGhvcml6ZWQiLCJmb3JjZU5vZGUiLCJpc1JlYWN0TmF0aXZlIiwiZXh0cmFIZWFkZXJzIiwibG9jYWxBZGRyZXNzIiwib25FcnJvciIsImRlc2MiLCJkZXNjcmlwdGlvbiIsImRvT3BlbiIsImRvQ2xvc2UiLCJvbkNsb3NlIiwic2VuZCIsIm9uT3BlbiIsIndyaXRhYmxlIiwib25EYXRhIiwib25QYWNrZXQiLCJyZSIsInBhcnRzIiwidXJpIiwic291cmNlIiwiaG9zdCIsImF1dGhvcml0eSIsImlwdjZ1cmkiLCJ3aXRoTmF0aXZlQnVmZmVyIiwid2l0aE5hdGl2ZUFycmF5QnVmZmVyIiwiZyIsImVpbyIsIlNvY2tldCIsIkJhY2tvZmYiLCJoYXMiLCJNYW5hZ2VyIiwibnNwcyIsInN1YnMiLCJyZWNvbm5lY3Rpb24iLCJyZWNvbm5lY3Rpb25BdHRlbXB0cyIsInJlY29ubmVjdGlvbkRlbGF5IiwicmVjb25uZWN0aW9uRGVsYXlNYXgiLCJyYW5kb21pemF0aW9uRmFjdG9yIiwiYmFja29mZiIsImppdHRlciIsImNvbm5lY3RpbmciLCJsYXN0UGluZyIsInBhY2tldEJ1ZmZlciIsIl9wYXJzZXIiLCJlbmNvZGVyIiwiZGVjb2RlciIsImF1dG9Db25uZWN0IiwiZW1pdEFsbCIsInVwZGF0ZVNvY2tldElkcyIsImdlbmVyYXRlSWQiLCJlbmdpbmUiLCJfcmVjb25uZWN0aW9uIiwiX3JlY29ubmVjdGlvbkF0dGVtcHRzIiwiX3JlY29ubmVjdGlvbkRlbGF5Iiwic2V0TWluIiwiX3JhbmRvbWl6YXRpb25GYWN0b3IiLCJzZXRKaXR0ZXIiLCJfcmVjb25uZWN0aW9uRGVsYXlNYXgiLCJzZXRNYXgiLCJfdGltZW91dCIsIm1heWJlUmVjb25uZWN0T25PcGVuIiwicmVjb25uZWN0aW5nIiwiYXR0ZW1wdHMiLCJyZWNvbm5lY3QiLCJjb25uZWN0Iiwic2tpcFJlY29ubmVjdCIsIm9wZW5TdWIiLCJvbm9wZW4iLCJlcnJvclN1YiIsImNsZWFudXAiLCJ0aW1lciIsIm9ucGluZyIsIkRhdGUiLCJvbnBvbmciLCJvbmRhdGEiLCJvbmRlY29kZWQiLCJvbmVycm9yIiwib25Db25uZWN0aW5nIiwicHJvY2Vzc1BhY2tldFF1ZXVlIiwic2hpZnQiLCJzdWJzTGVuZ3RoIiwiZGlzY29ubmVjdCIsInJlc2V0Iiwib25jbG9zZSIsInJlYXNvbiIsImRlbGF5IiwiZHVyYXRpb24iLCJvbnJlY29ubmVjdCIsImF0dGVtcHQiLCJYSFIiLCJKU09OUCIsIndlYnNvY2tldCIsInBvbGxpbmciLCJ4ZCIsInhzIiwianNvbnAiLCJsb2NhdGlvbiIsImlzU1NMIiwiZm9yY2VKU09OUCIsInBhcnNlcXMiLCJpbmhlcml0IiwieWVhc3QiLCJQb2xsaW5nIiwiaGFzWEhSMiIsInJlc3BvbnNlVHlwZSIsImZvcmNlQmFzZTY0IiwicG9sbCIsInBhdXNlIiwib25QYXVzZSIsImRvUG9sbCIsImNhbGxiYWNrZm4iLCJkb1dyaXRlIiwic2NoZW1hIiwic2lkIiwid2l0aE5hdGl2ZUJsb2IiLCJ3aXRoTmF0aXZlRmlsZSIsIkZpbGUiLCJwcmV2IiwiYWxwaGFiZXQiLCJzZWVkIiwibnVtIiwibm93IiwiZGVjb2RlZCIsInRvQXJyYXkiLCJoYXNCaW4iLCJldmVudHMiLCJjb25uZWN0X2Vycm9yIiwiY29ubmVjdF90aW1lb3V0IiwicmVjb25uZWN0X2F0dGVtcHQiLCJyZWNvbm5lY3RfZmFpbGVkIiwicmVjb25uZWN0X2Vycm9yIiwiaW8iLCJqc29uIiwiaWRzIiwiYWNrcyIsInJlY2VpdmVCdWZmZXIiLCJzZW5kQnVmZmVyIiwiY29ubmVjdGVkIiwiZGlzY29ubmVjdGVkIiwiZmxhZ3MiLCJzdWJFdmVudHMiLCJldiIsImNvbXByZXNzIiwicG9wIiwib25wYWNrZXQiLCJzYW1lTmFtZXNwYWNlIiwicm9vdE5hbWVzcGFjZUVycm9yIiwib25jb25uZWN0Iiwib25ldmVudCIsIm9uYWNrIiwib25kaXNjb25uZWN0IiwiYWNrIiwic2VudCIsImVtaXRCdWZmZXJlZCIsIm1vdmVtZW50IiwidXAiLCJkb3duIiwibGVmdCIsInJpZ2h0Iiwia2V5Q29kZSIsInNldEludGVydmFsIiwiY2FudmFzIiwiZ2V0RWxlbWVudEJ5SWQiLCJ3aWR0aCIsImhlaWdodCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiZm9udCIsInBsYXllcnMiLCJjbGVhclJlY3QiLCJwbGF5ZXIiLCJmaWxsU3R5bGUiLCJiZWdpblBhdGgiLCJhcmMiLCJQSSIsImZpbGxUZXh0IiwidXJsIiwibG9va3VwIiwiY2FjaGUiLCJtYW5hZ2VycyIsImZvcmNlTmV3IiwibXVsdGlwbGV4IiwicGFyc2V1cmkiLCJsb2MiLCJocmVmIiwiY3JlYXRlRGVidWciLCJwcmV2VGltZSIsImVuYWJsZWQiLCJjdXJyIiwiY29lcmNlIiwiZm9ybWF0IiwiZm9ybWF0dGVyIiwiaGFzaCIsImFicyIsInNlbGVjdENvbG9yIiwiaW5pdCIsImluc3RhbmNlcyIsInN0YWNrIiwiZGlzYWJsZSIsIm5hbWVzIiwic2tpcHMiLCJpbnN0YW5jZSIsInBhY2tldERhdGEiLCJfZGVjb25zdHJ1Y3RQYWNrZXQiLCJwbGFjZWhvbGRlciIsIl9wbGFjZWhvbGRlciIsIm5ld0RhdGEiLCJfcmVjb25zdHJ1Y3RQYWNrZXQiLCJwZW5kaW5nQmxvYnMiLCJfcmVtb3ZlQmxvYnMiLCJjdXJLZXkiLCJjb250YWluaW5nT2JqZWN0IiwiZmlsZVJlYWRlciIsImxlbnMiLCJnZXRMZW5zIiwidmFsaWRMZW4iLCJwbGFjZUhvbGRlcnNMZW4iLCJ0bXAiLCJBcnIiLCJfYnl0ZUxlbmd0aCIsImN1ckJ5dGUiLCJyZXZMb29rdXAiLCJ1aW50OCIsImV4dHJhQnl0ZXMiLCJsZW4yIiwiZW5jb2RlQ2h1bmsiLCJvdXRwdXQiLCJpc0xFIiwibUxlbiIsIm5CeXRlcyIsImVMZW4iLCJlTWF4IiwiZUJpYXMiLCJuQml0cyIsIk5hTiIsInJ0IiwiTE4yIiwidHJhbnNwb3J0cyIsInRyYW5zcG9ydE9wdGlvbnMiLCJ3cml0ZUJ1ZmZlciIsInByZXZCdWZmZXJMZW4iLCJwb2xpY3lQb3J0IiwicmVtZW1iZXJVcGdyYWRlIiwib25seUJpbmFyeVVwZ3JhZGVzIiwicGVyTWVzc2FnZURlZmxhdGUiLCJ0aHJlc2hvbGQiLCJwcm9kdWN0IiwidXBncmFkZXMiLCJwaW5nSW50ZXJ2YWwiLCJwaW5nVGltZW91dCIsInBpbmdJbnRlcnZhbFRpbWVyIiwicGluZ1RpbWVvdXRUaW1lciIsInByaW9yV2Vic29ja2V0U3VjY2VzcyIsImNyZWF0ZVRyYW5zcG9ydCIsImNsb25lIiwiRUlPIiwidHJhbnNwb3J0IiwicmVxdWVzdFRpbWVvdXQiLCJwcm90b2NvbHMiLCJzZXRUcmFuc3BvcnQiLCJvbkRyYWluIiwicHJvYmUiLCJmYWlsZWQiLCJvblRyYW5zcG9ydE9wZW4iLCJ1cGdyYWRlTG9zZXNCaW5hcnkiLCJ1cGdyYWRpbmciLCJmbHVzaCIsImZyZWV6ZVRyYW5zcG9ydCIsIm9uVHJhbnNwb3J0Q2xvc2UiLCJvbnVwZ3JhZGUiLCJ0byIsIm9uSGFuZHNoYWtlIiwic2V0UGluZyIsImZpbHRlclVwZ3JhZGVzIiwib25IZWFydGJlYXQiLCJzZW5kUGFja2V0Iiwid2FpdEZvclVwZ3JhZGUiLCJjbGVhbnVwQW5kQ2xvc2UiLCJmaWx0ZXJlZFVwZ3JhZGVzIiwiZW1wdHkiLCJSZXF1ZXN0IiwibWV0aG9kIiwiYXN5bmMiLCJyZXF1ZXN0IiwicmVxIiwic2VuZFhociIsInBvbGxYaHIiLCJ4aHIiLCJzZXREaXNhYmxlSGVhZGVyQ2hlY2siLCJzZXRSZXF1ZXN0SGVhZGVyIiwid2l0aENyZWRlbnRpYWxzIiwiaGFzWERSIiwib25Mb2FkIiwicmVzcG9uc2VUZXh0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwiY29udGVudFR5cGUiLCJnZXRSZXNwb25zZUhlYWRlciIsInN0YXR1cyIsInJlcXVlc3RzQ291bnQiLCJyZXF1ZXN0cyIsIm9uU3VjY2VzcyIsImZyb21FcnJvciIsImFib3J0IiwicmVzcG9uc2UiLCJhdHRhY2hFdmVudCIsInVubG9hZEhhbmRsZXIiLCJ0ZXJtaW5hdGlvbkV2ZW50IiwiYXJyYXlidWZmZXIiLCJhYnYiLCJpaSIsImNvdW50IiwiZXJyX2NiIiwiYmFpbCIsInByb3h5IiwiYnl0ZUNvdW50IiwiYnl0ZUluZGV4Iiwic3RyaW5nRnJvbUNoYXJDb2RlIiwidWNzMmRlY29kZSIsImV4dHJhIiwiY291bnRlciIsImNoZWNrU2NhbGFyVmFsdWUiLCJ0b1VwcGVyQ2FzZSIsImNyZWF0ZUJ5dGUiLCJlbmNvZGVDb2RlUG9pbnQiLCJzeW1ib2wiLCJyZWFkQ29udGludWF0aW9uQnl0ZSIsImNvbnRpbnVhdGlvbkJ5dGUiLCJkZWNvZGVTeW1ib2wiLCJieXRlMSIsImJ5dGVTdHJpbmciLCJ1Y3MyZW5jb2RlIiwiY2hhcnMiLCJlbmNvZGVkMSIsImVuY29kZWQyIiwiZW5jb2RlZDMiLCJlbmNvZGVkNCIsImJ1ZmZlckxlbmd0aCIsIkJsb2JCdWlsZGVyIiwiV2ViS2l0QmxvYkJ1aWxkZXIiLCJNU0Jsb2JCdWlsZGVyIiwiTW96QmxvYkJ1aWxkZXIiLCJibG9iU3VwcG9ydGVkIiwiYmxvYlN1cHBvcnRzQXJyYXlCdWZmZXJWaWV3IiwiYmxvYkJ1aWxkZXJTdXBwb3J0ZWQiLCJhcHBlbmQiLCJnZXRCbG9iIiwibWFwQXJyYXlCdWZmZXJWaWV3cyIsImNodW5rIiwiQmxvYkJ1aWxkZXJDb25zdHJ1Y3RvciIsImJiIiwicGFydCIsIkJsb2JDb25zdHJ1Y3RvciIsIkpTT05QUG9sbGluZyIsInJOZXdsaW5lIiwickVzY2FwZWROZXdsaW5lIiwiZ2xvYiIsIl9fX2VpbyIsInNjcmlwdCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImZvcm0iLCJpZnJhbWUiLCJjcmVhdGVFbGVtZW50IiwiaW5zZXJ0QXQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImluc2VydEJlZm9yZSIsImhlYWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJhcmVhIiwiaWZyYW1lSWQiLCJjbGFzc05hbWUiLCJwb3NpdGlvbiIsInRvcCIsInNldEF0dHJpYnV0ZSIsImNvbXBsZXRlIiwiaW5pdElmcmFtZSIsImh0bWwiLCJhY3Rpb24iLCJzdWJtaXQiLCJCcm93c2VyV2ViU29ja2V0IiwiTm9kZVdlYlNvY2tldCIsIldlYlNvY2tldCIsIk1veldlYlNvY2tldCIsIldlYlNvY2tldEltcGwiLCJXUyIsInVzaW5nQnJvd3NlcldlYlNvY2tldCIsImNoZWNrIiwiaGVhZGVycyIsIndzIiwic3VwcG9ydHMiLCJhZGRFdmVudExpc3RlbmVycyIsIm9ubWVzc2FnZSIsImZhY3RvciIsInJhbmQiLCJyYW5kb20iLCJkZXZpYXRpb24iXSwibWFwcGluZ3MiOiJhQUNBLElBQUFBLEVBQUEsR0FHQSxTQUFBQyxFQUFBQyxHQUdBLEdBQUFGLEVBQUFFLEdBQ0EsT0FBQUYsRUFBQUUsR0FBQUMsUUFHQSxJQUFBQyxFQUFBSixFQUFBRSxHQUFBLENBQ0FHLEVBQUFILEVBQ0FJLEdBQUEsRUFDQUgsUUFBQSxJQVVBLE9BTkFJLEVBQUFMLEdBQUFNLEtBQUFKLEVBQUFELFFBQUFDLElBQUFELFFBQUFGLEdBR0FHLEVBQUFFLEdBQUEsRUFHQUYsRUFBQUQsUUFLQUYsRUFBQVEsRUFBQUYsRUFHQU4sRUFBQVMsRUFBQVYsRUFHQUMsRUFBQVUsRUFBQSxTQUFBUixFQUFBUyxFQUFBQyxHQUNBWixFQUFBYSxFQUFBWCxFQUFBUyxJQUNBRyxPQUFBQyxlQUFBYixFQUFBUyxFQUFBLENBQTBDSyxZQUFBLEVBQUFDLElBQUFMLEtBSzFDWixFQUFBa0IsRUFBQSxTQUFBaEIsR0FDQSxvQkFBQWlCLGVBQUFDLGFBQ0FOLE9BQUFDLGVBQUFiLEVBQUFpQixPQUFBQyxZQUFBLENBQXdEQyxNQUFBLFdBRXhEUCxPQUFBQyxlQUFBYixFQUFBLGNBQWlEbUIsT0FBQSxLQVFqRHJCLEVBQUFzQixFQUFBLFNBQUFELEVBQUFFLEdBRUEsR0FEQSxFQUFBQSxJQUFBRixFQUFBckIsRUFBQXFCLElBQ0EsRUFBQUUsRUFBQSxPQUFBRixFQUNBLEtBQUFFLEdBQUEsaUJBQUFGLFFBQUFHLFdBQUEsT0FBQUgsRUFDQSxJQUFBSSxFQUFBWCxPQUFBWSxPQUFBLE1BR0EsR0FGQTFCLEVBQUFrQixFQUFBTyxHQUNBWCxPQUFBQyxlQUFBVSxFQUFBLFdBQXlDVCxZQUFBLEVBQUFLLFVBQ3pDLEVBQUFFLEdBQUEsaUJBQUFGLEVBQUEs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LEtBQUFzTyxHQUFBQyxLQUFBK0wsSUFBQXRhLEtBQUFtM0IsT0FBQW4zQixLQUFBd2lCLFlBQ0EsR0FBQXhpQixLQUFBaWhCLE9BQUEsQ0FDQSxJQUFBbVcsRUFBQTdvQixLQUFBOG9CLFNBQ0FDLEVBQUEvb0IsS0FBQUMsTUFBQTRvQixFQUFBcDNCLEtBQUFpaEIsT0FBQTNTLEdBQ0FBLEVBQUEsTUFBQUMsS0FBQUMsTUFBQSxHQUFBNG9CLElBQUE5b0IsRUFBQWdwQixFQUFBaHBCLEVBQUFncEIsRUFFQSxTQUFBL29CLEtBQUF1SCxJQUFBeEgsRUFBQXRPLEtBQUFvWSxNQVNBa0ksRUFBQWpoQixVQUFBdWtCLE1BQUEsV0FDQTVqQixLQUFBd2lCLFNBQUEsR0FTQWxDLEVBQUFqaEIsVUFBQTJpQixPQUFBLFNBQUFsTSxHQUNBOVYsS0FBQXNPLEdBQUF3SCxHQVNBd0ssRUFBQWpoQixVQUFBK2lCLE9BQUEsU0FBQWhLLEdBQ0FwWSxLQUFBb1ksT0FTQWtJLEVBQUFqaEIsVUFBQTZpQixVQUFBLFNBQUFqQixHQUNBamhCLEtBQUFpaEIiLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyNSk7XG4iLCJcclxuLyoqXHJcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXHJcbiAqL1xyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xyXG59XHJcblxyXG4vKipcclxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXHJcbiAqXHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcclxuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNaXhpbiB0aGUgZW1pdHRlciBwcm9wZXJ0aWVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XHJcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XHJcbiAgICBvYmpba2V5XSA9IEVtaXR0ZXIucHJvdG90eXBlW2tleV07XHJcbiAgfVxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMaXN0ZW4gb24gdGhlIGdpdmVuIGBldmVudGAgd2l0aCBgZm5gLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXHJcbiAgICAucHVzaChmbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXHJcbiAqIHRpbWUgdGhlbiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIGZ1bmN0aW9uIG9uKCkge1xyXG4gICAgdGhpcy5vZmYoZXZlbnQsIG9uKTtcclxuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgfVxyXG5cclxuICBvbi5mbiA9IGZuO1xyXG4gIHRoaXMub24oZXZlbnQsIG9uKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxyXG4gKiByZWdpc3RlcmVkIGNhbGxiYWNrcy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcblxyXG4gIC8vIGFsbFxyXG4gIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyBzcGVjaWZpYyBldmVudFxyXG4gIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcclxuXHJcbiAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xyXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxyXG4gIHZhciBjYjtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xyXG4gICAgY2IgPSBjYWxsYmFja3NbaV07XHJcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xyXG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge01peGVkfSAuLi5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxyXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xyXG5cclxuICBpZiAoY2FsbGJhY2tzKSB7XHJcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xyXG59O1xyXG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcbnZhciBoYXNCaW5hcnkgPSByZXF1aXJlKCdoYXMtYmluYXJ5MicpO1xudmFyIHNsaWNlQnVmZmVyID0gcmVxdWlyZSgnYXJyYXlidWZmZXIuc2xpY2UnKTtcbnZhciBhZnRlciA9IHJlcXVpcmUoJ2FmdGVyJyk7XG52YXIgdXRmOCA9IHJlcXVpcmUoJy4vdXRmOCcpO1xuXG52YXIgYmFzZTY0ZW5jb2RlcjtcbmlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gIGJhc2U2NGVuY29kZXIgPSByZXF1aXJlKCdiYXNlNjQtYXJyYXlidWZmZXInKTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiB3ZSBhcmUgcnVubmluZyBhbiBhbmRyb2lkIGJyb3dzZXIuIFRoYXQgcmVxdWlyZXMgdXMgdG8gdXNlXG4gKiBBcnJheUJ1ZmZlciB3aXRoIHBvbGxpbmcgdHJhbnNwb3J0cy4uLlxuICpcbiAqIGh0dHA6Ly9naGluZGEubmV0L2pwZWctYmxvYi1hamF4LWFuZHJvaWQvXG4gKi9cblxudmFyIGlzQW5kcm9pZCA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9BbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLyoqXG4gKiBDaGVjayBpZiB3ZSBhcmUgcnVubmluZyBpbiBQaGFudG9tSlMuXG4gKiBVcGxvYWRpbmcgYSBCbG9iIHdpdGggUGhhbnRvbUpTIGRvZXMgbm90IHdvcmsgY29ycmVjdGx5LCBhcyByZXBvcnRlZCBoZXJlOlxuICogaHR0cHM6Ly9naXRodWIuY29tL2FyaXlhL3BoYW50b21qcy9pc3N1ZXMvMTEzOTVcbiAqIEB0eXBlIGJvb2xlYW5cbiAqL1xudmFyIGlzUGhhbnRvbUpTID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgL1BoYW50b21KUy9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbi8qKlxuICogV2hlbiB0cnVlLCBhdm9pZHMgdXNpbmcgQmxvYnMgdG8gZW5jb2RlIHBheWxvYWRzLlxuICogQHR5cGUgYm9vbGVhblxuICovXG52YXIgZG9udFNlbmRCbG9icyA9IGlzQW5kcm9pZCB8fCBpc1BoYW50b21KUztcblxuLyoqXG4gKiBDdXJyZW50IHByb3RvY29sIHZlcnNpb24uXG4gKi9cblxuZXhwb3J0cy5wcm90b2NvbCA9IDM7XG5cbi8qKlxuICogUGFja2V0IHR5cGVzLlxuICovXG5cbnZhciBwYWNrZXRzID0gZXhwb3J0cy5wYWNrZXRzID0ge1xuICAgIG9wZW46ICAgICAwICAgIC8vIG5vbi13c1xuICAsIGNsb3NlOiAgICAxICAgIC8vIG5vbi13c1xuICAsIHBpbmc6ICAgICAyXG4gICwgcG9uZzogICAgIDNcbiAgLCBtZXNzYWdlOiAgNFxuICAsIHVwZ3JhZGU6ICA1XG4gICwgbm9vcDogICAgIDZcbn07XG5cbnZhciBwYWNrZXRzbGlzdCA9IGtleXMocGFja2V0cyk7XG5cbi8qKlxuICogUHJlbWFkZSBlcnJvciBwYWNrZXQuXG4gKi9cblxudmFyIGVyciA9IHsgdHlwZTogJ2Vycm9yJywgZGF0YTogJ3BhcnNlciBlcnJvcicgfTtcblxuLyoqXG4gKiBDcmVhdGUgYSBibG9iIGFwaSBldmVuIGZvciBibG9iIGJ1aWxkZXIgd2hlbiB2ZW5kb3IgcHJlZml4ZXMgZXhpc3RcbiAqL1xuXG52YXIgQmxvYiA9IHJlcXVpcmUoJ2Jsb2InKTtcblxuLyoqXG4gKiBFbmNvZGVzIGEgcGFja2V0LlxuICpcbiAqICAgICA8cGFja2V0IHR5cGUgaWQ+IFsgPGRhdGE+IF1cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICA1aGVsbG8gd29ybGRcbiAqICAgICAzXG4gKiAgICAgNFxuICpcbiAqIEJpbmFyeSBpcyBlbmNvZGVkIGluIGFuIGlkZW50aWNhbCBwcmluY2lwbGVcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVuY29kZVBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCB1dGY4ZW5jb2RlLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQmluYXJ5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBzdXBwb3J0c0JpbmFyeTtcbiAgICBzdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB1dGY4ZW5jb2RlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSB1dGY4ZW5jb2RlO1xuICAgIHV0ZjhlbmNvZGUgPSBudWxsO1xuICB9XG5cbiAgdmFyIGRhdGEgPSAocGFja2V0LmRhdGEgPT09IHVuZGVmaW5lZClcbiAgICA/IHVuZGVmaW5lZFxuICAgIDogcGFja2V0LmRhdGEuYnVmZmVyIHx8IHBhY2tldC5kYXRhO1xuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBlbmNvZGVBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjayk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIGRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgcmV0dXJuIGVuY29kZUJsb2IocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spO1xuICB9XG5cbiAgLy8gbWlnaHQgYmUgYW4gb2JqZWN0IHdpdGggeyBiYXNlNjQ6IHRydWUsIGRhdGE6IGRhdGFBc0Jhc2U2NFN0cmluZyB9XG4gIGlmIChkYXRhICYmIGRhdGEuYmFzZTY0KSB7XG4gICAgcmV0dXJuIGVuY29kZUJhc2U2NE9iamVjdChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIFNlbmRpbmcgZGF0YSBhcyBhIHV0Zi04IHN0cmluZ1xuICB2YXIgZW5jb2RlZCA9IHBhY2tldHNbcGFja2V0LnR5cGVdO1xuXG4gIC8vIGRhdGEgZnJhZ21lbnQgaXMgb3B0aW9uYWxcbiAgaWYgKHVuZGVmaW5lZCAhPT0gcGFja2V0LmRhdGEpIHtcbiAgICBlbmNvZGVkICs9IHV0ZjhlbmNvZGUgPyB1dGY4LmVuY29kZShTdHJpbmcocGFja2V0LmRhdGEpLCB7IHN0cmljdDogZmFsc2UgfSkgOiBTdHJpbmcocGFja2V0LmRhdGEpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGxiYWNrKCcnICsgZW5jb2RlZCk7XG5cbn07XG5cbmZ1bmN0aW9uIGVuY29kZUJhc2U2NE9iamVjdChwYWNrZXQsIGNhbGxiYWNrKSB7XG4gIC8vIHBhY2tldCBkYXRhIGlzIGFuIG9iamVjdCB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogZGF0YUFzQmFzZTY0U3RyaW5nIH1cbiAgdmFyIG1lc3NhZ2UgPSAnYicgKyBleHBvcnRzLnBhY2tldHNbcGFja2V0LnR5cGVdICsgcGFja2V0LmRhdGEuZGF0YTtcbiAgcmV0dXJuIGNhbGxiYWNrKG1lc3NhZ2UpO1xufVxuXG4vKipcbiAqIEVuY29kZSBwYWNrZXQgaGVscGVycyBmb3IgYmluYXJ5IHR5cGVzXG4gKi9cblxuZnVuY3Rpb24gZW5jb2RlQXJyYXlCdWZmZXIocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spIHtcbiAgaWYgKCFzdXBwb3J0c0JpbmFyeSkge1xuICAgIHJldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHZhciBkYXRhID0gcGFja2V0LmRhdGE7XG4gIHZhciBjb250ZW50QXJyYXkgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgdmFyIHJlc3VsdEJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KDEgKyBkYXRhLmJ5dGVMZW5ndGgpO1xuXG4gIHJlc3VsdEJ1ZmZlclswXSA9IHBhY2tldHNbcGFja2V0LnR5cGVdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRlbnRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIHJlc3VsdEJ1ZmZlcltpKzFdID0gY29udGVudEFycmF5W2ldO1xuICB9XG5cbiAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdEJ1ZmZlci5idWZmZXIpO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVCbG9iQXNBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICBpZiAoIXN1cHBvcnRzQmluYXJ5KSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCwgY2FsbGJhY2spO1xuICB9XG5cbiAgdmFyIGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgZnIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgZXhwb3J0cy5lbmNvZGVQYWNrZXQoeyB0eXBlOiBwYWNrZXQudHlwZSwgZGF0YTogZnIucmVzdWx0IH0sIHN1cHBvcnRzQmluYXJ5LCB0cnVlLCBjYWxsYmFjayk7XG4gIH07XG4gIHJldHVybiBmci5yZWFkQXNBcnJheUJ1ZmZlcihwYWNrZXQuZGF0YSk7XG59XG5cbmZ1bmN0aW9uIGVuY29kZUJsb2IocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spIHtcbiAgaWYgKCFzdXBwb3J0c0JpbmFyeSkge1xuICAgIHJldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGlmIChkb250U2VuZEJsb2JzKSB7XG4gICAgcmV0dXJuIGVuY29kZUJsb2JBc0FycmF5QnVmZmVyKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBuZXcgVWludDhBcnJheSgxKTtcbiAgbGVuZ3RoWzBdID0gcGFja2V0c1twYWNrZXQudHlwZV07XG4gIHZhciBibG9iID0gbmV3IEJsb2IoW2xlbmd0aC5idWZmZXIsIHBhY2tldC5kYXRhXSk7XG5cbiAgcmV0dXJuIGNhbGxiYWNrKGJsb2IpO1xufVxuXG4vKipcbiAqIEVuY29kZXMgYSBwYWNrZXQgd2l0aCBiaW5hcnkgZGF0YSBpbiBhIGJhc2U2NCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0LCBoYXMgYHR5cGVgIGFuZCBgZGF0YWBcbiAqIEByZXR1cm4ge1N0cmluZ30gYmFzZTY0IGVuY29kZWQgbWVzc2FnZVxuICovXG5cbmV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0ID0gZnVuY3Rpb24ocGFja2V0LCBjYWxsYmFjaykge1xuICB2YXIgbWVzc2FnZSA9ICdiJyArIGV4cG9ydHMucGFja2V0c1twYWNrZXQudHlwZV07XG4gIGlmICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgcGFja2V0LmRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgdmFyIGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBmci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBiNjQgPSBmci5yZXN1bHQuc3BsaXQoJywnKVsxXTtcbiAgICAgIGNhbGxiYWNrKG1lc3NhZ2UgKyBiNjQpO1xuICAgIH07XG4gICAgcmV0dXJuIGZyLnJlYWRBc0RhdGFVUkwocGFja2V0LmRhdGEpO1xuICB9XG5cbiAgdmFyIGI2NGRhdGE7XG4gIHRyeSB7XG4gICAgYjY0ZGF0YSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkocGFja2V0LmRhdGEpKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIGlQaG9uZSBTYWZhcmkgZG9lc24ndCBsZXQgeW91IGFwcGx5IHdpdGggdHlwZWQgYXJyYXlzXG4gICAgdmFyIHR5cGVkID0gbmV3IFVpbnQ4QXJyYXkocGFja2V0LmRhdGEpO1xuICAgIHZhciBiYXNpYyA9IG5ldyBBcnJheSh0eXBlZC5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGJhc2ljW2ldID0gdHlwZWRbaV07XG4gICAgfVxuICAgIGI2NGRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGJhc2ljKTtcbiAgfVxuICBtZXNzYWdlICs9IGJ0b2EoYjY0ZGF0YSk7XG4gIHJldHVybiBjYWxsYmFjayhtZXNzYWdlKTtcbn07XG5cbi8qKlxuICogRGVjb2RlcyBhIHBhY2tldC4gQ2hhbmdlcyBmb3JtYXQgdG8gQmxvYiBpZiByZXF1ZXN0ZWQuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGB0eXBlYCBhbmQgYGRhdGFgIChpZiBhbnkpXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmRlY29kZVBhY2tldCA9IGZ1bmN0aW9uIChkYXRhLCBiaW5hcnlUeXBlLCB1dGY4ZGVjb2RlKSB7XG4gIGlmIChkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gZXJyO1xuICB9XG4gIC8vIFN0cmluZyBkYXRhXG4gIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAoZGF0YS5jaGFyQXQoMCkgPT09ICdiJykge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZGVjb2RlQmFzZTY0UGFja2V0KGRhdGEuc3Vic3RyKDEpLCBiaW5hcnlUeXBlKTtcbiAgICB9XG5cbiAgICBpZiAodXRmOGRlY29kZSkge1xuICAgICAgZGF0YSA9IHRyeURlY29kZShkYXRhKTtcbiAgICAgIGlmIChkYXRhID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZXJyO1xuICAgICAgfVxuICAgIH1cbiAgICB2YXIgdHlwZSA9IGRhdGEuY2hhckF0KDApO1xuXG4gICAgaWYgKE51bWJlcih0eXBlKSAhPSB0eXBlIHx8ICFwYWNrZXRzbGlzdFt0eXBlXSkge1xuICAgICAgcmV0dXJuIGVycjtcbiAgICB9XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBwYWNrZXRzbGlzdFt0eXBlXSwgZGF0YTogZGF0YS5zdWJzdHJpbmcoMSkgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHsgdHlwZTogcGFja2V0c2xpc3RbdHlwZV0gfTtcbiAgICB9XG4gIH1cblxuICB2YXIgYXNBcnJheSA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICB2YXIgdHlwZSA9IGFzQXJyYXlbMF07XG4gIHZhciByZXN0ID0gc2xpY2VCdWZmZXIoZGF0YSwgMSk7XG4gIGlmIChCbG9iICYmIGJpbmFyeVR5cGUgPT09ICdibG9iJykge1xuICAgIHJlc3QgPSBuZXcgQmxvYihbcmVzdF0pO1xuICB9XG4gIHJldHVybiB7IHR5cGU6IHBhY2tldHNsaXN0W3R5cGVdLCBkYXRhOiByZXN0IH07XG59O1xuXG5mdW5jdGlvbiB0cnlEZWNvZGUoZGF0YSkge1xuICB0cnkge1xuICAgIGRhdGEgPSB1dGY4LmRlY29kZShkYXRhLCB7IHN0cmljdDogZmFsc2UgfSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogRGVjb2RlcyBhIHBhY2tldCBlbmNvZGVkIGluIGEgYmFzZTY0IHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlNjQgZW5jb2RlZCBtZXNzYWdlXG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYHR5cGVgIGFuZCBgZGF0YWAgKGlmIGFueSlcbiAqL1xuXG5leHBvcnRzLmRlY29kZUJhc2U2NFBhY2tldCA9IGZ1bmN0aW9uKG1zZywgYmluYXJ5VHlwZSkge1xuICB2YXIgdHlwZSA9IHBhY2tldHNsaXN0W21zZy5jaGFyQXQoMCldO1xuICBpZiAoIWJhc2U2NGVuY29kZXIpIHtcbiAgICByZXR1cm4geyB0eXBlOiB0eXBlLCBkYXRhOiB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogbXNnLnN1YnN0cigxKSB9IH07XG4gIH1cblxuICB2YXIgZGF0YSA9IGJhc2U2NGVuY29kZXIuZGVjb2RlKG1zZy5zdWJzdHIoMSkpO1xuXG4gIGlmIChiaW5hcnlUeXBlID09PSAnYmxvYicgJiYgQmxvYikge1xuICAgIGRhdGEgPSBuZXcgQmxvYihbZGF0YV0pO1xuICB9XG5cbiAgcmV0dXJuIHsgdHlwZTogdHlwZSwgZGF0YTogZGF0YSB9O1xufTtcblxuLyoqXG4gKiBFbmNvZGVzIG11bHRpcGxlIG1lc3NhZ2VzIChwYXlsb2FkKS5cbiAqXG4gKiAgICAgPGxlbmd0aD46ZGF0YVxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgIDExOmhlbGxvIHdvcmxkMjpoaVxuICpcbiAqIElmIGFueSBjb250ZW50cyBhcmUgYmluYXJ5LCB0aGV5IHdpbGwgYmUgZW5jb2RlZCBhcyBiYXNlNjQgc3RyaW5ncy4gQmFzZTY0XG4gKiBlbmNvZGVkIHN0cmluZ3MgYXJlIG1hcmtlZCB3aXRoIGEgYiBiZWZvcmUgdGhlIGxlbmd0aCBzcGVjaWZpZXJcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVuY29kZVBheWxvYWQgPSBmdW5jdGlvbiAocGFja2V0cywgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2Ygc3VwcG9ydHNCaW5hcnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IHN1cHBvcnRzQmluYXJ5O1xuICAgIHN1cHBvcnRzQmluYXJ5ID0gbnVsbDtcbiAgfVxuXG4gIHZhciBpc0JpbmFyeSA9IGhhc0JpbmFyeShwYWNrZXRzKTtcblxuICBpZiAoc3VwcG9ydHNCaW5hcnkgJiYgaXNCaW5hcnkpIHtcbiAgICBpZiAoQmxvYiAmJiAhZG9udFNlbmRCbG9icykge1xuICAgICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQmxvYihwYWNrZXRzLCBjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQXJyYXlCdWZmZXIocGFja2V0cywgY2FsbGJhY2spO1xuICB9XG5cbiAgaWYgKCFwYWNrZXRzLmxlbmd0aCkge1xuICAgIHJldHVybiBjYWxsYmFjaygnMDonKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldExlbmd0aEhlYWRlcihtZXNzYWdlKSB7XG4gICAgcmV0dXJuIG1lc3NhZ2UubGVuZ3RoICsgJzonICsgbWVzc2FnZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsIGRvbmVDYWxsYmFjaykge1xuICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCwgIWlzQmluYXJ5ID8gZmFsc2UgOiBzdXBwb3J0c0JpbmFyeSwgZmFsc2UsIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIGRvbmVDYWxsYmFjayhudWxsLCBzZXRMZW5ndGhIZWFkZXIobWVzc2FnZSkpO1xuICAgIH0pO1xuICB9XG5cbiAgbWFwKHBhY2tldHMsIGVuY29kZU9uZSwgZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdHMuam9pbignJykpO1xuICB9KTtcbn07XG5cbi8qKlxuICogQXN5bmMgYXJyYXkgbWFwIHVzaW5nIGFmdGVyXG4gKi9cblxuZnVuY3Rpb24gbWFwKGFyeSwgZWFjaCwgZG9uZSkge1xuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KGFyeS5sZW5ndGgpO1xuICB2YXIgbmV4dCA9IGFmdGVyKGFyeS5sZW5ndGgsIGRvbmUpO1xuXG4gIHZhciBlYWNoV2l0aEluZGV4ID0gZnVuY3Rpb24oaSwgZWwsIGNiKSB7XG4gICAgZWFjaChlbCwgZnVuY3Rpb24oZXJyb3IsIG1zZykge1xuICAgICAgcmVzdWx0W2ldID0gbXNnO1xuICAgICAgY2IoZXJyb3IsIHJlc3VsdCk7XG4gICAgfSk7XG4gIH07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnkubGVuZ3RoOyBpKyspIHtcbiAgICBlYWNoV2l0aEluZGV4KGksIGFyeVtpXSwgbmV4dCk7XG4gIH1cbn1cblxuLypcbiAqIERlY29kZXMgZGF0YSB3aGVuIGEgcGF5bG9hZCBpcyBtYXliZSBleHBlY3RlZC4gUG9zc2libGUgYmluYXJ5IGNvbnRlbnRzIGFyZVxuICogZGVjb2RlZCBmcm9tIHRoZWlyIGJhc2U2NCByZXByZXNlbnRhdGlvblxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLCBjYWxsYmFjayBtZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKGRhdGEsIGJpbmFyeVR5cGUsIGNhbGxiYWNrKSB7XG4gIGlmICh0eXBlb2YgZGF0YSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5kZWNvZGVQYXlsb2FkQXNCaW5hcnkoZGF0YSwgYmluYXJ5VHlwZSwgY2FsbGJhY2spO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBiaW5hcnlUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBiaW5hcnlUeXBlO1xuICAgIGJpbmFyeVR5cGUgPSBudWxsO1xuICB9XG5cbiAgdmFyIHBhY2tldDtcbiAgaWYgKGRhdGEgPT09ICcnKSB7XG4gICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICB9XG5cbiAgdmFyIGxlbmd0aCA9ICcnLCBuLCBtc2c7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBkYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBjaHIgPSBkYXRhLmNoYXJBdChpKTtcblxuICAgIGlmIChjaHIgIT09ICc6Jykge1xuICAgICAgbGVuZ3RoICs9IGNocjtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChsZW5ndGggPT09ICcnIHx8IChsZW5ndGggIT0gKG4gPSBOdW1iZXIobGVuZ3RoKSkpKSB7XG4gICAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICB9XG5cbiAgICBtc2cgPSBkYXRhLnN1YnN0cihpICsgMSwgbik7XG5cbiAgICBpZiAobGVuZ3RoICE9IG1zZy5sZW5ndGgpIHtcbiAgICAgIC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgIH1cblxuICAgIGlmIChtc2cubGVuZ3RoKSB7XG4gICAgICBwYWNrZXQgPSBleHBvcnRzLmRlY29kZVBhY2tldChtc2csIGJpbmFyeVR5cGUsIGZhbHNlKTtcblxuICAgICAgaWYgKGVyci50eXBlID09PSBwYWNrZXQudHlwZSAmJiBlcnIuZGF0YSA9PT0gcGFja2V0LmRhdGEpIHtcbiAgICAgICAgLy8gcGFyc2VyIGVycm9yIGluIGluZGl2aWR1YWwgcGFja2V0IC0gaWdub3JpbmcgcGF5bG9hZFxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHJldCA9IGNhbGxiYWNrKHBhY2tldCwgaSArIG4sIGwpO1xuICAgICAgaWYgKGZhbHNlID09PSByZXQpIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBhZHZhbmNlIGN1cnNvclxuICAgIGkgKz0gbjtcbiAgICBsZW5ndGggPSAnJztcbiAgfVxuXG4gIGlmIChsZW5ndGggIT09ICcnKSB7XG4gICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICB9XG5cbn07XG5cbi8qKlxuICogRW5jb2RlcyBtdWx0aXBsZSBtZXNzYWdlcyAocGF5bG9hZCkgYXMgYmluYXJ5LlxuICpcbiAqIDwxID0gYmluYXJ5LCAwID0gc3RyaW5nPjxudW1iZXIgZnJvbSAwLTk+PG51bWJlciBmcm9tIDAtOT5bLi4uXTxudW1iZXJcbiAqIDI1NT48ZGF0YT5cbiAqXG4gKiBFeGFtcGxlOlxuICogMSAzIDI1NSAxIDIgMywgaWYgdGhlIGJpbmFyeSBjb250ZW50cyBhcmUgaW50ZXJwcmV0ZWQgYXMgOCBiaXQgaW50ZWdlcnNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gKiBAcmV0dXJuIHtBcnJheUJ1ZmZlcn0gZW5jb2RlZCBwYXlsb2FkXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmVuY29kZVBheWxvYWRBc0FycmF5QnVmZmVyID0gZnVuY3Rpb24ocGFja2V0cywgY2FsbGJhY2spIHtcbiAgaWYgKCFwYWNrZXRzLmxlbmd0aCkge1xuICAgIHJldHVybiBjYWxsYmFjayhuZXcgQXJyYXlCdWZmZXIoMCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZW5jb2RlT25lKHBhY2tldCwgZG9uZUNhbGxiYWNrKSB7XG4gICAgZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LCB0cnVlLCB0cnVlLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICByZXR1cm4gZG9uZUNhbGxiYWNrKG51bGwsIGRhdGEpO1xuICAgIH0pO1xuICB9XG5cbiAgbWFwKHBhY2tldHMsIGVuY29kZU9uZSwgZnVuY3Rpb24oZXJyLCBlbmNvZGVkUGFja2V0cykge1xuICAgIHZhciB0b3RhbExlbmd0aCA9IGVuY29kZWRQYWNrZXRzLnJlZHVjZShmdW5jdGlvbihhY2MsIHApIHtcbiAgICAgIHZhciBsZW47XG4gICAgICBpZiAodHlwZW9mIHAgPT09ICdzdHJpbmcnKXtcbiAgICAgICAgbGVuID0gcC5sZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZW4gPSBwLmJ5dGVMZW5ndGg7XG4gICAgICB9XG4gICAgICByZXR1cm4gYWNjICsgbGVuLnRvU3RyaW5nKCkubGVuZ3RoICsgbGVuICsgMjsgLy8gc3RyaW5nL2JpbmFyeSBpZGVudGlmaWVyICsgc2VwYXJhdG9yID0gMlxuICAgIH0sIDApO1xuXG4gICAgdmFyIHJlc3VsdEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodG90YWxMZW5ndGgpO1xuXG4gICAgdmFyIGJ1ZmZlckluZGV4ID0gMDtcbiAgICBlbmNvZGVkUGFja2V0cy5mb3JFYWNoKGZ1bmN0aW9uKHApIHtcbiAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiBwID09PSAnc3RyaW5nJztcbiAgICAgIHZhciBhYiA9IHA7XG4gICAgICBpZiAoaXNTdHJpbmcpIHtcbiAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShwLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZpZXdbaV0gPSBwLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cbiAgICAgICAgYWIgPSB2aWV3LmJ1ZmZlcjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzU3RyaW5nKSB7IC8vIG5vdCB0cnVlIGJpbmFyeVxuICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDA7XG4gICAgICB9IGVsc2UgeyAvLyB0cnVlIGJpbmFyeVxuICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDE7XG4gICAgICB9XG5cbiAgICAgIHZhciBsZW5TdHIgPSBhYi5ieXRlTGVuZ3RoLnRvU3RyaW5nKCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlblN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IHBhcnNlSW50KGxlblN0cltpXSk7XG4gICAgICB9XG4gICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDI1NTtcblxuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShhYik7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSB2aWV3W2ldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdEFycmF5LmJ1ZmZlcik7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBFbmNvZGUgYXMgQmxvYlxuICovXG5cbmV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQmxvYiA9IGZ1bmN0aW9uKHBhY2tldHMsIGNhbGxiYWNrKSB7XG4gIGZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsIGRvbmVDYWxsYmFjaykge1xuICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCwgdHJ1ZSwgdHJ1ZSwgZnVuY3Rpb24oZW5jb2RlZCkge1xuICAgICAgdmFyIGJpbmFyeUlkZW50aWZpZXIgPSBuZXcgVWludDhBcnJheSgxKTtcbiAgICAgIGJpbmFyeUlkZW50aWZpZXJbMF0gPSAxO1xuICAgICAgaWYgKHR5cGVvZiBlbmNvZGVkID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGVuY29kZWQubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmNvZGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmlld1tpXSA9IGVuY29kZWQuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuICAgICAgICBlbmNvZGVkID0gdmlldy5idWZmZXI7XG4gICAgICAgIGJpbmFyeUlkZW50aWZpZXJbMF0gPSAwO1xuICAgICAgfVxuXG4gICAgICB2YXIgbGVuID0gKGVuY29kZWQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcilcbiAgICAgICAgPyBlbmNvZGVkLmJ5dGVMZW5ndGhcbiAgICAgICAgOiBlbmNvZGVkLnNpemU7XG5cbiAgICAgIHZhciBsZW5TdHIgPSBsZW4udG9TdHJpbmcoKTtcbiAgICAgIHZhciBsZW5ndGhBcnkgPSBuZXcgVWludDhBcnJheShsZW5TdHIubGVuZ3RoICsgMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlblN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZW5ndGhBcnlbaV0gPSBwYXJzZUludChsZW5TdHJbaV0pO1xuICAgICAgfVxuICAgICAgbGVuZ3RoQXJ5W2xlblN0ci5sZW5ndGhdID0gMjU1O1xuXG4gICAgICBpZiAoQmxvYikge1xuICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtiaW5hcnlJZGVudGlmaWVyLmJ1ZmZlciwgbGVuZ3RoQXJ5LmJ1ZmZlciwgZW5jb2RlZF0pO1xuICAgICAgICBkb25lQ2FsbGJhY2sobnVsbCwgYmxvYik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBtYXAocGFja2V0cywgZW5jb2RlT25lLCBmdW5jdGlvbihlcnIsIHJlc3VsdHMpIHtcbiAgICByZXR1cm4gY2FsbGJhY2sobmV3IEJsb2IocmVzdWx0cykpO1xuICB9KTtcbn07XG5cbi8qXG4gKiBEZWNvZGVzIGRhdGEgd2hlbiBhIHBheWxvYWQgaXMgbWF5YmUgZXhwZWN0ZWQuIFN0cmluZ3MgYXJlIGRlY29kZWQgYnlcbiAqIGludGVycHJldGluZyBlYWNoIGJ5dGUgYXMgYSBrZXkgY29kZSBmb3IgZW50cmllcyBtYXJrZWQgdG8gc3RhcnQgd2l0aCAwLiBTZWVcbiAqIGRlc2NyaXB0aW9uIG9mIGVuY29kZVBheWxvYWRBc0JpbmFyeVxuICpcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGRhdGEsIGNhbGxiYWNrIG1ldGhvZFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmRlY29kZVBheWxvYWRBc0JpbmFyeSA9IGZ1bmN0aW9uIChkYXRhLCBiaW5hcnlUeXBlLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGJpbmFyeVR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjYWxsYmFjayA9IGJpbmFyeVR5cGU7XG4gICAgYmluYXJ5VHlwZSA9IG51bGw7XG4gIH1cblxuICB2YXIgYnVmZmVyVGFpbCA9IGRhdGE7XG4gIHZhciBidWZmZXJzID0gW107XG5cbiAgd2hpbGUgKGJ1ZmZlclRhaWwuYnl0ZUxlbmd0aCA+IDApIHtcbiAgICB2YXIgdGFpbEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyVGFpbCk7XG4gICAgdmFyIGlzU3RyaW5nID0gdGFpbEFycmF5WzBdID09PSAwO1xuICAgIHZhciBtc2dMZW5ndGggPSAnJztcblxuICAgIGZvciAodmFyIGkgPSAxOyA7IGkrKykge1xuICAgICAgaWYgKHRhaWxBcnJheVtpXSA9PT0gMjU1KSBicmVhaztcblxuICAgICAgLy8gMzEwID0gY2hhciBsZW5ndGggb2YgTnVtYmVyLk1BWF9WQUxVRVxuICAgICAgaWYgKG1zZ0xlbmd0aC5sZW5ndGggPiAzMTApIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gICAgICB9XG5cbiAgICAgIG1zZ0xlbmd0aCArPSB0YWlsQXJyYXlbaV07XG4gICAgfVxuXG4gICAgYnVmZmVyVGFpbCA9IHNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsIDIgKyBtc2dMZW5ndGgubGVuZ3RoKTtcbiAgICBtc2dMZW5ndGggPSBwYXJzZUludChtc2dMZW5ndGgpO1xuXG4gICAgdmFyIG1zZyA9IHNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsIDAsIG1zZ0xlbmd0aCk7XG4gICAgaWYgKGlzU3RyaW5nKSB7XG4gICAgICB0cnkge1xuICAgICAgICBtc2cgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KG1zZykpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpUGhvbmUgU2FmYXJpIGRvZXNuJ3QgbGV0IHlvdSBhcHBseSB0byB0eXBlZCBhcnJheXNcbiAgICAgICAgdmFyIHR5cGVkID0gbmV3IFVpbnQ4QXJyYXkobXNnKTtcbiAgICAgICAgbXNnID0gJyc7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBtc2cgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh0eXBlZFtpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBidWZmZXJzLnB1c2gobXNnKTtcbiAgICBidWZmZXJUYWlsID0gc2xpY2VCdWZmZXIoYnVmZmVyVGFpbCwgbXNnTGVuZ3RoKTtcbiAgfVxuXG4gIHZhciB0b3RhbCA9IGJ1ZmZlcnMubGVuZ3RoO1xuICBidWZmZXJzLmZvckVhY2goZnVuY3Rpb24oYnVmZmVyLCBpKSB7XG4gICAgY2FsbGJhY2soZXhwb3J0cy5kZWNvZGVQYWNrZXQoYnVmZmVyLCBiaW5hcnlUeXBlLCB0cnVlKSwgaSwgdG90YWwpO1xuICB9KTtcbn07XG4iLCIvKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICcjMDAwMENDJywgJyMwMDAwRkYnLCAnIzAwMzNDQycsICcjMDAzM0ZGJywgJyMwMDY2Q0MnLCAnIzAwNjZGRicsICcjMDA5OUNDJyxcbiAgJyMwMDk5RkYnLCAnIzAwQ0MwMCcsICcjMDBDQzMzJywgJyMwMENDNjYnLCAnIzAwQ0M5OScsICcjMDBDQ0NDJywgJyMwMENDRkYnLFxuICAnIzMzMDBDQycsICcjMzMwMEZGJywgJyMzMzMzQ0MnLCAnIzMzMzNGRicsICcjMzM2NkNDJywgJyMzMzY2RkYnLCAnIzMzOTlDQycsXG4gICcjMzM5OUZGJywgJyMzM0NDMDAnLCAnIzMzQ0MzMycsICcjMzNDQzY2JywgJyMzM0NDOTknLCAnIzMzQ0NDQycsICcjMzNDQ0ZGJyxcbiAgJyM2NjAwQ0MnLCAnIzY2MDBGRicsICcjNjYzM0NDJywgJyM2NjMzRkYnLCAnIzY2Q0MwMCcsICcjNjZDQzMzJywgJyM5OTAwQ0MnLFxuICAnIzk5MDBGRicsICcjOTkzM0NDJywgJyM5OTMzRkYnLCAnIzk5Q0MwMCcsICcjOTlDQzMzJywgJyNDQzAwMDAnLCAnI0NDMDAzMycsXG4gICcjQ0MwMDY2JywgJyNDQzAwOTknLCAnI0NDMDBDQycsICcjQ0MwMEZGJywgJyNDQzMzMDAnLCAnI0NDMzMzMycsICcjQ0MzMzY2JyxcbiAgJyNDQzMzOTknLCAnI0NDMzNDQycsICcjQ0MzM0ZGJywgJyNDQzY2MDAnLCAnI0NDNjYzMycsICcjQ0M5OTAwJywgJyNDQzk5MzMnLFxuICAnI0NDQ0MwMCcsICcjQ0NDQzMzJywgJyNGRjAwMDAnLCAnI0ZGMDAzMycsICcjRkYwMDY2JywgJyNGRjAwOTknLCAnI0ZGMDBDQycsXG4gICcjRkYwMEZGJywgJyNGRjMzMDAnLCAnI0ZGMzMzMycsICcjRkYzMzY2JywgJyNGRjMzOTknLCAnI0ZGMzNDQycsICcjRkYzM0ZGJyxcbiAgJyNGRjY2MDAnLCAnI0ZGNjYzMycsICcjRkY5OTAwJywgJyNGRjk5MzMnLCAnI0ZGQ0MwMCcsICcjRkZDQzMzJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgYW5kIEVkZ2UgZG8gbm90IHN1cHBvcnQgY29sb3JzLlxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goLyhlZGdlfHRyaWRlbnQpXFwvKFxcZCspLykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBpcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICAvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSkgfHxcbiAgICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8ICh3aW5kb3cuY29uc29sZS5leGNlcHRpb24gJiYgd2luZG93LmNvbnNvbGUudGFibGUpKSkgfHxcbiAgICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSkgfHxcbiAgICAvLyBkb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbih2KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyLm1lc3NhZ2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcbiAgdmFyIHVzZUNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXG4gIGFyZ3NbMF0gPSAodXNlQ29sb3JzID8gJyVjJyA6ICcnKVxuICAgICsgdGhpcy5uYW1lc3BhY2VcbiAgICArICh1c2VDb2xvcnMgPyAnICVjJyA6ICcgJylcbiAgICArIGFyZ3NbMF1cbiAgICArICh1c2VDb2xvcnMgPyAnJWMgJyA6ICcgJylcbiAgICArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICBpZiAoIXVzZUNvbG9ycykgcmV0dXJuO1xuXG4gIHZhciBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcbiAgYXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0JylcblxuICAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuICAvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG4gIC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEMgPSAwO1xuICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICBpZiAoJyUlJyA9PT0gbWF0Y2gpIHJldHVybjtcbiAgICBpbmRleCsrO1xuICAgIGlmICgnJWMnID09PSBtYXRjaCkge1xuICAgICAgLy8gd2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgbGFzdEMgPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb2coKSB7XG4gIC8vIHRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG4gIC8vIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG4gIHJldHVybiAnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbnNvbGVcbiAgICAmJiBjb25zb2xlLmxvZ1xuICAgICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUubG9nLCBjb25zb2xlLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobnVsbCA9PSBuYW1lc3BhY2VzKSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLmRlYnVnID0gbmFtZXNwYWNlcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge31cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB2YXIgcjtcbiAgdHJ5IHtcbiAgICByID0gZXhwb3J0cy5zdG9yYWdlLmRlYnVnO1xuICB9IGNhdGNoKGUpIHt9XG5cbiAgLy8gSWYgZGVidWcgaXNuJ3Qgc2V0IGluIExTLCBhbmQgd2UncmUgaW4gRWxlY3Ryb24sIHRyeSB0byBsb2FkICRERUJVR1xuICBpZiAoIXIgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICdlbnYnIGluIHByb2Nlc3MpIHtcbiAgICByID0gcHJvY2Vzcy5lbnYuREVCVUc7XG4gIH1cblxuICByZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYGxvY2FsU3RvcmFnZS5kZWJ1Z2AgaW5pdGlhbGx5LlxuICovXG5cbmV4cG9ydHMuZW5hYmxlKGxvYWQoKSk7XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlKSB7fVxufVxuIiwiLyoqXHJcbiAqIENvbXBpbGVzIGEgcXVlcnlzdHJpbmdcclxuICogUmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH1cclxuICogQGFwaSBwcml2YXRlXHJcbiAqL1xyXG5cclxuZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgdmFyIHN0ciA9ICcnO1xyXG5cclxuICBmb3IgKHZhciBpIGluIG9iaikge1xyXG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICBpZiAoc3RyLmxlbmd0aCkgc3RyICs9ICcmJztcclxuICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChpKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbaV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0cjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQYXJzZXMgYSBzaW1wbGUgcXVlcnlzdHJpbmcgaW50byBhbiBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IHFzXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmV4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24ocXMpe1xyXG4gIHZhciBxcnkgPSB7fTtcclxuICB2YXIgcGFpcnMgPSBxcy5zcGxpdCgnJicpO1xyXG4gIGZvciAodmFyIGkgPSAwLCBsID0gcGFpcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICB2YXIgcGFpciA9IHBhaXJzW2ldLnNwbGl0KCc9Jyk7XHJcbiAgICBxcnlbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcclxuICB9XHJcbiAgcmV0dXJuIHFyeTtcclxufTtcclxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGEsIGIpe1xuICB2YXIgZm4gPSBmdW5jdGlvbigpe307XG4gIGZuLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO1xuICBhLnByb3RvdHlwZSA9IG5ldyBmbjtcbiAgYS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBhO1xufTsiLCIvKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICcjMDAwMENDJywgJyMwMDAwRkYnLCAnIzAwMzNDQycsICcjMDAzM0ZGJywgJyMwMDY2Q0MnLCAnIzAwNjZGRicsICcjMDA5OUNDJyxcbiAgJyMwMDk5RkYnLCAnIzAwQ0MwMCcsICcjMDBDQzMzJywgJyMwMENDNjYnLCAnIzAwQ0M5OScsICcjMDBDQ0NDJywgJyMwMENDRkYnLFxuICAnIzMzMDBDQycsICcjMzMwMEZGJywgJyMzMzMzQ0MnLCAnIzMzMzNGRicsICcjMzM2NkNDJywgJyMzMzY2RkYnLCAnIzMzOTlDQycsXG4gICcjMzM5OUZGJywgJyMzM0NDMDAnLCAnIzMzQ0MzMycsICcjMzNDQzY2JywgJyMzM0NDOTknLCAnIzMzQ0NDQycsICcjMzNDQ0ZGJyxcbiAgJyM2NjAwQ0MnLCAnIzY2MDBGRicsICcjNjYzM0NDJywgJyM2NjMzRkYnLCAnIzY2Q0MwMCcsICcjNjZDQzMzJywgJyM5OTAwQ0MnLFxuICAnIzk5MDBGRicsICcjOTkzM0NDJywgJyM5OTMzRkYnLCAnIzk5Q0MwMCcsICcjOTlDQzMzJywgJyNDQzAwMDAnLCAnI0NDMDAzMycsXG4gICcjQ0MwMDY2JywgJyNDQzAwOTknLCAnI0NDMDBDQycsICcjQ0MwMEZGJywgJyNDQzMzMDAnLCAnI0NDMzMzMycsICcjQ0MzMzY2JyxcbiAgJyNDQzMzOTknLCAnI0NDMzNDQycsICcjQ0MzM0ZGJywgJyNDQzY2MDAnLCAnI0NDNjYzMycsICcjQ0M5OTAwJywgJyNDQzk5MzMnLFxuICAnI0NDQ0MwMCcsICcjQ0NDQzMzJywgJyNGRjAwMDAnLCAnI0ZGMDAzMycsICcjRkYwMDY2JywgJyNGRjAwOTknLCAnI0ZGMDBDQycsXG4gICcjRkYwMEZGJywgJyNGRjMzMDAnLCAnI0ZGMzMzMycsICcjRkYzMzY2JywgJyNGRjMzOTknLCAnI0ZGMzNDQycsICcjRkYzM0ZGJyxcbiAgJyNGRjY2MDAnLCAnI0ZGNjYzMycsICcjRkY5OTAwJywgJyNGRjk5MzMnLCAnI0ZGQ0MwMCcsICcjRkZDQzMzJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgYW5kIEVkZ2UgZG8gbm90IHN1cHBvcnQgY29sb3JzLlxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goLyhlZGdlfHRyaWRlbnQpXFwvKFxcZCspLykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBpcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICAvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSkgfHxcbiAgICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8ICh3aW5kb3cuY29uc29sZS5leGNlcHRpb24gJiYgd2luZG93LmNvbnNvbGUudGFibGUpKSkgfHxcbiAgICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSkgfHxcbiAgICAvLyBkb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbih2KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyLm1lc3NhZ2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcbiAgdmFyIHVzZUNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXG4gIGFyZ3NbMF0gPSAodXNlQ29sb3JzID8gJyVjJyA6ICcnKVxuICAgICsgdGhpcy5uYW1lc3BhY2VcbiAgICArICh1c2VDb2xvcnMgPyAnICVjJyA6ICcgJylcbiAgICArIGFyZ3NbMF1cbiAgICArICh1c2VDb2xvcnMgPyAnJWMgJyA6ICcgJylcbiAgICArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICBpZiAoIXVzZUNvbG9ycykgcmV0dXJuO1xuXG4gIHZhciBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcbiAgYXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0JylcblxuICAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuICAvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG4gIC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEMgPSAwO1xuICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICBpZiAoJyUlJyA9PT0gbWF0Y2gpIHJldHVybjtcbiAgICBpbmRleCsrO1xuICAgIGlmICgnJWMnID09PSBtYXRjaCkge1xuICAgICAgLy8gd2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgbGFzdEMgPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb2coKSB7XG4gIC8vIHRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG4gIC8vIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG4gIHJldHVybiAnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbnNvbGVcbiAgICAmJiBjb25zb2xlLmxvZ1xuICAgICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUubG9nLCBjb25zb2xlLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobnVsbCA9PSBuYW1lc3BhY2VzKSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLmRlYnVnID0gbmFtZXNwYWNlcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge31cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB2YXIgcjtcbiAgdHJ5IHtcbiAgICByID0gZXhwb3J0cy5zdG9yYWdlLmRlYnVnO1xuICB9IGNhdGNoKGUpIHt9XG5cbiAgLy8gSWYgZGVidWcgaXNuJ3Qgc2V0IGluIExTLCBhbmQgd2UncmUgaW4gRWxlY3Ryb24sIHRyeSB0byBsb2FkICRERUJVR1xuICBpZiAoIXIgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICdlbnYnIGluIHByb2Nlc3MpIHtcbiAgICByID0gcHJvY2Vzcy5lbnYuREVCVUc7XG4gIH1cblxuICByZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYGxvY2FsU3RvcmFnZS5kZWJ1Z2AgaW5pdGlhbGx5LlxuICovXG5cbmV4cG9ydHMuZW5hYmxlKGxvYWQoKSk7XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlKSB7fVxufVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgeSA9IGQgKiAzNjUuMjU7XG5cbi8qKlxuICogUGFyc2Ugb3IgZm9ybWF0IHRoZSBnaXZlbiBgdmFsYC5cbiAqXG4gKiBPcHRpb25zOlxuICpcbiAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdXG4gKiBAdGhyb3dzIHtFcnJvcn0gdGhyb3cgYW4gZXJyb3IgaWYgdmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSBudW1iZXJcbiAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odmFsLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWw7XG4gIGlmICh0eXBlID09PSAnc3RyaW5nJyAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBwYXJzZSh2YWwpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmIGlzTmFOKHZhbCkgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGZtdExvbmcodmFsKSA6IGZtdFNob3J0KHZhbCk7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICd2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIHZhbGlkIG51bWJlci4gdmFsPScgK1xuICAgICAgSlNPTi5zdHJpbmdpZnkodmFsKVxuICApO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYHN0cmAgYW5kIHJldHVybiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gIHN0ciA9IFN0cmluZyhzdHIpO1xuICBpZiAoc3RyLmxlbmd0aCA+IDEwMCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbWF0Y2ggPSAvXigoPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKFxuICAgIHN0clxuICApO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3llYXJzJzpcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5cnMnOlxuICAgIGNhc2UgJ3lyJzpcbiAgICBjYXNlICd5JzpcbiAgICAgIHJldHVybiBuICogeTtcbiAgICBjYXNlICdkYXlzJzpcbiAgICBjYXNlICdkYXknOlxuICAgIGNhc2UgJ2QnOlxuICAgICAgcmV0dXJuIG4gKiBkO1xuICAgIGNhc2UgJ2hvdXJzJzpcbiAgICBjYXNlICdob3VyJzpcbiAgICBjYXNlICdocnMnOlxuICAgIGNhc2UgJ2hyJzpcbiAgICBjYXNlICdoJzpcbiAgICAgIHJldHVybiBuICogaDtcbiAgICBjYXNlICdtaW51dGVzJzpcbiAgICBjYXNlICdtaW51dGUnOlxuICAgIGNhc2UgJ21pbnMnOlxuICAgIGNhc2UgJ21pbic6XG4gICAgY2FzZSAnbSc6XG4gICAgICByZXR1cm4gbiAqIG07XG4gICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgY2FzZSAnc2Vjb25kJzpcbiAgICBjYXNlICdzZWNzJzpcbiAgICBjYXNlICdzZWMnOlxuICAgIGNhc2UgJ3MnOlxuICAgICAgcmV0dXJuIG4gKiBzO1xuICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgIGNhc2UgJ21zZWNzJzpcbiAgICBjYXNlICdtc2VjJzpcbiAgICBjYXNlICdtcyc6XG4gICAgICByZXR1cm4gbjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuXG4vKipcbiAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdFNob3J0KG1zKSB7XG4gIGlmIChtcyA+PSBkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJztcbiAgfVxuICBpZiAobXMgPj0gaCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCc7XG4gIH1cbiAgaWYgKG1zID49IG0pIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nO1xuICB9XG4gIGlmIChtcyA+PSBzKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJztcbiAgfVxuICByZXR1cm4gbXMgKyAnbXMnO1xufVxuXG4vKipcbiAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10TG9uZyhtcykge1xuICByZXR1cm4gcGx1cmFsKG1zLCBkLCAnZGF5JykgfHxcbiAgICBwbHVyYWwobXMsIGgsICdob3VyJykgfHxcbiAgICBwbHVyYWwobXMsIG0sICdtaW51dGUnKSB8fFxuICAgIHBsdXJhbChtcywgcywgJ3NlY29uZCcpIHx8XG4gICAgbXMgKyAnIG1zJztcbn1cblxuLyoqXG4gKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cbiAqL1xuXG5mdW5jdGlvbiBwbHVyYWwobXMsIG4sIG5hbWUpIHtcbiAgaWYgKG1zIDwgbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAobXMgPCBuICogMS41KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobXMgLyBuKSArICcgJyArIG5hbWU7XG4gIH1cbiAgcmV0dXJuIE1hdGguY2VpbChtcyAvIG4pICsgJyAnICsgbmFtZSArICdzJztcbn1cbiIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1wYXJzZXInKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBiaW5hcnkgPSByZXF1aXJlKCcuL2JpbmFyeScpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG52YXIgaXNCdWYgPSByZXF1aXJlKCcuL2lzLWJ1ZmZlcicpO1xuXG4vKipcbiAqIFByb3RvY29sIHZlcnNpb24uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnByb3RvY29sID0gNDtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZXMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnR5cGVzID0gW1xuICAnQ09OTkVDVCcsXG4gICdESVNDT05ORUNUJyxcbiAgJ0VWRU5UJyxcbiAgJ0FDSycsXG4gICdFUlJPUicsXG4gICdCSU5BUllfRVZFTlQnLFxuICAnQklOQVJZX0FDSydcbl07XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGNvbm5lY3RgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5DT05ORUNUID0gMDtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgZGlzY29ubmVjdGAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkRJU0NPTk5FQ1QgPSAxO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBldmVudGAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkVWRU5UID0gMjtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgYWNrYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuQUNLID0gMztcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgZXJyb3JgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5FUlJPUiA9IDQ7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgJ2JpbmFyeSBldmVudCdcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuQklOQVJZX0VWRU5UID0gNTtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgYmluYXJ5IGFja2AuIEZvciBhY2tzIHdpdGggYmluYXJ5IGFyZ3VtZW50cy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuQklOQVJZX0FDSyA9IDY7XG5cbi8qKlxuICogRW5jb2RlciBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRW5jb2RlciA9IEVuY29kZXI7XG5cbi8qKlxuICogRGVjb2RlciBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRGVjb2RlciA9IERlY29kZXI7XG5cbi8qKlxuICogQSBzb2NrZXQuaW8gRW5jb2RlciBpbnN0YW5jZVxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRW5jb2RlcigpIHt9XG5cbnZhciBFUlJPUl9QQUNLRVQgPSBleHBvcnRzLkVSUk9SICsgJ1wiZW5jb2RlIGVycm9yXCInO1xuXG4vKipcbiAqIEVuY29kZSBhIHBhY2tldCBhcyBhIHNpbmdsZSBzdHJpbmcgaWYgbm9uLWJpbmFyeSwgb3IgYXMgYVxuICogYnVmZmVyIHNlcXVlbmNlLCBkZXBlbmRpbmcgb24gcGFja2V0IHR5cGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiAtIHBhY2tldCBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gaGFuZGxlIGVuY29kaW5ncyAobGlrZWx5IGVuZ2luZS53cml0ZSlcbiAqIEByZXR1cm4gQ2FsbHMgY2FsbGJhY2sgd2l0aCBBcnJheSBvZiBlbmNvZGluZ3NcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW5jb2Rlci5wcm90b3R5cGUuZW5jb2RlID0gZnVuY3Rpb24ob2JqLCBjYWxsYmFjayl7XG4gIGRlYnVnKCdlbmNvZGluZyBwYWNrZXQgJWonLCBvYmopO1xuXG4gIGlmIChleHBvcnRzLkJJTkFSWV9FVkVOVCA9PT0gb2JqLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09PSBvYmoudHlwZSkge1xuICAgIGVuY29kZUFzQmluYXJ5KG9iaiwgY2FsbGJhY2spO1xuICB9IGVsc2Uge1xuICAgIHZhciBlbmNvZGluZyA9IGVuY29kZUFzU3RyaW5nKG9iaik7XG4gICAgY2FsbGJhY2soW2VuY29kaW5nXSk7XG4gIH1cbn07XG5cbi8qKlxuICogRW5jb2RlIHBhY2tldCBhcyBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7U3RyaW5nfSBlbmNvZGVkXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBlbmNvZGVBc1N0cmluZyhvYmopIHtcblxuICAvLyBmaXJzdCBpcyB0eXBlXG4gIHZhciBzdHIgPSAnJyArIG9iai50eXBlO1xuXG4gIC8vIGF0dGFjaG1lbnRzIGlmIHdlIGhhdmUgdGhlbVxuICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT09IG9iai50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PT0gb2JqLnR5cGUpIHtcbiAgICBzdHIgKz0gb2JqLmF0dGFjaG1lbnRzICsgJy0nO1xuICB9XG5cbiAgLy8gaWYgd2UgaGF2ZSBhIG5hbWVzcGFjZSBvdGhlciB0aGFuIGAvYFxuICAvLyB3ZSBhcHBlbmQgaXQgZm9sbG93ZWQgYnkgYSBjb21tYSBgLGBcbiAgaWYgKG9iai5uc3AgJiYgJy8nICE9PSBvYmoubnNwKSB7XG4gICAgc3RyICs9IG9iai5uc3AgKyAnLCc7XG4gIH1cblxuICAvLyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSB0aGUgaWRcbiAgaWYgKG51bGwgIT0gb2JqLmlkKSB7XG4gICAgc3RyICs9IG9iai5pZDtcbiAgfVxuXG4gIC8vIGpzb24gZGF0YVxuICBpZiAobnVsbCAhPSBvYmouZGF0YSkge1xuICAgIHZhciBwYXlsb2FkID0gdHJ5U3RyaW5naWZ5KG9iai5kYXRhKTtcbiAgICBpZiAocGF5bG9hZCAhPT0gZmFsc2UpIHtcbiAgICAgIHN0ciArPSBwYXlsb2FkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gRVJST1JfUEFDS0VUO1xuICAgIH1cbiAgfVxuXG4gIGRlYnVnKCdlbmNvZGVkICVqIGFzICVzJywgb2JqLCBzdHIpO1xuICByZXR1cm4gc3RyO1xufVxuXG5mdW5jdGlvbiB0cnlTdHJpbmdpZnkoc3RyKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHN0cik7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogRW5jb2RlIHBhY2tldCBhcyAnYnVmZmVyIHNlcXVlbmNlJyBieSByZW1vdmluZyBibG9icywgYW5kXG4gKiBkZWNvbnN0cnVjdGluZyBwYWNrZXQgaW50byBvYmplY3Qgd2l0aCBwbGFjZWhvbGRlcnMgYW5kXG4gKiBhIGxpc3Qgb2YgYnVmZmVycy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAcmV0dXJuIHtCdWZmZXJ9IGVuY29kZWRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGVuY29kZUFzQmluYXJ5KG9iaiwgY2FsbGJhY2spIHtcblxuICBmdW5jdGlvbiB3cml0ZUVuY29kaW5nKGJsb2JsZXNzRGF0YSkge1xuICAgIHZhciBkZWNvbnN0cnVjdGlvbiA9IGJpbmFyeS5kZWNvbnN0cnVjdFBhY2tldChibG9ibGVzc0RhdGEpO1xuICAgIHZhciBwYWNrID0gZW5jb2RlQXNTdHJpbmcoZGVjb25zdHJ1Y3Rpb24ucGFja2V0KTtcbiAgICB2YXIgYnVmZmVycyA9IGRlY29uc3RydWN0aW9uLmJ1ZmZlcnM7XG5cbiAgICBidWZmZXJzLnVuc2hpZnQocGFjayk7IC8vIGFkZCBwYWNrZXQgaW5mbyB0byBiZWdpbm5pbmcgb2YgZGF0YSBsaXN0XG4gICAgY2FsbGJhY2soYnVmZmVycyk7IC8vIHdyaXRlIGFsbCB0aGUgYnVmZmVyc1xuICB9XG5cbiAgYmluYXJ5LnJlbW92ZUJsb2JzKG9iaiwgd3JpdGVFbmNvZGluZyk7XG59XG5cbi8qKlxuICogQSBzb2NrZXQuaW8gRGVjb2RlciBpbnN0YW5jZVxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZGVjb2RlclxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBEZWNvZGVyKCkge1xuICB0aGlzLnJlY29uc3RydWN0b3IgPSBudWxsO1xufVxuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAgd2l0aCBEZWNvZGVyLlxuICovXG5cbkVtaXR0ZXIoRGVjb2Rlci5wcm90b3R5cGUpO1xuXG4vKipcbiAqIERlY29kZXMgYW4gZW5jb2RlZCBwYWNrZXQgc3RyaW5nIGludG8gcGFja2V0IEpTT04uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG9iaiAtIGVuY29kZWQgcGFja2V0XG4gKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5EZWNvZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHBhY2tldDtcbiAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgcGFja2V0ID0gZGVjb2RlU3RyaW5nKG9iaik7XG4gICAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09PSBwYWNrZXQudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT09IHBhY2tldC50eXBlKSB7IC8vIGJpbmFyeSBwYWNrZXQncyBqc29uXG4gICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBuZXcgQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpO1xuXG4gICAgICAvLyBubyBhdHRhY2htZW50cywgbGFiZWxlZCBiaW5hcnkgYnV0IG5vIGJpbmFyeSBkYXRhIHRvIGZvbGxvd1xuICAgICAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvci5yZWNvblBhY2suYXR0YWNobWVudHMgPT09IDApIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZWNvZGVkJywgcGFja2V0KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgeyAvLyBub24tYmluYXJ5IGZ1bGwgcGFja2V0XG4gICAgICB0aGlzLmVtaXQoJ2RlY29kZWQnLCBwYWNrZXQpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0J1ZihvYmopIHx8IG9iai5iYXNlNjQpIHsgLy8gcmF3IGJpbmFyeSBkYXRhXG4gICAgaWYgKCF0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZ290IGJpbmFyeSBkYXRhIHdoZW4gbm90IHJlY29uc3RydWN0aW5nIGEgcGFja2V0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhY2tldCA9IHRoaXMucmVjb25zdHJ1Y3Rvci50YWtlQmluYXJ5RGF0YShvYmopO1xuICAgICAgaWYgKHBhY2tldCkgeyAvLyByZWNlaXZlZCBmaW5hbCBidWZmZXJcbiAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbWl0KCdkZWNvZGVkJywgcGFja2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIHR5cGU6ICcgKyBvYmopO1xuICB9XG59O1xuXG4vKipcbiAqIERlY29kZSBhIHBhY2tldCBTdHJpbmcgKEpTT04gZGF0YSlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZGVjb2RlU3RyaW5nKHN0cikge1xuICB2YXIgaSA9IDA7XG4gIC8vIGxvb2sgdXAgdHlwZVxuICB2YXIgcCA9IHtcbiAgICB0eXBlOiBOdW1iZXIoc3RyLmNoYXJBdCgwKSlcbiAgfTtcblxuICBpZiAobnVsbCA9PSBleHBvcnRzLnR5cGVzW3AudHlwZV0pIHtcbiAgICByZXR1cm4gZXJyb3IoJ3Vua25vd24gcGFja2V0IHR5cGUgJyArIHAudHlwZSk7XG4gIH1cblxuICAvLyBsb29rIHVwIGF0dGFjaG1lbnRzIGlmIHR5cGUgYmluYXJ5XG4gIGlmIChleHBvcnRzLkJJTkFSWV9FVkVOVCA9PT0gcC50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PT0gcC50eXBlKSB7XG4gICAgdmFyIGJ1ZiA9ICcnO1xuICAgIHdoaWxlIChzdHIuY2hhckF0KCsraSkgIT09ICctJykge1xuICAgICAgYnVmICs9IHN0ci5jaGFyQXQoaSk7XG4gICAgICBpZiAoaSA9PSBzdHIubGVuZ3RoKSBicmVhaztcbiAgICB9XG4gICAgaWYgKGJ1ZiAhPSBOdW1iZXIoYnVmKSB8fCBzdHIuY2hhckF0KGkpICE9PSAnLScpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBhdHRhY2htZW50cycpO1xuICAgIH1cbiAgICBwLmF0dGFjaG1lbnRzID0gTnVtYmVyKGJ1Zik7XG4gIH1cblxuICAvLyBsb29rIHVwIG5hbWVzcGFjZSAoaWYgYW55KVxuICBpZiAoJy8nID09PSBzdHIuY2hhckF0KGkgKyAxKSkge1xuICAgIHAubnNwID0gJyc7XG4gICAgd2hpbGUgKCsraSkge1xuICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgaWYgKCcsJyA9PT0gYykgYnJlYWs7XG4gICAgICBwLm5zcCArPSBjO1xuICAgICAgaWYgKGkgPT09IHN0ci5sZW5ndGgpIGJyZWFrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwLm5zcCA9ICcvJztcbiAgfVxuXG4gIC8vIGxvb2sgdXAgaWRcbiAgdmFyIG5leHQgPSBzdHIuY2hhckF0KGkgKyAxKTtcbiAgaWYgKCcnICE9PSBuZXh0ICYmIE51bWJlcihuZXh0KSA9PSBuZXh0KSB7XG4gICAgcC5pZCA9ICcnO1xuICAgIHdoaWxlICgrK2kpIHtcbiAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgIGlmIChudWxsID09IGMgfHwgTnVtYmVyKGMpICE9IGMpIHtcbiAgICAgICAgLS1pO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHAuaWQgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgIGlmIChpID09PSBzdHIubGVuZ3RoKSBicmVhaztcbiAgICB9XG4gICAgcC5pZCA9IE51bWJlcihwLmlkKTtcbiAgfVxuXG4gIC8vIGxvb2sgdXAganNvbiBkYXRhXG4gIGlmIChzdHIuY2hhckF0KCsraSkpIHtcbiAgICB2YXIgcGF5bG9hZCA9IHRyeVBhcnNlKHN0ci5zdWJzdHIoaSkpO1xuICAgIHZhciBpc1BheWxvYWRWYWxpZCA9IHBheWxvYWQgIT09IGZhbHNlICYmIChwLnR5cGUgPT09IGV4cG9ydHMuRVJST1IgfHwgaXNBcnJheShwYXlsb2FkKSk7XG4gICAgaWYgKGlzUGF5bG9hZFZhbGlkKSB7XG4gICAgICBwLmRhdGEgPSBwYXlsb2FkO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZXJyb3IoJ2ludmFsaWQgcGF5bG9hZCcpO1xuICAgIH1cbiAgfVxuXG4gIGRlYnVnKCdkZWNvZGVkICVzIGFzICVqJywgc3RyLCBwKTtcbiAgcmV0dXJuIHA7XG59XG5cbmZ1bmN0aW9uIHRyeVBhcnNlKHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnBhcnNlKHN0cik7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogRGVhbGxvY2F0ZXMgYSBwYXJzZXIncyByZXNvdXJjZXNcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkRlY29kZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgIHRoaXMucmVjb25zdHJ1Y3Rvci5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7XG4gIH1cbn07XG5cbi8qKlxuICogQSBtYW5hZ2VyIG9mIGEgYmluYXJ5IGV2ZW50J3MgJ2J1ZmZlciBzZXF1ZW5jZScuIFNob3VsZFxuICogYmUgY29uc3RydWN0ZWQgd2hlbmV2ZXIgYSBwYWNrZXQgb2YgdHlwZSBCSU5BUllfRVZFTlQgaXNcbiAqIGRlY29kZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7QmluYXJ5UmVjb25zdHJ1Y3Rvcn0gaW5pdGlhbGl6ZWQgcmVjb25zdHJ1Y3RvclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpIHtcbiAgdGhpcy5yZWNvblBhY2sgPSBwYWNrZXQ7XG4gIHRoaXMuYnVmZmVycyA9IFtdO1xufVxuXG4vKipcbiAqIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiBiaW5hcnkgZGF0YSByZWNlaXZlZCBmcm9tIGNvbm5lY3Rpb25cbiAqIGFmdGVyIGEgQklOQVJZX0VWRU5UIHBhY2tldC5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlciB8IEFycmF5QnVmZmVyfSBiaW5EYXRhIC0gdGhlIHJhdyBiaW5hcnkgZGF0YSByZWNlaXZlZFxuICogQHJldHVybiB7bnVsbCB8IE9iamVjdH0gcmV0dXJucyBudWxsIGlmIG1vcmUgYmluYXJ5IGRhdGEgaXMgZXhwZWN0ZWQgb3JcbiAqICAgYSByZWNvbnN0cnVjdGVkIHBhY2tldCBvYmplY3QgaWYgYWxsIGJ1ZmZlcnMgaGF2ZSBiZWVuIHJlY2VpdmVkLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuQmluYXJ5UmVjb25zdHJ1Y3Rvci5wcm90b3R5cGUudGFrZUJpbmFyeURhdGEgPSBmdW5jdGlvbihiaW5EYXRhKSB7XG4gIHRoaXMuYnVmZmVycy5wdXNoKGJpbkRhdGEpO1xuICBpZiAodGhpcy5idWZmZXJzLmxlbmd0aCA9PT0gdGhpcy5yZWNvblBhY2suYXR0YWNobWVudHMpIHsgLy8gZG9uZSB3aXRoIGJ1ZmZlciBsaXN0XG4gICAgdmFyIHBhY2tldCA9IGJpbmFyeS5yZWNvbnN0cnVjdFBhY2tldCh0aGlzLnJlY29uUGFjaywgdGhpcy5idWZmZXJzKTtcbiAgICB0aGlzLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICByZXR1cm4gcGFja2V0O1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBDbGVhbnMgdXAgYmluYXJ5IHBhY2tldCByZWNvbnN0cnVjdGlvbiB2YXJpYWJsZXMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuQmluYXJ5UmVjb25zdHJ1Y3Rvci5wcm90b3R5cGUuZmluaXNoZWRSZWNvbnN0cnVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlY29uUGFjayA9IG51bGw7XG4gIHRoaXMuYnVmZmVycyA9IFtdO1xufTtcblxuZnVuY3Rpb24gZXJyb3IobXNnKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogZXhwb3J0cy5FUlJPUixcbiAgICBkYXRhOiAncGFyc2VyIGVycm9yOiAnICsgbXNnXG4gIH07XG59XG4iLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBEdWUgdG8gdmFyaW91cyBicm93c2VyIGJ1Z3MsIHNvbWV0aW1lcyB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uIHdpbGwgYmUgdXNlZCBldmVuXG4gKiB3aGVuIHRoZSBicm93c2VyIHN1cHBvcnRzIHR5cGVkIGFycmF5cy5cbiAqXG4gKiBOb3RlOlxuICpcbiAqICAgLSBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsXG4gKiAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzguXG4gKlxuICogICAtIENocm9tZSA5LTEwIGlzIG1pc3NpbmcgdGhlIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24uXG4gKlxuICogICAtIElFMTAgaGFzIGEgYnJva2VuIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhcnJheXMgb2ZcbiAqICAgICBpbmNvcnJlY3QgbGVuZ3RoIGluIHNvbWUgc2l0dWF0aW9ucy5cblxuICogV2UgZGV0ZWN0IHRoZXNlIGJ1Z2d5IGJyb3dzZXJzIGFuZCBzZXQgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYCB0byBgZmFsc2VgIHNvIHRoZXlcbiAqIGdldCB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uLCB3aGljaCBpcyBzbG93ZXIgYnV0IGJlaGF2ZXMgY29ycmVjdGx5LlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUICE9PSB1bmRlZmluZWRcbiAgPyBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVFxuICA6IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuLypcbiAqIEV4cG9ydCBrTWF4TGVuZ3RoIGFmdGVyIHR5cGVkIGFycmF5IHN1cHBvcnQgaXMgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0cy5rTWF4TGVuZ3RoID0ga01heExlbmd0aCgpXG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBhcnIuX19wcm90b19fID0ge19fcHJvdG9fXzogVWludDhBcnJheS5wcm90b3R5cGUsIGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfX1cbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MiAmJiAvLyB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZFxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAgICAgICBhcnIuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24ga01heExlbmd0aCAoKSB7XG4gIHJldHVybiBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gMHg3ZmZmZmZmZlxuICAgIDogMHgzZmZmZmZmZlxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKHRoYXQsIGxlbmd0aCkge1xuICBpZiAoa01heExlbmd0aCgpIDwgbGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICBpZiAodGhhdCA9PT0gbnVsbCkge1xuICAgICAgdGhhdCA9IG5ldyBCdWZmZXIobGVuZ3RoKVxuICAgIH1cbiAgICB0aGF0Lmxlbmd0aCA9IGxlbmd0aFxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmdPck9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0lmIGVuY29kaW5nIGlzIHNwZWNpZmllZCB0aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUodGhpcywgYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKHRoaXMsIGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuLy8gVE9ETzogTGVnYWN5LCBub3QgbmVlZGVkIGFueW1vcmUuIFJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb24uXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gZnJvbSAodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpXG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBmcm9tT2JqZWN0KHRoYXQsIHZhbHVlKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKG51bGwsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbmlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICBCdWZmZXIucHJvdG90eXBlLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXkucHJvdG90eXBlXG4gIEJ1ZmZlci5fX3Byb3RvX18gPSBVaW50OEFycmF5XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuc3BlY2llcyAmJlxuICAgICAgQnVmZmVyW1N5bWJvbC5zcGVjaWVzXSA9PT0gQnVmZmVyKSB7XG4gICAgLy8gRml4IHN1YmFycmF5KCkgaW4gRVMyMDE2LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvOTdcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAodGhhdCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2MobnVsbCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlICh0aGF0LCBzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICB0aGF0W2ldID0gMFxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHRoYXQsIHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJlbmNvZGluZ1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgZW5jb2RpbmcnKVxuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuXG4gIHZhciBhY3R1YWwgPSB0aGF0LndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICB0aGF0ID0gdGhhdC5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlICh0aGF0LCBhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdGhhdFtpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyICh0aGF0LCBhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGFycmF5LmJ5dGVMZW5ndGggLy8gdGhpcyB0aHJvd3MgaWYgYGFycmF5YCBpcyBub3QgYSB2YWxpZCBBcnJheUJ1ZmZlclxuXG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdvZmZzZXRcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2xlbmd0aFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gYXJyYXlcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgdGhhdCA9IGZyb21BcnJheUxpa2UodGhhdCwgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAodGhhdCwgb2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIHZhciBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuKVxuXG4gICAgaWYgKHRoYXQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhhdFxuICAgIH1cblxuICAgIG9iai5jb3B5KHRoYXQsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gdGhhdFxuICB9XG5cbiAgaWYgKG9iaikge1xuICAgIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8ICdsZW5ndGgnIGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBpc25hbihvYmoubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIDApXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmopXG4gICAgfVxuXG4gICAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBpc0FycmF5KG9iai5kYXRhKSkge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqLmRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LicpXG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBrTWF4TGVuZ3RoKClgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0ga01heExlbmd0aCgpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIGtNYXhMZW5ndGgoKS50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IHN0cmluZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIGFuZCBgaXMtYnVmZmVyYCAoaW4gU2FmYXJpIDUtNykgdG8gZGV0ZWN0XG4vLyBCdWZmZXIgaW5zdGFuY2VzLlxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCB8IDBcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAoaXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJlxuICAgICAgICB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCB8IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICAvLyBsZWdhY3kgd3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpIC0gcmVtb3ZlIGluIHYwLjEzXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgdmFyIHJlcyA9IFtdXG5cbiAgdmFyIGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIHZhciBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICB2YXIgY29kZVBvaW50ID0gbnVsbFxuICAgIHZhciBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERikgPyAzXG4gICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKSA/IDJcbiAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgdmFyIHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxudmFyIE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICB2YXIgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICB2YXIgcmVzID0gJydcbiAgdmFyIGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47ICsraSkge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgdmFyIG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDIpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCA0KTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCB8fCAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiB1dGY4VG9CeXRlcyhuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgdmFyIGNvZGVQb2ludFxuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgdmFyIGJ5dGVzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGlzbmFuICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdmFsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG4iLCIvLyBicm93c2VyIHNoaW0gZm9yIHhtbGh0dHByZXF1ZXN0IG1vZHVsZVxuXG52YXIgaGFzQ09SUyA9IHJlcXVpcmUoJ2hhcy1jb3JzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgdmFyIHhkb21haW4gPSBvcHRzLnhkb21haW47XG5cbiAgLy8gc2NoZW1lIG11c3QgYmUgc2FtZSB3aGVuIHVzaWduIFhEb21haW5SZXF1ZXN0XG4gIC8vIGh0dHA6Ly9ibG9ncy5tc2RuLmNvbS9iL2llaW50ZXJuYWxzL2FyY2hpdmUvMjAxMC8wNS8xMy94ZG9tYWlucmVxdWVzdC1yZXN0cmljdGlvbnMtbGltaXRhdGlvbnMtYW5kLXdvcmthcm91bmRzLmFzcHhcbiAgdmFyIHhzY2hlbWUgPSBvcHRzLnhzY2hlbWU7XG5cbiAgLy8gWERvbWFpblJlcXVlc3QgaGFzIGEgZmxvdyBvZiBub3Qgc2VuZGluZyBjb29raWUsIHRoZXJlZm9yZSBpdCBzaG91bGQgYmUgZGlzYWJsZWQgYXMgYSBkZWZhdWx0LlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vQXV0b21hdHRpYy9lbmdpbmUuaW8tY2xpZW50L3B1bGwvMjE3XG4gIHZhciBlbmFibGVzWERSID0gb3B0cy5lbmFibGVzWERSO1xuXG4gIC8vIFhNTEh0dHBSZXF1ZXN0IGNhbiBiZSBkaXNhYmxlZCBvbiBJRVxuICB0cnkge1xuICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCBoYXNDT1JTKSkge1xuICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkgeyB9XG5cbiAgLy8gVXNlIFhEb21haW5SZXF1ZXN0IGZvciBJRTggaWYgZW5hYmxlc1hEUiBpcyB0cnVlXG4gIC8vIGJlY2F1c2UgbG9hZGluZyBiYXIga2VlcHMgZmxhc2hpbmcgd2hlbiB1c2luZyBqc29ucC1wb2xsaW5nXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS95dWppb3Nha2Evc29ja2UuaW8taWU4LWxvYWRpbmctZXhhbXBsZVxuICB0cnkge1xuICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIFhEb21haW5SZXF1ZXN0ICYmICF4c2NoZW1lICYmIGVuYWJsZXNYRFIpIHtcbiAgICAgIHJldHVybiBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHsgfVxuXG4gIGlmICgheGRvbWFpbikge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gbmV3IHNlbGZbWydBY3RpdmUnXS5jb25jYXQoJ09iamVjdCcpLmpvaW4oJ1gnKV0oJ01pY3Jvc29mdC5YTUxIVFRQJyk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG4gIH1cbn07XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYW5zcG9ydDtcblxuLyoqXG4gKiBUcmFuc3BvcnQgYWJzdHJhY3QgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBUcmFuc3BvcnQgKG9wdHMpIHtcbiAgdGhpcy5wYXRoID0gb3B0cy5wYXRoO1xuICB0aGlzLmhvc3RuYW1lID0gb3B0cy5ob3N0bmFtZTtcbiAgdGhpcy5wb3J0ID0gb3B0cy5wb3J0O1xuICB0aGlzLnNlY3VyZSA9IG9wdHMuc2VjdXJlO1xuICB0aGlzLnF1ZXJ5ID0gb3B0cy5xdWVyeTtcbiAgdGhpcy50aW1lc3RhbXBQYXJhbSA9IG9wdHMudGltZXN0YW1wUGFyYW07XG4gIHRoaXMudGltZXN0YW1wUmVxdWVzdHMgPSBvcHRzLnRpbWVzdGFtcFJlcXVlc3RzO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnJztcbiAgdGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQgfHwgZmFsc2U7XG4gIHRoaXMuc29ja2V0ID0gb3B0cy5zb2NrZXQ7XG4gIHRoaXMuZW5hYmxlc1hEUiA9IG9wdHMuZW5hYmxlc1hEUjtcblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5wZnggPSBvcHRzLnBmeDtcbiAgdGhpcy5rZXkgPSBvcHRzLmtleTtcbiAgdGhpcy5wYXNzcGhyYXNlID0gb3B0cy5wYXNzcGhyYXNlO1xuICB0aGlzLmNlcnQgPSBvcHRzLmNlcnQ7XG4gIHRoaXMuY2EgPSBvcHRzLmNhO1xuICB0aGlzLmNpcGhlcnMgPSBvcHRzLmNpcGhlcnM7XG4gIHRoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7XG4gIHRoaXMuZm9yY2VOb2RlID0gb3B0cy5mb3JjZU5vZGU7XG5cbiAgLy8gcmVzdWx0cyBvZiBSZWFjdE5hdGl2ZSBlbnZpcm9ubWVudCBkZXRlY3Rpb25cbiAgdGhpcy5pc1JlYWN0TmF0aXZlID0gb3B0cy5pc1JlYWN0TmF0aXZlO1xuXG4gIC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7XG4gIHRoaXMubG9jYWxBZGRyZXNzID0gb3B0cy5sb2NhbEFkZHJlc3M7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFRyYW5zcG9ydC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIEVtaXRzIGFuIGVycm9yLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge1RyYW5zcG9ydH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChtc2csIGRlc2MpIHtcbiAgdmFyIGVyciA9IG5ldyBFcnJvcihtc2cpO1xuICBlcnIudHlwZSA9ICdUcmFuc3BvcnRFcnJvcic7XG4gIGVyci5kZXNjcmlwdGlvbiA9IGRlc2M7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3BlbnMgdGhlIHRyYW5zcG9ydC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdjbG9zZWQnID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgJycgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJztcbiAgICB0aGlzLmRvT3BlbigpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENsb3NlcyB0aGUgdHJhbnNwb3J0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICgnb3BlbmluZycgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIHRoaXMuZG9DbG9zZSgpO1xuICAgIHRoaXMub25DbG9zZSgpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIG11bHRpcGxlIHBhY2tldHMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKHBhY2tldHMpIHtcbiAgaWYgKCdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy53cml0ZShwYWNrZXRzKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyYW5zcG9ydCBub3Qgb3BlbicpO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIG9wZW5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO1xuICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgdGhpcy5lbWl0KCdvcGVuJyk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aXRoIGRhdGEuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGFcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdmFyIHBhY2tldCA9IHBhcnNlci5kZWNvZGVQYWNrZXQoZGF0YSwgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSk7XG4gIHRoaXMub25QYWNrZXQocGFja2V0KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggYSBkZWNvZGVkIHBhY2tldC5cbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICB0aGlzLmVtaXQoJ3BhY2tldCcsIHBhY2tldCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGNsb3NlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gIHRoaXMuZW1pdCgnY2xvc2UnKTtcbn07XG4iLCIvKipcclxuICogUGFyc2VzIGFuIFVSSVxyXG4gKlxyXG4gKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbnZhciByZSA9IC9eKD86KD8hW146QF0rOlteOkBcXC9dKkApKGh0dHB8aHR0cHN8d3N8d3NzKTpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KCg/OlthLWYwLTldezAsNH06KXsyLDd9W2EtZjAtOV17MCw0fXxbXjpcXC8/I10qKSg/OjooXFxkKikpPykoKChcXC8oPzpbXj8jXSg/IVtePyNcXC9dKlxcLltePyNcXC8uXSsoPzpbPyNdfCQpKSkqXFwvPyk/KFtePyNcXC9dKikpKD86XFw/KFteI10qKSk/KD86IyguKikpPykvO1xyXG5cclxudmFyIHBhcnRzID0gW1xyXG4gICAgJ3NvdXJjZScsICdwcm90b2NvbCcsICdhdXRob3JpdHknLCAndXNlckluZm8nLCAndXNlcicsICdwYXNzd29yZCcsICdob3N0JywgJ3BvcnQnLCAncmVsYXRpdmUnLCAncGF0aCcsICdkaXJlY3RvcnknLCAnZmlsZScsICdxdWVyeScsICdhbmNob3InXHJcbl07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNldXJpKHN0cikge1xyXG4gICAgdmFyIHNyYyA9IHN0cixcclxuICAgICAgICBiID0gc3RyLmluZGV4T2YoJ1snKSxcclxuICAgICAgICBlID0gc3RyLmluZGV4T2YoJ10nKTtcclxuXHJcbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XHJcbiAgICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBiKSArIHN0ci5zdWJzdHJpbmcoYiwgZSkucmVwbGFjZSgvOi9nLCAnOycpICsgc3RyLnN1YnN0cmluZyhlLCBzdHIubGVuZ3RoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbSA9IHJlLmV4ZWMoc3RyIHx8ICcnKSxcclxuICAgICAgICB1cmkgPSB7fSxcclxuICAgICAgICBpID0gMTQ7XHJcblxyXG4gICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChiICE9IC0xICYmIGUgIT0gLTEpIHtcclxuICAgICAgICB1cmkuc291cmNlID0gc3JjO1xyXG4gICAgICAgIHVyaS5ob3N0ID0gdXJpLmhvc3Quc3Vic3RyaW5nKDEsIHVyaS5ob3N0Lmxlbmd0aCAtIDEpLnJlcGxhY2UoLzsvZywgJzonKTtcclxuICAgICAgICB1cmkuYXV0aG9yaXR5ID0gdXJpLmF1dGhvcml0eS5yZXBsYWNlKCdbJywgJycpLnJlcGxhY2UoJ10nLCAnJykucmVwbGFjZSgvOy9nLCAnOicpO1xyXG4gICAgICAgIHVyaS5pcHY2dXJpID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdXJpO1xyXG59O1xyXG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSBpc0J1ZjtcblxudmFyIHdpdGhOYXRpdmVCdWZmZXIgPSB0eXBlb2YgQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBCdWZmZXIuaXNCdWZmZXIgPT09ICdmdW5jdGlvbic7XG52YXIgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSAnZnVuY3Rpb24nO1xuXG52YXIgaXNWaWV3ID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyA/IEFycmF5QnVmZmVyLmlzVmlldyhvYmopIDogKG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBvYmogaXMgYSBidWZmZXIgb3IgYW4gYXJyYXlidWZmZXIuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNCdWYob2JqKSB7XG4gIHJldHVybiAod2l0aE5hdGl2ZUJ1ZmZlciAmJiBCdWZmZXIuaXNCdWZmZXIob2JqKSkgfHxcbiAgICAgICAgICAod2l0aE5hdGl2ZUFycmF5QnVmZmVyICYmIChvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBpc1ZpZXcob2JqKSkpO1xufVxuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIGVpbyA9IHJlcXVpcmUoJ2VuZ2luZS5pby1jbGllbnQnKTtcbnZhciBTb2NrZXQgPSByZXF1aXJlKCcuL3NvY2tldCcpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ3NvY2tldC5pby1wYXJzZXInKTtcbnZhciBvbiA9IHJlcXVpcmUoJy4vb24nKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnY29tcG9uZW50LWJpbmQnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6bWFuYWdlcicpO1xudmFyIGluZGV4T2YgPSByZXF1aXJlKCdpbmRleG9mJyk7XG52YXIgQmFja29mZiA9IHJlcXVpcmUoJ2JhY2tvMicpO1xuXG4vKipcbiAqIElFNisgaGFzT3duUHJvcGVydHlcbiAqL1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0c1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gTWFuYWdlcjtcblxuLyoqXG4gKiBgTWFuYWdlcmAgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGVuZ2luZSBpbnN0YW5jZSBvciBlbmdpbmUgdXJpL29wdHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIE1hbmFnZXIgKHVyaSwgb3B0cykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTWFuYWdlcikpIHJldHVybiBuZXcgTWFuYWdlcih1cmksIG9wdHMpO1xuICBpZiAodXJpICYmICgnb2JqZWN0JyA9PT0gdHlwZW9mIHVyaSkpIHtcbiAgICBvcHRzID0gdXJpO1xuICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgfVxuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICBvcHRzLnBhdGggPSBvcHRzLnBhdGggfHwgJy9zb2NrZXQuaW8nO1xuICB0aGlzLm5zcHMgPSB7fTtcbiAgdGhpcy5zdWJzID0gW107XG4gIHRoaXMub3B0cyA9IG9wdHM7XG4gIHRoaXMucmVjb25uZWN0aW9uKG9wdHMucmVjb25uZWN0aW9uICE9PSBmYWxzZSk7XG4gIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMob3B0cy5yZWNvbm5lY3Rpb25BdHRlbXB0cyB8fCBJbmZpbml0eSk7XG4gIHRoaXMucmVjb25uZWN0aW9uRGVsYXkob3B0cy5yZWNvbm5lY3Rpb25EZWxheSB8fCAxMDAwKTtcbiAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heChvcHRzLnJlY29ubmVjdGlvbkRlbGF5TWF4IHx8IDUwMDApO1xuICB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3Iob3B0cy5yYW5kb21pemF0aW9uRmFjdG9yIHx8IDAuNSk7XG4gIHRoaXMuYmFja29mZiA9IG5ldyBCYWNrb2ZmKHtcbiAgICBtaW46IHRoaXMucmVjb25uZWN0aW9uRGVsYXkoKSxcbiAgICBtYXg6IHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgoKSxcbiAgICBqaXR0ZXI6IHRoaXMucmFuZG9taXphdGlvbkZhY3RvcigpXG4gIH0pO1xuICB0aGlzLnRpbWVvdXQobnVsbCA9PSBvcHRzLnRpbWVvdXQgPyAyMDAwMCA6IG9wdHMudGltZW91dCk7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICB0aGlzLnVyaSA9IHVyaTtcbiAgdGhpcy5jb25uZWN0aW5nID0gW107XG4gIHRoaXMubGFzdFBpbmcgPSBudWxsO1xuICB0aGlzLmVuY29kaW5nID0gZmFsc2U7XG4gIHRoaXMucGFja2V0QnVmZmVyID0gW107XG4gIHZhciBfcGFyc2VyID0gb3B0cy5wYXJzZXIgfHwgcGFyc2VyO1xuICB0aGlzLmVuY29kZXIgPSBuZXcgX3BhcnNlci5FbmNvZGVyKCk7XG4gIHRoaXMuZGVjb2RlciA9IG5ldyBfcGFyc2VyLkRlY29kZXIoKTtcbiAgdGhpcy5hdXRvQ29ubmVjdCA9IG9wdHMuYXV0b0Nvbm5lY3QgIT09IGZhbHNlO1xuICBpZiAodGhpcy5hdXRvQ29ubmVjdCkgdGhpcy5vcGVuKCk7XG59XG5cbi8qKlxuICogUHJvcGFnYXRlIGdpdmVuIGV2ZW50IHRvIHNvY2tldHMgYW5kIGVtaXQgb24gYHRoaXNgXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuZW1pdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIGZvciAodmFyIG5zcCBpbiB0aGlzLm5zcHMpIHtcbiAgICBpZiAoaGFzLmNhbGwodGhpcy5uc3BzLCBuc3ApKSB7XG4gICAgICB0aGlzLm5zcHNbbnNwXS5lbWl0LmFwcGx5KHRoaXMubnNwc1tuc3BdLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBVcGRhdGUgYHNvY2tldC5pZGAgb2YgYWxsIHNvY2tldHNcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVTb2NrZXRJZHMgPSBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIG5zcCBpbiB0aGlzLm5zcHMpIHtcbiAgICBpZiAoaGFzLmNhbGwodGhpcy5uc3BzLCBuc3ApKSB7XG4gICAgICB0aGlzLm5zcHNbbnNwXS5pZCA9IHRoaXMuZ2VuZXJhdGVJZChuc3ApO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBnZW5lcmF0ZSBgc29ja2V0LmlkYCBmb3IgdGhlIGdpdmVuIGBuc3BgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5zcFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuZ2VuZXJhdGVJZCA9IGZ1bmN0aW9uIChuc3ApIHtcbiAgcmV0dXJuIChuc3AgPT09ICcvJyA/ICcnIDogKG5zcCArICcjJykpICsgdGhpcy5lbmdpbmUuaWQ7XG59O1xuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihNYW5hZ2VyLnByb3RvdHlwZSk7XG5cbi8qKlxuICogU2V0cyB0aGUgYHJlY29ubmVjdGlvbmAgY29uZmlnLlxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdHJ1ZS9mYWxzZSBpZiBpdCBzaG91bGQgYXV0b21hdGljYWxseSByZWNvbm5lY3RcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uO1xuICB0aGlzLl9yZWNvbm5lY3Rpb24gPSAhIXY7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSByZWNvbm5lY3Rpb24gYXR0ZW1wdHMgY29uZmlnLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXggcmVjb25uZWN0aW9uIGF0dGVtcHRzIGJlZm9yZSBnaXZpbmcgdXBcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uQXR0ZW1wdHMgPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cztcbiAgdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMgPSB2O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgZGVsYXkgYmV0d2VlbiByZWNvbm5lY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheVxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25EZWxheSA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5O1xuICB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheSA9IHY7XG4gIHRoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0TWluKHYpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbk1hbmFnZXIucHJvdG90eXBlLnJhbmRvbWl6YXRpb25GYWN0b3IgPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yO1xuICB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yID0gdjtcbiAgdGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRKaXR0ZXIodik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtYXhpbXVtIGRlbGF5IGJldHdlZW4gcmVjb25uZWN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsYXlcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uRGVsYXlNYXggPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heDtcbiAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXggPSB2O1xuICB0aGlzLmJhY2tvZmYgJiYgdGhpcy5iYWNrb2ZmLnNldE1heCh2KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGNvbm5lY3Rpb24gdGltZW91dC4gYGZhbHNlYCB0byBkaXNhYmxlXG4gKlxuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fdGltZW91dDtcbiAgdGhpcy5fdGltZW91dCA9IHY7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdGFydHMgdHJ5aW5nIHRvIHJlY29ubmVjdCBpZiByZWNvbm5lY3Rpb24gaXMgZW5hYmxlZCBhbmQgd2UgaGF2ZSBub3RcbiAqIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIHlldFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm1heWJlUmVjb25uZWN0T25PcGVuID0gZnVuY3Rpb24gKCkge1xuICAvLyBPbmx5IHRyeSB0byByZWNvbm5lY3QgaWYgaXQncyB0aGUgZmlyc3QgdGltZSB3ZSdyZSBjb25uZWN0aW5nXG4gIGlmICghdGhpcy5yZWNvbm5lY3RpbmcgJiYgdGhpcy5fcmVjb25uZWN0aW9uICYmIHRoaXMuYmFja29mZi5hdHRlbXB0cyA9PT0gMCkge1xuICAgIC8vIGtlZXBzIHJlY29ubmVjdGlvbiBmcm9tIGZpcmluZyB0d2ljZSBmb3IgdGhlIHNhbWUgcmVjb25uZWN0aW9uIGxvb3BcbiAgICB0aGlzLnJlY29ubmVjdCgpO1xuICB9XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0IGBzb2NrZXRgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbmFsLCBjYWxsYmFja1xuICogQHJldHVybiB7TWFuYWdlcn0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vcGVuID1cbk1hbmFnZXIucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoZm4sIG9wdHMpIHtcbiAgZGVidWcoJ3JlYWR5U3RhdGUgJXMnLCB0aGlzLnJlYWR5U3RhdGUpO1xuICBpZiAofnRoaXMucmVhZHlTdGF0ZS5pbmRleE9mKCdvcGVuJykpIHJldHVybiB0aGlzO1xuXG4gIGRlYnVnKCdvcGVuaW5nICVzJywgdGhpcy51cmkpO1xuICB0aGlzLmVuZ2luZSA9IGVpbyh0aGlzLnVyaSwgdGhpcy5vcHRzKTtcbiAgdmFyIHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJztcbiAgdGhpcy5za2lwUmVjb25uZWN0ID0gZmFsc2U7XG5cbiAgLy8gZW1pdCBgb3BlbmBcbiAgdmFyIG9wZW5TdWIgPSBvbihzb2NrZXQsICdvcGVuJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub25vcGVuKCk7XG4gICAgZm4gJiYgZm4oKTtcbiAgfSk7XG5cbiAgLy8gZW1pdCBgY29ubmVjdF9lcnJvcmBcbiAgdmFyIGVycm9yU3ViID0gb24oc29ja2V0LCAnZXJyb3InLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRlYnVnKCdjb25uZWN0X2Vycm9yJyk7XG4gICAgc2VsZi5jbGVhbnVwKCk7XG4gICAgc2VsZi5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gICAgc2VsZi5lbWl0QWxsKCdjb25uZWN0X2Vycm9yJywgZGF0YSk7XG4gICAgaWYgKGZuKSB7XG4gICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdDb25uZWN0aW9uIGVycm9yJyk7XG4gICAgICBlcnIuZGF0YSA9IGRhdGE7XG4gICAgICBmbihlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPbmx5IGRvIHRoaXMgaWYgdGhlcmUgaXMgbm8gZm4gdG8gaGFuZGxlIHRoZSBlcnJvclxuICAgICAgc2VsZi5tYXliZVJlY29ubmVjdE9uT3BlbigpO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gZW1pdCBgY29ubmVjdF90aW1lb3V0YFxuICBpZiAoZmFsc2UgIT09IHRoaXMuX3RpbWVvdXQpIHtcbiAgICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gICAgZGVidWcoJ2Nvbm5lY3QgYXR0ZW1wdCB3aWxsIHRpbWVvdXQgYWZ0ZXIgJWQnLCB0aW1lb3V0KTtcblxuICAgIC8vIHNldCB0aW1lclxuICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgZGVidWcoJ2Nvbm5lY3QgYXR0ZW1wdCB0aW1lZCBvdXQgYWZ0ZXIgJWQnLCB0aW1lb3V0KTtcbiAgICAgIG9wZW5TdWIuZGVzdHJveSgpO1xuICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICBzb2NrZXQuZW1pdCgnZXJyb3InLCAndGltZW91dCcpO1xuICAgICAgc2VsZi5lbWl0QWxsKCdjb25uZWN0X3RpbWVvdXQnLCB0aW1lb3V0KTtcbiAgICB9LCB0aW1lb3V0KTtcblxuICAgIHRoaXMuc3Vicy5wdXNoKHtcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHRoaXMuc3Vicy5wdXNoKG9wZW5TdWIpO1xuICB0aGlzLnN1YnMucHVzaChlcnJvclN1Yik7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBvcGVuLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ29wZW4nKTtcblxuICAvLyBjbGVhciBvbGQgc3Vic1xuICB0aGlzLmNsZWFudXAoKTtcblxuICAvLyBtYXJrIGFzIG9wZW5cbiAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO1xuICB0aGlzLmVtaXQoJ29wZW4nKTtcblxuICAvLyBhZGQgbmV3IHN1YnNcbiAgdmFyIHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdkYXRhJywgYmluZCh0aGlzLCAnb25kYXRhJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAncGluZycsIGJpbmQodGhpcywgJ29ucGluZycpKSk7XG4gIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ3BvbmcnLCBiaW5kKHRoaXMsICdvbnBvbmcnKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdlcnJvcicsIGJpbmQodGhpcywgJ29uZXJyb3InKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdjbG9zZScsIGJpbmQodGhpcywgJ29uY2xvc2UnKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbih0aGlzLmRlY29kZXIsICdkZWNvZGVkJywgYmluZCh0aGlzLCAnb25kZWNvZGVkJykpKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBwaW5nLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9ucGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5sYXN0UGluZyA9IG5ldyBEYXRlKCk7XG4gIHRoaXMuZW1pdEFsbCgncGluZycpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBhIHBhY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbnBvbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW1pdEFsbCgncG9uZycsIG5ldyBEYXRlKCkgLSB0aGlzLmxhc3RQaW5nKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggZGF0YS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbmRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLmRlY29kZXIuYWRkKGRhdGEpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2hlbiBwYXJzZXIgZnVsbHkgZGVjb2RlcyBhIHBhY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbmRlY29kZWQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc29ja2V0IGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gIGRlYnVnKCdlcnJvcicsIGVycik7XG4gIHRoaXMuZW1pdEFsbCgnZXJyb3InLCBlcnIpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHNvY2tldCBmb3IgdGhlIGdpdmVuIGBuc3BgLlxuICpcbiAqIEByZXR1cm4ge1NvY2tldH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuc29ja2V0ID0gZnVuY3Rpb24gKG5zcCwgb3B0cykge1xuICB2YXIgc29ja2V0ID0gdGhpcy5uc3BzW25zcF07XG4gIGlmICghc29ja2V0KSB7XG4gICAgc29ja2V0ID0gbmV3IFNvY2tldCh0aGlzLCBuc3AsIG9wdHMpO1xuICAgIHRoaXMubnNwc1tuc3BdID0gc29ja2V0O1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3RpbmcnLCBvbkNvbm5lY3RpbmcpO1xuICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNvY2tldC5pZCA9IHNlbGYuZ2VuZXJhdGVJZChuc3ApO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYXV0b0Nvbm5lY3QpIHtcbiAgICAgIC8vIG1hbnVhbGx5IGNhbGwgaGVyZSBzaW5jZSBjb25uZWN0aW5nIGV2ZW50IGlzIGZpcmVkIGJlZm9yZSBsaXN0ZW5pbmdcbiAgICAgIG9uQ29ubmVjdGluZygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29ubmVjdGluZyAoKSB7XG4gICAgaWYgKCF+aW5kZXhPZihzZWxmLmNvbm5lY3RpbmcsIHNvY2tldCkpIHtcbiAgICAgIHNlbGYuY29ubmVjdGluZy5wdXNoKHNvY2tldCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNvY2tldDtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBzb2NrZXQgY2xvc2UuXG4gKlxuICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldFxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoc29ja2V0KSB7XG4gIHZhciBpbmRleCA9IGluZGV4T2YodGhpcy5jb25uZWN0aW5nLCBzb2NrZXQpO1xuICBpZiAofmluZGV4KSB0aGlzLmNvbm5lY3Rpbmcuc3BsaWNlKGluZGV4LCAxKTtcbiAgaWYgKHRoaXMuY29ubmVjdGluZy5sZW5ndGgpIHJldHVybjtcblxuICB0aGlzLmNsb3NlKCk7XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHBhY2tldC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5wYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIGRlYnVnKCd3cml0aW5nIHBhY2tldCAlaicsIHBhY2tldCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgaWYgKHBhY2tldC5xdWVyeSAmJiBwYWNrZXQudHlwZSA9PT0gMCkgcGFja2V0Lm5zcCArPSAnPycgKyBwYWNrZXQucXVlcnk7XG5cbiAgaWYgKCFzZWxmLmVuY29kaW5nKSB7XG4gICAgLy8gZW5jb2RlLCB0aGVuIHdyaXRlIHRvIGVuZ2luZSB3aXRoIHJlc3VsdFxuICAgIHNlbGYuZW5jb2RpbmcgPSB0cnVlO1xuICAgIHRoaXMuZW5jb2Rlci5lbmNvZGUocGFja2V0LCBmdW5jdGlvbiAoZW5jb2RlZFBhY2tldHMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5jb2RlZFBhY2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2VsZi5lbmdpbmUud3JpdGUoZW5jb2RlZFBhY2tldHNbaV0sIHBhY2tldC5vcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHNlbGYuZW5jb2RpbmcgPSBmYWxzZTtcbiAgICAgIHNlbGYucHJvY2Vzc1BhY2tldFF1ZXVlKCk7XG4gICAgfSk7XG4gIH0gZWxzZSB7IC8vIGFkZCBwYWNrZXQgdG8gdGhlIHF1ZXVlXG4gICAgc2VsZi5wYWNrZXRCdWZmZXIucHVzaChwYWNrZXQpO1xuICB9XG59O1xuXG4vKipcbiAqIElmIHBhY2tldCBidWZmZXIgaXMgbm9uLWVtcHR5LCBiZWdpbnMgZW5jb2RpbmcgdGhlXG4gKiBuZXh0IHBhY2tldCBpbiBsaW5lLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnByb2Nlc3NQYWNrZXRRdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMucGFja2V0QnVmZmVyLmxlbmd0aCA+IDAgJiYgIXRoaXMuZW5jb2RpbmcpIHtcbiAgICB2YXIgcGFjayA9IHRoaXMucGFja2V0QnVmZmVyLnNoaWZ0KCk7XG4gICAgdGhpcy5wYWNrZXQocGFjayk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2xlYW4gdXAgdHJhbnNwb3J0IHN1YnNjcmlwdGlvbnMgYW5kIHBhY2tldCBidWZmZXIuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ2NsZWFudXAnKTtcblxuICB2YXIgc3Vic0xlbmd0aCA9IHRoaXMuc3Vicy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3Vic0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHN1YiA9IHRoaXMuc3Vicy5zaGlmdCgpO1xuICAgIHN1Yi5kZXN0cm95KCk7XG4gIH1cblxuICB0aGlzLnBhY2tldEJ1ZmZlciA9IFtdO1xuICB0aGlzLmVuY29kaW5nID0gZmFsc2U7XG4gIHRoaXMubGFzdFBpbmcgPSBudWxsO1xuXG4gIHRoaXMuZGVjb2Rlci5kZXN0cm95KCk7XG59O1xuXG4vKipcbiAqIENsb3NlIHRoZSBjdXJyZW50IHNvY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5jbG9zZSA9XG5NYW5hZ2VyLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1ZygnZGlzY29ubmVjdCcpO1xuICB0aGlzLnNraXBSZWNvbm5lY3QgPSB0cnVlO1xuICB0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICBpZiAoJ29wZW5pbmcnID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAvLyBgb25jbG9zZWAgd2lsbCBub3QgZmlyZSBiZWNhdXNlXG4gICAgLy8gYW4gb3BlbiBldmVudCBuZXZlciBoYXBwZW5lZFxuICAgIHRoaXMuY2xlYW51cCgpO1xuICB9XG4gIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgaWYgKHRoaXMuZW5naW5lKSB0aGlzLmVuZ2luZS5jbG9zZSgpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgY2xvc2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25jbG9zZSA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgZGVidWcoJ29uY2xvc2UnKTtcblxuICB0aGlzLmNsZWFudXAoKTtcbiAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICB0aGlzLmVtaXQoJ2Nsb3NlJywgcmVhc29uKTtcblxuICBpZiAodGhpcy5fcmVjb25uZWN0aW9uICYmICF0aGlzLnNraXBSZWNvbm5lY3QpIHtcbiAgICB0aGlzLnJlY29ubmVjdCgpO1xuICB9XG59O1xuXG4vKipcbiAqIEF0dGVtcHQgYSByZWNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5yZWNvbm5lY3RpbmcgfHwgdGhpcy5za2lwUmVjb25uZWN0KSByZXR1cm4gdGhpcztcblxuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKHRoaXMuYmFja29mZi5hdHRlbXB0cyA+PSB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cykge1xuICAgIGRlYnVnKCdyZWNvbm5lY3QgZmFpbGVkJyk7XG4gICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgdGhpcy5lbWl0QWxsKCdyZWNvbm5lY3RfZmFpbGVkJyk7XG4gICAgdGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZGVsYXkgPSB0aGlzLmJhY2tvZmYuZHVyYXRpb24oKTtcbiAgICBkZWJ1Zygnd2lsbCB3YWl0ICVkbXMgYmVmb3JlIHJlY29ubmVjdCBhdHRlbXB0JywgZGVsYXkpO1xuXG4gICAgdGhpcy5yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdCkgcmV0dXJuO1xuXG4gICAgICBkZWJ1ZygnYXR0ZW1wdGluZyByZWNvbm5lY3QnKTtcbiAgICAgIHNlbGYuZW1pdEFsbCgncmVjb25uZWN0X2F0dGVtcHQnLCBzZWxmLmJhY2tvZmYuYXR0ZW1wdHMpO1xuICAgICAgc2VsZi5lbWl0QWxsKCdyZWNvbm5lY3RpbmcnLCBzZWxmLmJhY2tvZmYuYXR0ZW1wdHMpO1xuXG4gICAgICAvLyBjaGVjayBhZ2FpbiBmb3IgdGhlIGNhc2Ugc29ja2V0IGNsb3NlZCBpbiBhYm92ZSBldmVudHNcbiAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpIHJldHVybjtcblxuICAgICAgc2VsZi5vcGVuKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGRlYnVnKCdyZWNvbm5lY3QgYXR0ZW1wdCBlcnJvcicpO1xuICAgICAgICAgIHNlbGYucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgICAgc2VsZi5yZWNvbm5lY3QoKTtcbiAgICAgICAgICBzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdF9lcnJvcicsIGVyci5kYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWJ1ZygncmVjb25uZWN0IHN1Y2Nlc3MnKTtcbiAgICAgICAgICBzZWxmLm9ucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIGRlbGF5KTtcblxuICAgIHRoaXMuc3Vicy5wdXNoKHtcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzdWNjZXNzZnVsIHJlY29ubmVjdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbnJlY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGF0dGVtcHQgPSB0aGlzLmJhY2tvZmYuYXR0ZW1wdHM7XG4gIHRoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICB0aGlzLnVwZGF0ZVNvY2tldElkcygpO1xuICB0aGlzLmVtaXRBbGwoJ3JlY29ubmVjdCcsIGF0dGVtcHQpO1xufTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llc1xuICovXG5cbnZhciBYTUxIdHRwUmVxdWVzdCA9IHJlcXVpcmUoJ3htbGh0dHByZXF1ZXN0LXNzbCcpO1xudmFyIFhIUiA9IHJlcXVpcmUoJy4vcG9sbGluZy14aHInKTtcbnZhciBKU09OUCA9IHJlcXVpcmUoJy4vcG9sbGluZy1qc29ucCcpO1xudmFyIHdlYnNvY2tldCA9IHJlcXVpcmUoJy4vd2Vic29ja2V0Jyk7XG5cbi8qKlxuICogRXhwb3J0IHRyYW5zcG9ydHMuXG4gKi9cblxuZXhwb3J0cy5wb2xsaW5nID0gcG9sbGluZztcbmV4cG9ydHMud2Vic29ja2V0ID0gd2Vic29ja2V0O1xuXG4vKipcbiAqIFBvbGxpbmcgdHJhbnNwb3J0IHBvbHltb3JwaGljIGNvbnN0cnVjdG9yLlxuICogRGVjaWRlcyBvbiB4aHIgdnMganNvbnAgYmFzZWQgb24gZmVhdHVyZSBkZXRlY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcG9sbGluZyAob3B0cykge1xuICB2YXIgeGhyO1xuICB2YXIgeGQgPSBmYWxzZTtcbiAgdmFyIHhzID0gZmFsc2U7XG4gIHZhciBqc29ucCA9IGZhbHNlICE9PSBvcHRzLmpzb25wO1xuXG4gIGlmICh0eXBlb2YgbG9jYXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIGlzU1NMID0gJ2h0dHBzOicgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgIHZhciBwb3J0ID0gbG9jYXRpb24ucG9ydDtcblxuICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICBpZiAoIXBvcnQpIHtcbiAgICAgIHBvcnQgPSBpc1NTTCA/IDQ0MyA6IDgwO1xuICAgIH1cblxuICAgIHhkID0gb3B0cy5ob3N0bmFtZSAhPT0gbG9jYXRpb24uaG9zdG5hbWUgfHwgcG9ydCAhPT0gb3B0cy5wb3J0O1xuICAgIHhzID0gb3B0cy5zZWN1cmUgIT09IGlzU1NMO1xuICB9XG5cbiAgb3B0cy54ZG9tYWluID0geGQ7XG4gIG9wdHMueHNjaGVtZSA9IHhzO1xuICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cyk7XG5cbiAgaWYgKCdvcGVuJyBpbiB4aHIgJiYgIW9wdHMuZm9yY2VKU09OUCkge1xuICAgIHJldHVybiBuZXcgWEhSKG9wdHMpO1xuICB9IGVsc2Uge1xuICAgIGlmICghanNvbnApIHRocm93IG5ldyBFcnJvcignSlNPTlAgZGlzYWJsZWQnKTtcbiAgICByZXR1cm4gbmV3IEpTT05QKG9wdHMpO1xuICB9XG59XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIFRyYW5zcG9ydCA9IHJlcXVpcmUoJy4uL3RyYW5zcG9ydCcpO1xudmFyIHBhcnNlcXMgPSByZXF1aXJlKCdwYXJzZXFzJyk7XG52YXIgcGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xudmFyIGluaGVyaXQgPSByZXF1aXJlKCdjb21wb25lbnQtaW5oZXJpdCcpO1xudmFyIHllYXN0ID0gcmVxdWlyZSgneWVhc3QnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6cG9sbGluZycpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUG9sbGluZztcblxuLyoqXG4gKiBJcyBYSFIyIHN1cHBvcnRlZD9cbiAqL1xuXG52YXIgaGFzWEhSMiA9IChmdW5jdGlvbiAoKSB7XG4gIHZhciBYTUxIdHRwUmVxdWVzdCA9IHJlcXVpcmUoJ3htbGh0dHByZXF1ZXN0LXNzbCcpO1xuICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KHsgeGRvbWFpbjogZmFsc2UgfSk7XG4gIHJldHVybiBudWxsICE9IHhoci5yZXNwb25zZVR5cGU7XG59KSgpO1xuXG4vKipcbiAqIFBvbGxpbmcgaW50ZXJmYWNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBQb2xsaW5nIChvcHRzKSB7XG4gIHZhciBmb3JjZUJhc2U2NCA9IChvcHRzICYmIG9wdHMuZm9yY2VCYXNlNjQpO1xuICBpZiAoIWhhc1hIUjIgfHwgZm9yY2VCYXNlNjQpIHtcbiAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG4gIH1cbiAgVHJhbnNwb3J0LmNhbGwodGhpcywgb3B0cyk7XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXG4gKi9cblxuaW5oZXJpdChQb2xsaW5nLCBUcmFuc3BvcnQpO1xuXG4vKipcbiAqIFRyYW5zcG9ydCBuYW1lLlxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLm5hbWUgPSAncG9sbGluZyc7XG5cbi8qKlxuICogT3BlbnMgdGhlIHNvY2tldCAodHJpZ2dlcnMgcG9sbGluZykuIFdlIHdyaXRlIGEgUElORyBtZXNzYWdlIHRvIGRldGVybWluZVxuICogd2hlbiB0aGUgdHJhbnNwb3J0IGlzIG9wZW4uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUuZG9PcGVuID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnBvbGwoKTtcbn07XG5cbi8qKlxuICogUGF1c2VzIHBvbGxpbmcuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdXBvbiBidWZmZXJzIGFyZSBmbHVzaGVkIGFuZCB0cmFuc3BvcnQgaXMgcGF1c2VkXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uIChvblBhdXNlKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLnJlYWR5U3RhdGUgPSAncGF1c2luZyc7XG5cbiAgZnVuY3Rpb24gcGF1c2UgKCkge1xuICAgIGRlYnVnKCdwYXVzZWQnKTtcbiAgICBzZWxmLnJlYWR5U3RhdGUgPSAncGF1c2VkJztcbiAgICBvblBhdXNlKCk7XG4gIH1cblxuICBpZiAodGhpcy5wb2xsaW5nIHx8ICF0aGlzLndyaXRhYmxlKSB7XG4gICAgdmFyIHRvdGFsID0gMDtcblxuICAgIGlmICh0aGlzLnBvbGxpbmcpIHtcbiAgICAgIGRlYnVnKCd3ZSBhcmUgY3VycmVudGx5IHBvbGxpbmcgLSB3YWl0aW5nIHRvIHBhdXNlJyk7XG4gICAgICB0b3RhbCsrO1xuICAgICAgdGhpcy5vbmNlKCdwb2xsQ29tcGxldGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlYnVnKCdwcmUtcGF1c2UgcG9sbGluZyBjb21wbGV0ZScpO1xuICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMud3JpdGFibGUpIHtcbiAgICAgIGRlYnVnKCd3ZSBhcmUgY3VycmVudGx5IHdyaXRpbmcgLSB3YWl0aW5nIHRvIHBhdXNlJyk7XG4gICAgICB0b3RhbCsrO1xuICAgICAgdGhpcy5vbmNlKCdkcmFpbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZGVidWcoJ3ByZS1wYXVzZSB3cml0aW5nIGNvbXBsZXRlJyk7XG4gICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBwYXVzZSgpO1xuICB9XG59O1xuXG4vKipcbiAqIFN0YXJ0cyBwb2xsaW5nIGN5Y2xlLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ3BvbGxpbmcnKTtcbiAgdGhpcy5wb2xsaW5nID0gdHJ1ZTtcbiAgdGhpcy5kb1BvbGwoKTtcbiAgdGhpcy5lbWl0KCdwb2xsJyk7XG59O1xuXG4vKipcbiAqIE92ZXJsb2FkcyBvbkRhdGEgdG8gZGV0ZWN0IHBheWxvYWRzLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgZGVidWcoJ3BvbGxpbmcgZ290IGRhdGEgJXMnLCBkYXRhKTtcbiAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gKHBhY2tldCwgaW5kZXgsIHRvdGFsKSB7XG4gICAgLy8gaWYgaXRzIHRoZSBmaXJzdCBtZXNzYWdlIHdlIGNvbnNpZGVyIHRoZSB0cmFuc3BvcnQgb3BlblxuICAgIGlmICgnb3BlbmluZycgPT09IHNlbGYucmVhZHlTdGF0ZSkge1xuICAgICAgc2VsZi5vbk9wZW4oKTtcbiAgICB9XG5cbiAgICAvLyBpZiBpdHMgYSBjbG9zZSBwYWNrZXQsIHdlIGNsb3NlIHRoZSBvbmdvaW5nIHJlcXVlc3RzXG4gICAgaWYgKCdjbG9zZScgPT09IHBhY2tldC50eXBlKSB7XG4gICAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBvdGhlcndpc2UgYnlwYXNzIG9uRGF0YSBhbmQgaGFuZGxlIHRoZSBtZXNzYWdlXG4gICAgc2VsZi5vblBhY2tldChwYWNrZXQpO1xuICB9O1xuXG4gIC8vIGRlY29kZSBwYXlsb2FkXG4gIHBhcnNlci5kZWNvZGVQYXlsb2FkKGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUsIGNhbGxiYWNrKTtcblxuICAvLyBpZiBhbiBldmVudCBkaWQgbm90IHRyaWdnZXIgY2xvc2luZ1xuICBpZiAoJ2Nsb3NlZCcgIT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIC8vIGlmIHdlIGdvdCBkYXRhIHdlJ3JlIG5vdCBwb2xsaW5nXG4gICAgdGhpcy5wb2xsaW5nID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0KCdwb2xsQ29tcGxldGUnKTtcblxuICAgIGlmICgnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgdGhpcy5wb2xsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnKCdpZ25vcmluZyBwb2xsIC0gdHJhbnNwb3J0IHN0YXRlIFwiJXNcIicsIHRoaXMucmVhZHlTdGF0ZSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEZvciBwb2xsaW5nLCBzZW5kIGEgY2xvc2UgcGFja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLmRvQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBmdW5jdGlvbiBjbG9zZSAoKSB7XG4gICAgZGVidWcoJ3dyaXRpbmcgY2xvc2UgcGFja2V0Jyk7XG4gICAgc2VsZi53cml0ZShbeyB0eXBlOiAnY2xvc2UnIH1dKTtcbiAgfVxuXG4gIGlmICgnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIGRlYnVnKCd0cmFuc3BvcnQgb3BlbiAtIGNsb3NpbmcnKTtcbiAgICBjbG9zZSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGluIGNhc2Ugd2UncmUgdHJ5aW5nIHRvIGNsb3NlIHdoaWxlXG4gICAgLy8gaGFuZHNoYWtpbmcgaXMgaW4gcHJvZ3Jlc3MgKEdILTE2NClcbiAgICBkZWJ1ZygndHJhbnNwb3J0IG5vdCBvcGVuIC0gZGVmZXJyaW5nIGNsb3NlJyk7XG4gICAgdGhpcy5vbmNlKCdvcGVuJywgY2xvc2UpO1xuICB9XG59O1xuXG4vKipcbiAqIFdyaXRlcyBhIHBhY2tldHMgcGF5bG9hZC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIHBhY2tldHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGRyYWluIGNhbGxiYWNrXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChwYWNrZXRzKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICB2YXIgY2FsbGJhY2tmbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBzZWxmLmVtaXQoJ2RyYWluJyk7XG4gIH07XG5cbiAgcGFyc2VyLmVuY29kZVBheWxvYWQocGFja2V0cywgdGhpcy5zdXBwb3J0c0JpbmFyeSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBzZWxmLmRvV3JpdGUoZGF0YSwgY2FsbGJhY2tmbik7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLnVyaSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgdmFyIHNjaGVtYSA9IHRoaXMuc2VjdXJlID8gJ2h0dHBzJyA6ICdodHRwJztcbiAgdmFyIHBvcnQgPSAnJztcblxuICAvLyBjYWNoZSBidXN0aW5nIGlzIGZvcmNlZFxuICBpZiAoZmFsc2UgIT09IHRoaXMudGltZXN0YW1wUmVxdWVzdHMpIHtcbiAgICBxdWVyeVt0aGlzLnRpbWVzdGFtcFBhcmFtXSA9IHllYXN0KCk7XG4gIH1cblxuICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgIXF1ZXJ5LnNpZCkge1xuICAgIHF1ZXJ5LmI2NCA9IDE7XG4gIH1cblxuICBxdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTtcblxuICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICBpZiAodGhpcy5wb3J0ICYmICgoJ2h0dHBzJyA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLnBvcnQpICE9PSA0NDMpIHx8XG4gICAgICgnaHR0cCcgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5wb3J0KSAhPT0gODApKSkge1xuICAgIHBvcnQgPSAnOicgKyB0aGlzLnBvcnQ7XG4gIH1cblxuICAvLyBwcmVwZW5kID8gdG8gcXVlcnlcbiAgaWYgKHF1ZXJ5Lmxlbmd0aCkge1xuICAgIHF1ZXJ5ID0gJz8nICsgcXVlcnk7XG4gIH1cblxuICB2YXIgaXB2NiA9IHRoaXMuaG9zdG5hbWUuaW5kZXhPZignOicpICE9PSAtMTtcbiAgcmV0dXJuIHNjaGVtYSArICc6Ly8nICsgKGlwdjYgPyAnWycgKyB0aGlzLmhvc3RuYW1lICsgJ10nIDogdGhpcy5ob3N0bmFtZSkgKyBwb3J0ICsgdGhpcy5wYXRoICsgcXVlcnk7XG59O1xuIiwiLyogZ2xvYmFsIEJsb2IgRmlsZSAqL1xuXG4vKlxuICogTW9kdWxlIHJlcXVpcmVtZW50cy5cbiAqL1xuXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKTtcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgdG9TdHJpbmcuY2FsbChCbG9iKSA9PT0gJ1tvYmplY3QgQmxvYkNvbnN0cnVjdG9yXSc7XG52YXIgd2l0aE5hdGl2ZUZpbGUgPSB0eXBlb2YgRmlsZSA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIEZpbGUgIT09ICd1bmRlZmluZWQnICYmIHRvU3RyaW5nLmNhbGwoRmlsZSkgPT09ICdbb2JqZWN0IEZpbGVDb25zdHJ1Y3Rvcl0nO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gaGFzQmluYXJ5O1xuXG4vKipcbiAqIENoZWNrcyBmb3IgYmluYXJ5IGRhdGEuXG4gKlxuICogU3VwcG9ydHMgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQmxvYiBhbmQgRmlsZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYW55dGhpbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gaGFzQmluYXJ5IChvYmopIHtcbiAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoaGFzQmluYXJ5KG9ialtpXSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICgodHlwZW9mIEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBCdWZmZXIuaXNCdWZmZXIgJiYgQnVmZmVyLmlzQnVmZmVyKG9iaikpIHx8XG4gICAgKHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHxcbiAgICAod2l0aE5hdGl2ZUJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYikgfHxcbiAgICAod2l0aE5hdGl2ZUZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSlcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL2hhcy1iaW5hcnkvcHVsbC80XG4gIGlmIChvYmoudG9KU09OICYmIHR5cGVvZiBvYmoudG9KU09OID09PSAnZnVuY3Rpb24nICYmIGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gaGFzQmluYXJ5KG9iai50b0pTT04oKSwgdHJ1ZSk7XG4gIH1cblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYgaGFzQmluYXJ5KG9ialtrZXldKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpXG4gICwgbGVuZ3RoID0gNjRcbiAgLCBtYXAgPSB7fVxuICAsIHNlZWQgPSAwXG4gICwgaSA9IDBcbiAgLCBwcmV2O1xuXG4vKipcbiAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNwZWNpZmllZCBudW1iZXIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG51bSBUaGUgbnVtYmVyIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBudW1iZXIuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBlbmNvZGUobnVtKSB7XG4gIHZhciBlbmNvZGVkID0gJyc7XG5cbiAgZG8ge1xuICAgIGVuY29kZWQgPSBhbHBoYWJldFtudW0gJSBsZW5ndGhdICsgZW5jb2RlZDtcbiAgICBudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7XG4gIH0gd2hpbGUgKG51bSA+IDApO1xuXG4gIHJldHVybiBlbmNvZGVkO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgaW50ZWdlciB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIGdpdmVuIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBkZWNvZGUoc3RyKSB7XG4gIHZhciBkZWNvZGVkID0gMDtcblxuICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgZGVjb2RlZCA9IGRlY29kZWQgKiBsZW5ndGggKyBtYXBbc3RyLmNoYXJBdChpKV07XG4gIH1cblxuICByZXR1cm4gZGVjb2RlZDtcbn1cblxuLyoqXG4gKiBZZWFzdDogQSB0aW55IGdyb3dpbmcgaWQgZ2VuZXJhdG9yLlxuICpcbiAqIEByZXR1cm5zIHtTdHJpbmd9IEEgdW5pcXVlIGlkLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24geWVhc3QoKSB7XG4gIHZhciBub3cgPSBlbmNvZGUoK25ldyBEYXRlKCkpO1xuXG4gIGlmIChub3cgIT09IHByZXYpIHJldHVybiBzZWVkID0gMCwgcHJldiA9IG5vdztcbiAgcmV0dXJuIG5vdyArJy4nKyBlbmNvZGUoc2VlZCsrKTtcbn1cblxuLy9cbi8vIE1hcCBlYWNoIGNoYXJhY3RlciB0byBpdHMgaW5kZXguXG4vL1xuZm9yICg7IGkgPCBsZW5ndGg7IGkrKykgbWFwW2FscGhhYmV0W2ldXSA9IGk7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIGB5ZWFzdGAsIGBlbmNvZGVgIGFuZCBgZGVjb2RlYCBmdW5jdGlvbnMuXG4vL1xueWVhc3QuZW5jb2RlID0gZW5jb2RlO1xueWVhc3QuZGVjb2RlID0gZGVjb2RlO1xubW9kdWxlLmV4cG9ydHMgPSB5ZWFzdDtcbiIsIlxudmFyIGluZGV4T2YgPSBbXS5pbmRleE9mO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFyciwgb2JqKXtcbiAgaWYgKGluZGV4T2YpIHJldHVybiBhcnIuaW5kZXhPZihvYmopO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgIGlmIChhcnJbaV0gPT09IG9iaikgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIC0xO1xufTsiLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgcGFyc2VyID0gcmVxdWlyZSgnc29ja2V0LmlvLXBhcnNlcicpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIHRvQXJyYXkgPSByZXF1aXJlKCd0by1hcnJheScpO1xudmFyIG9uID0gcmVxdWlyZSgnLi9vbicpO1xudmFyIGJpbmQgPSByZXF1aXJlKCdjb21wb25lbnQtYmluZCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudDpzb2NrZXQnKTtcbnZhciBwYXJzZXFzID0gcmVxdWlyZSgncGFyc2VxcycpO1xudmFyIGhhc0JpbiA9IHJlcXVpcmUoJ2hhcy1iaW5hcnkyJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gU29ja2V0O1xuXG4vKipcbiAqIEludGVybmFsIGV2ZW50cyAoYmxhY2tsaXN0ZWQpLlxuICogVGhlc2UgZXZlbnRzIGNhbid0IGJlIGVtaXR0ZWQgYnkgdGhlIHVzZXIuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIGV2ZW50cyA9IHtcbiAgY29ubmVjdDogMSxcbiAgY29ubmVjdF9lcnJvcjogMSxcbiAgY29ubmVjdF90aW1lb3V0OiAxLFxuICBjb25uZWN0aW5nOiAxLFxuICBkaXNjb25uZWN0OiAxLFxuICBlcnJvcjogMSxcbiAgcmVjb25uZWN0OiAxLFxuICByZWNvbm5lY3RfYXR0ZW1wdDogMSxcbiAgcmVjb25uZWN0X2ZhaWxlZDogMSxcbiAgcmVjb25uZWN0X2Vycm9yOiAxLFxuICByZWNvbm5lY3Rpbmc6IDEsXG4gIHBpbmc6IDEsXG4gIHBvbmc6IDFcbn07XG5cbi8qKlxuICogU2hvcnRjdXQgdG8gYEVtaXR0ZXIjZW1pdGAuXG4gKi9cblxudmFyIGVtaXQgPSBFbWl0dGVyLnByb3RvdHlwZS5lbWl0O1xuXG4vKipcbiAqIGBTb2NrZXRgIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gU29ja2V0IChpbywgbnNwLCBvcHRzKSB7XG4gIHRoaXMuaW8gPSBpbztcbiAgdGhpcy5uc3AgPSBuc3A7XG4gIHRoaXMuanNvbiA9IHRoaXM7IC8vIGNvbXBhdFxuICB0aGlzLmlkcyA9IDA7XG4gIHRoaXMuYWNrcyA9IHt9O1xuICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gIHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgdGhpcy5mbGFncyA9IHt9O1xuICBpZiAob3B0cyAmJiBvcHRzLnF1ZXJ5KSB7XG4gICAgdGhpcy5xdWVyeSA9IG9wdHMucXVlcnk7XG4gIH1cbiAgaWYgKHRoaXMuaW8uYXV0b0Nvbm5lY3QpIHRoaXMub3BlbigpO1xufVxuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihTb2NrZXQucHJvdG90eXBlKTtcblxuLyoqXG4gKiBTdWJzY3JpYmUgdG8gb3BlbiwgY2xvc2UgYW5kIHBhY2tldCBldmVudHNcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnN1YkV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc3VicykgcmV0dXJuO1xuXG4gIHZhciBpbyA9IHRoaXMuaW87XG4gIHRoaXMuc3VicyA9IFtcbiAgICBvbihpbywgJ29wZW4nLCBiaW5kKHRoaXMsICdvbm9wZW4nKSksXG4gICAgb24oaW8sICdwYWNrZXQnLCBiaW5kKHRoaXMsICdvbnBhY2tldCcpKSxcbiAgICBvbihpbywgJ2Nsb3NlJywgYmluZCh0aGlzLCAnb25jbG9zZScpKVxuICBdO1xufTtcblxuLyoqXG4gKiBcIk9wZW5zXCIgdGhlIHNvY2tldC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUub3BlbiA9XG5Tb2NrZXQucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLmNvbm5lY3RlZCkgcmV0dXJuIHRoaXM7XG5cbiAgdGhpcy5zdWJFdmVudHMoKTtcbiAgdGhpcy5pby5vcGVuKCk7IC8vIGVuc3VyZSBvcGVuXG4gIGlmICgnb3BlbicgPT09IHRoaXMuaW8ucmVhZHlTdGF0ZSkgdGhpcy5vbm9wZW4oKTtcbiAgdGhpcy5lbWl0KCdjb25uZWN0aW5nJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZW5kcyBhIGBtZXNzYWdlYCBldmVudC5cbiAqXG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKCkge1xuICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgYXJncy51bnNoaWZ0KCdtZXNzYWdlJyk7XG4gIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGBlbWl0YC5cbiAqIElmIHRoZSBldmVudCBpcyBpbiBgZXZlbnRzYCwgaXQncyBlbWl0dGVkIG5vcm1hbGx5LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBuYW1lXG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGV2KSB7XG4gIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoZXYpKSB7XG4gICAgZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gIHZhciBwYWNrZXQgPSB7XG4gICAgdHlwZTogKHRoaXMuZmxhZ3MuYmluYXJ5ICE9PSB1bmRlZmluZWQgPyB0aGlzLmZsYWdzLmJpbmFyeSA6IGhhc0JpbihhcmdzKSkgPyBwYXJzZXIuQklOQVJZX0VWRU5UIDogcGFyc2VyLkVWRU5ULFxuICAgIGRhdGE6IGFyZ3NcbiAgfTtcblxuICBwYWNrZXQub3B0aW9ucyA9IHt9O1xuICBwYWNrZXQub3B0aW9ucy5jb21wcmVzcyA9ICF0aGlzLmZsYWdzIHx8IGZhbHNlICE9PSB0aGlzLmZsYWdzLmNvbXByZXNzO1xuXG4gIC8vIGV2ZW50IGFjayBjYWxsYmFja1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSkge1xuICAgIGRlYnVnKCdlbWl0dGluZyBwYWNrZXQgd2l0aCBhY2sgaWQgJWQnLCB0aGlzLmlkcyk7XG4gICAgdGhpcy5hY2tzW3RoaXMuaWRzXSA9IGFyZ3MucG9wKCk7XG4gICAgcGFja2V0LmlkID0gdGhpcy5pZHMrKztcbiAgfVxuXG4gIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgIHRoaXMucGFja2V0KHBhY2tldCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zZW5kQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgfVxuXG4gIHRoaXMuZmxhZ3MgPSB7fTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2VuZHMgYSBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5wYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHBhY2tldC5uc3AgPSB0aGlzLm5zcDtcbiAgdGhpcy5pby5wYWNrZXQocGFja2V0KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gZW5naW5lIGBvcGVuYC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ3RyYW5zcG9ydCBpcyBvcGVuIC0gY29ubmVjdGluZycpO1xuXG4gIC8vIHdyaXRlIGNvbm5lY3QgcGFja2V0IGlmIG5lY2Vzc2FyeVxuICBpZiAoJy8nICE9PSB0aGlzLm5zcCkge1xuICAgIGlmICh0aGlzLnF1ZXJ5KSB7XG4gICAgICB2YXIgcXVlcnkgPSB0eXBlb2YgdGhpcy5xdWVyeSA9PT0gJ29iamVjdCcgPyBwYXJzZXFzLmVuY29kZSh0aGlzLnF1ZXJ5KSA6IHRoaXMucXVlcnk7XG4gICAgICBkZWJ1Zygnc2VuZGluZyBjb25uZWN0IHBhY2tldCB3aXRoIHF1ZXJ5ICVzJywgcXVlcnkpO1xuICAgICAgdGhpcy5wYWNrZXQoe3R5cGU6IHBhcnNlci5DT05ORUNULCBxdWVyeTogcXVlcnl9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYWNrZXQoe3R5cGU6IHBhcnNlci5DT05ORUNUfSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGVuZ2luZSBgY2xvc2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWFzb25cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25jbG9zZSA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgZGVidWcoJ2Nsb3NlICglcyknLCByZWFzb24pO1xuICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICB0aGlzLmRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gIGRlbGV0ZSB0aGlzLmlkO1xuICB0aGlzLmVtaXQoJ2Rpc2Nvbm5lY3QnLCByZWFzb24pO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2l0aCBzb2NrZXQgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25wYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHZhciBzYW1lTmFtZXNwYWNlID0gcGFja2V0Lm5zcCA9PT0gdGhpcy5uc3A7XG4gIHZhciByb290TmFtZXNwYWNlRXJyb3IgPSBwYWNrZXQudHlwZSA9PT0gcGFyc2VyLkVSUk9SICYmIHBhY2tldC5uc3AgPT09ICcvJztcblxuICBpZiAoIXNhbWVOYW1lc3BhY2UgJiYgIXJvb3ROYW1lc3BhY2VFcnJvcikgcmV0dXJuO1xuXG4gIHN3aXRjaCAocGFja2V0LnR5cGUpIHtcbiAgICBjYXNlIHBhcnNlci5DT05ORUNUOlxuICAgICAgdGhpcy5vbmNvbm5lY3QoKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuRVZFTlQ6XG4gICAgICB0aGlzLm9uZXZlbnQocGFja2V0KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuQklOQVJZX0VWRU5UOlxuICAgICAgdGhpcy5vbmV2ZW50KHBhY2tldCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkFDSzpcbiAgICAgIHRoaXMub25hY2socGFja2V0KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuQklOQVJZX0FDSzpcbiAgICAgIHRoaXMub25hY2socGFja2V0KTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSBwYXJzZXIuRElTQ09OTkVDVDpcbiAgICAgIHRoaXMub25kaXNjb25uZWN0KCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkVSUk9SOlxuICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIHBhY2tldC5kYXRhKTtcbiAgICAgIGJyZWFrO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25ldmVudCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgdmFyIGFyZ3MgPSBwYWNrZXQuZGF0YSB8fCBbXTtcbiAgZGVidWcoJ2VtaXR0aW5nIGV2ZW50ICVqJywgYXJncyk7XG5cbiAgaWYgKG51bGwgIT0gcGFja2V0LmlkKSB7XG4gICAgZGVidWcoJ2F0dGFjaGluZyBhY2sgY2FsbGJhY2sgdG8gZXZlbnQnKTtcbiAgICBhcmdzLnB1c2godGhpcy5hY2socGFja2V0LmlkKSk7XG4gIH1cblxuICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICBlbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucmVjZWl2ZUJ1ZmZlci5wdXNoKGFyZ3MpO1xuICB9XG59O1xuXG4vKipcbiAqIFByb2R1Y2VzIGFuIGFjayBjYWxsYmFjayB0byBlbWl0IHdpdGggYW4gZXZlbnQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5hY2sgPSBmdW5jdGlvbiAoaWQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgc2VudCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIC8vIHByZXZlbnQgZG91YmxlIGNhbGxiYWNrc1xuICAgIGlmIChzZW50KSByZXR1cm47XG4gICAgc2VudCA9IHRydWU7XG4gICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gICAgZGVidWcoJ3NlbmRpbmcgYWNrICVqJywgYXJncyk7XG5cbiAgICBzZWxmLnBhY2tldCh7XG4gICAgICB0eXBlOiBoYXNCaW4oYXJncykgPyBwYXJzZXIuQklOQVJZX0FDSyA6IHBhcnNlci5BQ0ssXG4gICAgICBpZDogaWQsXG4gICAgICBkYXRhOiBhcmdzXG4gICAgfSk7XG4gIH07XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGFja25vd2xlZ2VtZW50LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25hY2sgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHZhciBhY2sgPSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBhY2spIHtcbiAgICBkZWJ1ZygnY2FsbGluZyBhY2sgJXMgd2l0aCAlaicsIHBhY2tldC5pZCwgcGFja2V0LmRhdGEpO1xuICAgIGFjay5hcHBseSh0aGlzLCBwYWNrZXQuZGF0YSk7XG4gICAgZGVsZXRlIHRoaXMuYWNrc1twYWNrZXQuaWRdO1xuICB9IGVsc2Uge1xuICAgIGRlYnVnKCdiYWQgYWNrICVzJywgcGFja2V0LmlkKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgY29ubmVjdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICB0aGlzLmRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xuICB0aGlzLmVtaXQoJ2Nvbm5lY3QnKTtcbiAgdGhpcy5lbWl0QnVmZmVyZWQoKTtcbn07XG5cbi8qKlxuICogRW1pdCBidWZmZXJlZCBldmVudHMgKHJlY2VpdmVkIGFuZCBlbWl0dGVkKS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmVtaXRCdWZmZXJlZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGk7XG4gIGZvciAoaSA9IDA7IGkgPCB0aGlzLnJlY2VpdmVCdWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICBlbWl0LmFwcGx5KHRoaXMsIHRoaXMucmVjZWl2ZUJ1ZmZlcltpXSk7XG4gIH1cbiAgdGhpcy5yZWNlaXZlQnVmZmVyID0gW107XG5cbiAgZm9yIChpID0gMDsgaSA8IHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgIHRoaXMucGFja2V0KHRoaXMuc2VuZEJ1ZmZlcltpXSk7XG4gIH1cbiAgdGhpcy5zZW5kQnVmZmVyID0gW107XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHNlcnZlciBkaXNjb25uZWN0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1Zygnc2VydmVyIGRpc2Nvbm5lY3QgKCVzKScsIHRoaXMubnNwKTtcbiAgdGhpcy5kZXN0cm95KCk7XG4gIHRoaXMub25jbG9zZSgnaW8gc2VydmVyIGRpc2Nvbm5lY3QnKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gZm9yY2VkIGNsaWVudC9zZXJ2ZXIgc2lkZSBkaXNjb25uZWN0aW9ucyxcbiAqIHRoaXMgbWV0aG9kIGVuc3VyZXMgdGhlIG1hbmFnZXIgc3RvcHMgdHJhY2tpbmcgdXMgYW5kXG4gKiB0aGF0IHJlY29ubmVjdGlvbnMgZG9uJ3QgZ2V0IHRyaWdnZXJlZCBmb3IgdGhpcy5cbiAqXG4gKiBAYXBpIHByaXZhdGUuXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zdWJzKSB7XG4gICAgLy8gY2xlYW4gc3Vic2NyaXB0aW9ucyB0byBhdm9pZCByZWNvbm5lY3Rpb25zXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN1YnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuc3Vic1tpXS5kZXN0cm95KCk7XG4gICAgfVxuICAgIHRoaXMuc3VicyA9IG51bGw7XG4gIH1cblxuICB0aGlzLmlvLmRlc3Ryb3kodGhpcyk7XG59O1xuXG4vKipcbiAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXQgbWFudWFsbHkuXG4gKlxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUuY2xvc2UgPVxuU29ja2V0LnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICBkZWJ1ZygncGVyZm9ybWluZyBkaXNjb25uZWN0ICglcyknLCB0aGlzLm5zcCk7XG4gICAgdGhpcy5wYWNrZXQoeyB0eXBlOiBwYXJzZXIuRElTQ09OTkVDVCB9KTtcbiAgfVxuXG4gIC8vIHJlbW92ZSBzb2NrZXQgZnJvbSBwb29sXG4gIHRoaXMuZGVzdHJveSgpO1xuXG4gIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgIC8vIGZpcmUgZXZlbnRzXG4gICAgdGhpcy5vbmNsb3NlKCdpbyBjbGllbnQgZGlzY29ubmVjdCcpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjb21wcmVzcyBmbGFnLlxuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaWYgYHRydWVgLCBjb21wcmVzc2VzIHRoZSBzZW5kaW5nIGRhdGFcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmNvbXByZXNzID0gZnVuY3Rpb24gKGNvbXByZXNzKSB7XG4gIHRoaXMuZmxhZ3MuY29tcHJlc3MgPSBjb21wcmVzcztcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGJpbmFyeSBmbGFnXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSB3aGV0aGVyIHRoZSBlbWl0dGVkIGRhdGEgY29udGFpbnMgYmluYXJ5XG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5iaW5hcnkgPSBmdW5jdGlvbiAoYmluYXJ5KSB7XG4gIHRoaXMuZmxhZ3MuYmluYXJ5ID0gYmluYXJ5O1xuICByZXR1cm4gdGhpcztcbn07XG4iLCJcbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBvbjtcblxuLyoqXG4gKiBIZWxwZXIgZm9yIHN1YnNjcmlwdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8RXZlbnRFbWl0dGVyfSBvYmogd2l0aCBgRW1pdHRlcmAgbWl4aW4gb3IgYEV2ZW50RW1pdHRlcmBcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBuYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBvbiAob2JqLCBldiwgZm4pIHtcbiAgb2JqLm9uKGV2LCBmbik7XG4gIHJldHVybiB7XG4gICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgb2JqLnJlbW92ZUxpc3RlbmVyKGV2LCBmbik7XG4gICAgfVxuICB9O1xufVxuIiwiLyoqXG4gKiBTbGljZSByZWZlcmVuY2UuXG4gKi9cblxudmFyIHNsaWNlID0gW10uc2xpY2U7XG5cbi8qKlxuICogQmluZCBgb2JqYCB0byBgZm5gLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBmbiBvciBzdHJpbmdcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgZm4pe1xuICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGZuKSBmbiA9IG9ialtmbl07XG4gIGlmICgnZnVuY3Rpb24nICE9IHR5cGVvZiBmbikgdGhyb3cgbmV3IEVycm9yKCdiaW5kKCkgcmVxdWlyZXMgYSBmdW5jdGlvbicpO1xuICB2YXIgYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KG9iaiwgYXJncy5jb25jYXQoc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gIH1cbn07XG4iLCJpbXBvcnQgKiBhcyBpbyBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcblxudmFyIHNvY2tldCA9IGlvKCdodHRwOi8vbG9jYWxob3N0OjUwMDAvJyk7XG5zb2NrZXQub24oJ21lc3NhZ2UnLCBmdW5jdGlvbihkYXRhOiBhbnkpIHtcbiAgY29uc29sZS5sb2coZGF0YSk7XG59KTtcblxudmFyIG1vdmVtZW50ID0ge1xuICB1cDogZmFsc2UsXG4gIGRvd246IGZhbHNlLFxuICBsZWZ0OiBmYWxzZSxcbiAgcmlnaHQ6IGZhbHNlLFxufTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGV2ZW50OiBhbnkpIHtcbiAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgY2FzZSA2NTogLy8gQVxuICAgICAgbW92ZW1lbnQubGVmdCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDg3OiAvLyBXXG4gICAgICBtb3ZlbWVudC51cCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDY4OiAvLyBEXG4gICAgICBtb3ZlbWVudC5yaWdodCA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDgzOiAvLyBTXG4gICAgICBtb3ZlbWVudC5kb3duID0gdHJ1ZTtcbiAgICAgIGJyZWFrO1xuICB9XG59KTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQ6IGFueSkge1xuICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcbiAgICBjYXNlIDY1OiAvLyBBXG4gICAgICBtb3ZlbWVudC5sZWZ0ID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDg3OiAvLyBXXG4gICAgICBtb3ZlbWVudC51cCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSA2ODogLy8gRFxuICAgICAgbW92ZW1lbnQucmlnaHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgODM6IC8vIFNcbiAgICAgIG1vdmVtZW50LmRvd24gPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICB9XG59KTtcblxuc29ja2V0LmVtaXQoJ25ldyBwbGF5ZXInKTtcbnNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICBzb2NrZXQuZW1pdCgnbW92ZW1lbnQnLCBtb3ZlbWVudCk7XG59LCAxMDAwIC8gNjApO1xuXG5jb25zdCBjYW52YXM6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbmNhbnZhcy53aWR0aCA9IDgwMDtcbmNhbnZhcy5oZWlnaHQgPSA2MDA7XG5jb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5jb250ZXh0LmZvbnQgPSAnMjBweCBHZW9yZ2lhJztcbnNvY2tldC5vbignc3RhdGUnLCBmdW5jdGlvbihwbGF5ZXJzOiBBcnJheTxhbnk+KSB7XG4gIGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIDgwMCwgNjAwKTtcbiAgZm9yICh2YXIgaWQgaW4gcGxheWVycykge1xuICAgIHZhciBwbGF5ZXIgPSBwbGF5ZXJzW2lkXTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHBsYXllci5jb2xvcjtcbiAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgIGNvbnRleHQuYXJjKHBsYXllci54LCBwbGF5ZXIueSwgMTAsIDAsIDIgKiBNYXRoLlBJKTtcbiAgICBjb250ZXh0LmZpbGwoKTtcblxuICAgIGNvbnRleHQuZmlsbFRleHQoYHg6ICR7cGxheWVyLnh9LCB5OiAke3BsYXllci55fWAsIHBsYXllci54LCBwbGF5ZXIueSk7XG4gIH1cbn0pO1xuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHVybCA9IHJlcXVpcmUoJy4vdXJsJyk7XG52YXIgcGFyc2VyID0gcmVxdWlyZSgnc29ja2V0LmlvLXBhcnNlcicpO1xudmFyIE1hbmFnZXIgPSByZXF1aXJlKCcuL21hbmFnZXInKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBsb29rdXA7XG5cbi8qKlxuICogTWFuYWdlcnMgY2FjaGUuXG4gKi9cblxudmFyIGNhY2hlID0gZXhwb3J0cy5tYW5hZ2VycyA9IHt9O1xuXG4vKipcbiAqIExvb2tzIHVwIGFuIGV4aXN0aW5nIGBNYW5hZ2VyYCBmb3IgbXVsdGlwbGV4aW5nLlxuICogSWYgdGhlIHVzZXIgc3VtbW9uczpcbiAqXG4gKiAgIGBpbygnaHR0cDovL2xvY2FsaG9zdC9hJyk7YFxuICogICBgaW8oJ2h0dHA6Ly9sb2NhbGhvc3QvYicpO2BcbiAqXG4gKiBXZSByZXVzZSB0aGUgZXhpc3RpbmcgaW5zdGFuY2UgYmFzZWQgb24gc2FtZSBzY2hlbWUvcG9ydC9ob3N0LFxuICogYW5kIHdlIGluaXRpYWxpemUgc29ja2V0cyBmb3IgZWFjaCBuYW1lc3BhY2UuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb29rdXAgKHVyaSwgb3B0cykge1xuICBpZiAodHlwZW9mIHVyaSA9PT0gJ29iamVjdCcpIHtcbiAgICBvcHRzID0gdXJpO1xuICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIHZhciBwYXJzZWQgPSB1cmwodXJpKTtcbiAgdmFyIHNvdXJjZSA9IHBhcnNlZC5zb3VyY2U7XG4gIHZhciBpZCA9IHBhcnNlZC5pZDtcbiAgdmFyIHBhdGggPSBwYXJzZWQucGF0aDtcbiAgdmFyIHNhbWVOYW1lc3BhY2UgPSBjYWNoZVtpZF0gJiYgcGF0aCBpbiBjYWNoZVtpZF0ubnNwcztcbiAgdmFyIG5ld0Nvbm5lY3Rpb24gPSBvcHRzLmZvcmNlTmV3IHx8IG9wdHNbJ2ZvcmNlIG5ldyBjb25uZWN0aW9uJ10gfHxcbiAgICAgICAgICAgICAgICAgICAgICBmYWxzZSA9PT0gb3B0cy5tdWx0aXBsZXggfHwgc2FtZU5hbWVzcGFjZTtcblxuICB2YXIgaW87XG5cbiAgaWYgKG5ld0Nvbm5lY3Rpb24pIHtcbiAgICBkZWJ1ZygnaWdub3Jpbmcgc29ja2V0IGNhY2hlIGZvciAlcycsIHNvdXJjZSk7XG4gICAgaW8gPSBNYW5hZ2VyKHNvdXJjZSwgb3B0cyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFjYWNoZVtpZF0pIHtcbiAgICAgIGRlYnVnKCduZXcgaW8gaW5zdGFuY2UgZm9yICVzJywgc291cmNlKTtcbiAgICAgIGNhY2hlW2lkXSA9IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICB9XG4gICAgaW8gPSBjYWNoZVtpZF07XG4gIH1cbiAgaWYgKHBhcnNlZC5xdWVyeSAmJiAhb3B0cy5xdWVyeSkge1xuICAgIG9wdHMucXVlcnkgPSBwYXJzZWQucXVlcnk7XG4gIH1cbiAgcmV0dXJuIGlvLnNvY2tldChwYXJzZWQucGF0aCwgb3B0cyk7XG59XG5cbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMucHJvdG9jb2wgPSBwYXJzZXIucHJvdG9jb2w7XG5cbi8qKlxuICogYGNvbm5lY3RgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmlcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5jb25uZWN0ID0gbG9va3VwO1xuXG4vKipcbiAqIEV4cG9zZSBjb25zdHJ1Y3RvcnMgZm9yIHN0YW5kYWxvbmUgYnVpbGQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLk1hbmFnZXIgPSByZXF1aXJlKCcuL21hbmFnZXInKTtcbmV4cG9ydHMuU29ja2V0ID0gcmVxdWlyZSgnLi9zb2NrZXQnKTtcbiIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBwYXJzZXVyaSA9IHJlcXVpcmUoJ3BhcnNldXJpJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50OnVybCcpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gdXJsO1xuXG4vKipcbiAqIFVSTCBwYXJzZXIuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtPYmplY3R9IEFuIG9iamVjdCBtZWFudCB0byBtaW1pYyB3aW5kb3cubG9jYXRpb24uXG4gKiAgICAgICAgICAgICAgICAgRGVmYXVsdHMgdG8gd2luZG93LmxvY2F0aW9uLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiB1cmwgKHVyaSwgbG9jKSB7XG4gIHZhciBvYmogPSB1cmk7XG5cbiAgLy8gZGVmYXVsdCB0byB3aW5kb3cubG9jYXRpb25cbiAgbG9jID0gbG9jIHx8ICh0eXBlb2YgbG9jYXRpb24gIT09ICd1bmRlZmluZWQnICYmIGxvY2F0aW9uKTtcbiAgaWYgKG51bGwgPT0gdXJpKSB1cmkgPSBsb2MucHJvdG9jb2wgKyAnLy8nICsgbG9jLmhvc3Q7XG5cbiAgLy8gcmVsYXRpdmUgcGF0aCBzdXBwb3J0XG4gIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHVyaSkge1xuICAgIGlmICgnLycgPT09IHVyaS5jaGFyQXQoMCkpIHtcbiAgICAgIGlmICgnLycgPT09IHVyaS5jaGFyQXQoMSkpIHtcbiAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgdXJpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJpID0gbG9jLmhvc3QgKyB1cmk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCEvXihodHRwcz98d3NzPyk6XFwvXFwvLy50ZXN0KHVyaSkpIHtcbiAgICAgIGRlYnVnKCdwcm90b2NvbC1sZXNzIHVybCAlcycsIHVyaSk7XG4gICAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBsb2MpIHtcbiAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgJy8vJyArIHVyaTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVyaSA9ICdodHRwczovLycgKyB1cmk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gcGFyc2VcbiAgICBkZWJ1ZygncGFyc2UgJXMnLCB1cmkpO1xuICAgIG9iaiA9IHBhcnNldXJpKHVyaSk7XG4gIH1cblxuICAvLyBtYWtlIHN1cmUgd2UgdHJlYXQgYGxvY2FsaG9zdDo4MGAgYW5kIGBsb2NhbGhvc3RgIGVxdWFsbHlcbiAgaWYgKCFvYmoucG9ydCkge1xuICAgIGlmICgvXihodHRwfHdzKSQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgb2JqLnBvcnQgPSAnODAnO1xuICAgIH0gZWxzZSBpZiAoL14oaHR0cHx3cylzJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICBvYmoucG9ydCA9ICc0NDMnO1xuICAgIH1cbiAgfVxuXG4gIG9iai5wYXRoID0gb2JqLnBhdGggfHwgJy8nO1xuXG4gIHZhciBpcHY2ID0gb2JqLmhvc3QuaW5kZXhPZignOicpICE9PSAtMTtcbiAgdmFyIGhvc3QgPSBpcHY2ID8gJ1snICsgb2JqLmhvc3QgKyAnXScgOiBvYmouaG9zdDtcblxuICAvLyBkZWZpbmUgdW5pcXVlIGlkXG4gIG9iai5pZCA9IG9iai5wcm90b2NvbCArICc6Ly8nICsgaG9zdCArICc6JyArIG9iai5wb3J0O1xuICAvLyBkZWZpbmUgaHJlZlxuICBvYmouaHJlZiA9IG9iai5wcm90b2NvbCArICc6Ly8nICsgaG9zdCArIChsb2MgJiYgbG9jLnBvcnQgPT09IG9iai5wb3J0ID8gJycgOiAoJzonICsgb2JqLnBvcnQpKTtcblxuICByZXR1cm4gb2JqO1xufVxuIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWdbJ2RlZmF1bHQnXSA9IGNyZWF0ZURlYnVnO1xuZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2U7XG5leHBvcnRzLmRpc2FibGUgPSBkaXNhYmxlO1xuZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7XG5leHBvcnRzLmVuYWJsZWQgPSBlbmFibGVkO1xuZXhwb3J0cy5odW1hbml6ZSA9IHJlcXVpcmUoJ21zJyk7XG5cbi8qKlxuICogQWN0aXZlIGBkZWJ1Z2AgaW5zdGFuY2VzLlxuICovXG5leHBvcnRzLmluc3RhbmNlcyA9IFtdO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICB2YXIgcHJldlRpbWU7XG5cbiAgZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgLy8gZGlzYWJsZWQ/XG4gICAgaWYgKCFkZWJ1Zy5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IGRlYnVnO1xuXG4gICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICB2YXIgY3VyciA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgc2VsZi5kaWZmID0gbXM7XG4gICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAvLyB0dXJuIHRoZSBgYXJndW1lbnRzYCBpbnRvIGEgcHJvcGVyIEFycmF5XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbihtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICBpZiAobWF0Y2ggPT09ICclJScpIHJldHVybiBtYXRjaDtcbiAgICAgIGluZGV4Kys7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG4gICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIC8vIGFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG4gICAgZXhwb3J0cy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cbiAgICB2YXIgbG9nRm4gPSBkZWJ1Zy5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuXG4gIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgZGVidWcuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpO1xuICBkZWJ1Zy51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG4gIGRlYnVnLmRlc3Ryb3kgPSBkZXN0cm95O1xuXG4gIC8vIGVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZXhwb3J0cy5pbml0KSB7XG4gICAgZXhwb3J0cy5pbml0KGRlYnVnKTtcbiAgfVxuXG4gIGV4cG9ydHMuaW5zdGFuY2VzLnB1c2goZGVidWcpO1xuXG4gIHJldHVybiBkZWJ1Zztcbn1cblxuZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIHZhciBpbmRleCA9IGV4cG9ydHMuaW5zdGFuY2VzLmluZGV4T2YodGhpcyk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBleHBvcnRzLmluc3RhbmNlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gIHZhciBpO1xuICB2YXIgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICB2YXIgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgZXhwb3J0cy5pbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBleHBvcnRzLmluc3RhbmNlc1tpXTtcbiAgICBpbnN0YW5jZS5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKGluc3RhbmNlLm5hbWVzcGFjZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICBpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnKicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuIiwiLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGVidWcnKTtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lXG4gICAgICAgICAgICAgICAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgID8gY2hyb21lLnN0b3JhZ2UubG9jYWxcbiAgICAgICAgICAgICAgICAgIDogbG9jYWxzdG9yYWdlKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuICAnIzAwMDBDQycsICcjMDAwMEZGJywgJyMwMDMzQ0MnLCAnIzAwMzNGRicsICcjMDA2NkNDJywgJyMwMDY2RkYnLCAnIzAwOTlDQycsXG4gICcjMDA5OUZGJywgJyMwMENDMDAnLCAnIzAwQ0MzMycsICcjMDBDQzY2JywgJyMwMENDOTknLCAnIzAwQ0NDQycsICcjMDBDQ0ZGJyxcbiAgJyMzMzAwQ0MnLCAnIzMzMDBGRicsICcjMzMzM0NDJywgJyMzMzMzRkYnLCAnIzMzNjZDQycsICcjMzM2NkZGJywgJyMzMzk5Q0MnLFxuICAnIzMzOTlGRicsICcjMzNDQzAwJywgJyMzM0NDMzMnLCAnIzMzQ0M2NicsICcjMzNDQzk5JywgJyMzM0NDQ0MnLCAnIzMzQ0NGRicsXG4gICcjNjYwMENDJywgJyM2NjAwRkYnLCAnIzY2MzNDQycsICcjNjYzM0ZGJywgJyM2NkNDMDAnLCAnIzY2Q0MzMycsICcjOTkwMENDJyxcbiAgJyM5OTAwRkYnLCAnIzk5MzNDQycsICcjOTkzM0ZGJywgJyM5OUNDMDAnLCAnIzk5Q0MzMycsICcjQ0MwMDAwJywgJyNDQzAwMzMnLFxuICAnI0NDMDA2NicsICcjQ0MwMDk5JywgJyNDQzAwQ0MnLCAnI0NDMDBGRicsICcjQ0MzMzAwJywgJyNDQzMzMzMnLCAnI0NDMzM2NicsXG4gICcjQ0MzMzk5JywgJyNDQzMzQ0MnLCAnI0NDMzNGRicsICcjQ0M2NjAwJywgJyNDQzY2MzMnLCAnI0NDOTkwMCcsICcjQ0M5OTMzJyxcbiAgJyNDQ0NDMDAnLCAnI0NDQ0MzMycsICcjRkYwMDAwJywgJyNGRjAwMzMnLCAnI0ZGMDA2NicsICcjRkYwMDk5JywgJyNGRjAwQ0MnLFxuICAnI0ZGMDBGRicsICcjRkYzMzAwJywgJyNGRjMzMzMnLCAnI0ZGMzM2NicsICcjRkYzMzk5JywgJyNGRjMzQ0MnLCAnI0ZGMzNGRicsXG4gICcjRkY2NjAwJywgJyNGRjY2MzMnLCAnI0ZGOTkwMCcsICcjRkY5OTMzJywgJyNGRkNDMDAnLCAnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC8oZWRnZXx0cmlkZW50KVxcLyhcXGQrKS8pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIEFjdGl2ZSBgZGVidWdgIGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0cy5pbnN0YW5jZXMgPSBbXTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgdmFyIHByZXZUaW1lO1xuXG4gIGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgIC8vIGRpc2FibGVkP1xuICAgIGlmICghZGVidWcuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgdmFyIHNlbGYgPSBkZWJ1ZztcblxuICAgIC8vIHNldCBgZGlmZmAgdGltZXN0YW1wXG4gICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgcHJldlRpbWUgPSBjdXJyO1xuXG4gICAgLy8gdHVybiB0aGUgYGFyZ3VtZW50c2AgaW50byBhIHByb3BlciBBcnJheVxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBhcmdzWzBdID0gZXhwb3J0cy5jb2VyY2UoYXJnc1swXSk7XG5cbiAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBhcmdzWzBdKSB7XG4gICAgICAvLyBhbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuICAgICAgYXJncy51bnNoaWZ0KCclTycpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgZnVuY3Rpb24obWF0Y2gsIGZvcm1hdCkge1xuICAgICAgLy8gaWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICBpbmRleCsrO1xuICAgICAgdmFyIGZvcm1hdHRlciA9IGV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cbiAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGluZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICAvLyBhcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuICAgIGV4cG9ydHMuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG4gICAgdmFyIGxvZ0ZuID0gZGVidWcubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgbG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cblxuICBkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gIGRlYnVnLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQobmFtZXNwYWNlKTtcbiAgZGVidWcudXNlQ29sb3JzID0gZXhwb3J0cy51c2VDb2xvcnMoKTtcbiAgZGVidWcuY29sb3IgPSBzZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuICBkZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICBleHBvcnRzLmluc3RhbmNlcy5wdXNoKGRlYnVnKTtcblxuICByZXR1cm4gZGVidWc7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICB2YXIgaW5kZXggPSBleHBvcnRzLmluc3RhbmNlcy5pbmRleE9mKHRoaXMpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgZXhwb3J0cy5pbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG4gKiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG4gIGV4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTtcblxuICBleHBvcnRzLm5hbWVzID0gW107XG4gIGV4cG9ydHMuc2tpcHMgPSBbXTtcblxuICB2YXIgaTtcbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IGV4cG9ydHMuaW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGluc3RhbmNlID0gZXhwb3J0cy5pbnN0YW5jZXNbaV07XG4gICAgaW5zdGFuY2UuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChpbnN0YW5jZS5uYW1lc3BhY2UpO1xuICB9XG59XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xuICBleHBvcnRzLmVuYWJsZSgnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgaWYgKG5hbWVbbmFtZS5sZW5ndGggLSAxXSA9PT0gJyonKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcbiAgcmV0dXJuIHZhbDtcbn1cbiIsIi8qZ2xvYmFsIEJsb2IsRmlsZSovXG5cbi8qKlxuICogTW9kdWxlIHJlcXVpcmVtZW50c1xuICovXG5cbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xudmFyIGlzQnVmID0gcmVxdWlyZSgnLi9pcy1idWZmZXInKTtcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgd2l0aE5hdGl2ZUJsb2IgPSB0eXBlb2YgQmxvYiA9PT0gJ2Z1bmN0aW9uJyB8fCAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIHRvU3RyaW5nLmNhbGwoQmxvYikgPT09ICdbb2JqZWN0IEJsb2JDb25zdHJ1Y3Rvcl0nKTtcbnZhciB3aXRoTmF0aXZlRmlsZSA9IHR5cGVvZiBGaWxlID09PSAnZnVuY3Rpb24nIHx8ICh0eXBlb2YgRmlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdG9TdHJpbmcuY2FsbChGaWxlKSA9PT0gJ1tvYmplY3QgRmlsZUNvbnN0cnVjdG9yXScpO1xuXG4vKipcbiAqIFJlcGxhY2VzIGV2ZXJ5IEJ1ZmZlciB8IEFycmF5QnVmZmVyIGluIHBhY2tldCB3aXRoIGEgbnVtYmVyZWQgcGxhY2Vob2xkZXIuXG4gKiBBbnl0aGluZyB3aXRoIGJsb2JzIG9yIGZpbGVzIHNob3VsZCBiZSBmZWQgdGhyb3VnaCByZW1vdmVCbG9icyBiZWZvcmUgY29taW5nXG4gKiBoZXJlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgLSBzb2NrZXQuaW8gZXZlbnQgcGFja2V0XG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggZGVjb25zdHJ1Y3RlZCBwYWNrZXQgYW5kIGxpc3Qgb2YgYnVmZmVyc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmRlY29uc3RydWN0UGFja2V0ID0gZnVuY3Rpb24ocGFja2V0KSB7XG4gIHZhciBidWZmZXJzID0gW107XG4gIHZhciBwYWNrZXREYXRhID0gcGFja2V0LmRhdGE7XG4gIHZhciBwYWNrID0gcGFja2V0O1xuICBwYWNrLmRhdGEgPSBfZGVjb25zdHJ1Y3RQYWNrZXQocGFja2V0RGF0YSwgYnVmZmVycyk7XG4gIHBhY2suYXR0YWNobWVudHMgPSBidWZmZXJzLmxlbmd0aDsgLy8gbnVtYmVyIG9mIGJpbmFyeSAnYXR0YWNobWVudHMnXG4gIHJldHVybiB7cGFja2V0OiBwYWNrLCBidWZmZXJzOiBidWZmZXJzfTtcbn07XG5cbmZ1bmN0aW9uIF9kZWNvbnN0cnVjdFBhY2tldChkYXRhLCBidWZmZXJzKSB7XG4gIGlmICghZGF0YSkgcmV0dXJuIGRhdGE7XG5cbiAgaWYgKGlzQnVmKGRhdGEpKSB7XG4gICAgdmFyIHBsYWNlaG9sZGVyID0geyBfcGxhY2Vob2xkZXI6IHRydWUsIG51bTogYnVmZmVycy5sZW5ndGggfTtcbiAgICBidWZmZXJzLnB1c2goZGF0YSk7XG4gICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICB9IGVsc2UgaWYgKGlzQXJyYXkoZGF0YSkpIHtcbiAgICB2YXIgbmV3RGF0YSA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBuZXdEYXRhW2ldID0gX2RlY29uc3RydWN0UGFja2V0KGRhdGFbaV0sIGJ1ZmZlcnMpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3RGF0YTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcgJiYgIShkYXRhIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICB2YXIgbmV3RGF0YSA9IHt9O1xuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICBuZXdEYXRhW2tleV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldLCBidWZmZXJzKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ld0RhdGE7XG4gIH1cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogUmVjb25zdHJ1Y3RzIGEgYmluYXJ5IHBhY2tldCBmcm9tIGl0cyBwbGFjZWhvbGRlciBwYWNrZXQgYW5kIGJ1ZmZlcnNcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gZXZlbnQgcGFja2V0IHdpdGggcGxhY2Vob2xkZXJzXG4gKiBAcGFyYW0ge0FycmF5fSBidWZmZXJzIC0gYmluYXJ5IGJ1ZmZlcnMgdG8gcHV0IGluIHBsYWNlaG9sZGVyIHBvc2l0aW9uc1xuICogQHJldHVybiB7T2JqZWN0fSByZWNvbnN0cnVjdGVkIHBhY2tldFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLnJlY29uc3RydWN0UGFja2V0ID0gZnVuY3Rpb24ocGFja2V0LCBidWZmZXJzKSB7XG4gIHBhY2tldC5kYXRhID0gX3JlY29uc3RydWN0UGFja2V0KHBhY2tldC5kYXRhLCBidWZmZXJzKTtcbiAgcGFja2V0LmF0dGFjaG1lbnRzID0gdW5kZWZpbmVkOyAvLyBubyBsb25nZXIgdXNlZnVsXG4gIHJldHVybiBwYWNrZXQ7XG59O1xuXG5mdW5jdGlvbiBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YSwgYnVmZmVycykge1xuICBpZiAoIWRhdGEpIHJldHVybiBkYXRhO1xuXG4gIGlmIChkYXRhICYmIGRhdGEuX3BsYWNlaG9sZGVyKSB7XG4gICAgcmV0dXJuIGJ1ZmZlcnNbZGF0YS5udW1dOyAvLyBhcHByb3ByaWF0ZSBidWZmZXIgKHNob3VsZCBiZSBuYXR1cmFsIG9yZGVyIGFueXdheSlcbiAgfSBlbHNlIGlmIChpc0FycmF5KGRhdGEpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBkYXRhW2ldID0gX3JlY29uc3RydWN0UGFja2V0KGRhdGFbaV0sIGJ1ZmZlcnMpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgZGF0YVtrZXldID0gX3JlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSwgYnVmZmVycyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQXN5bmNocm9ub3VzbHkgcmVtb3ZlcyBCbG9icyBvciBGaWxlcyBmcm9tIGRhdGEgdmlhXG4gKiBGaWxlUmVhZGVyJ3MgcmVhZEFzQXJyYXlCdWZmZXIgbWV0aG9kLiBVc2VkIGJlZm9yZSBlbmNvZGluZ1xuICogZGF0YSBhcyBtc2dwYWNrLiBDYWxscyBjYWxsYmFjayB3aXRoIHRoZSBibG9ibGVzcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZW1vdmVCbG9icyA9IGZ1bmN0aW9uKGRhdGEsIGNhbGxiYWNrKSB7XG4gIGZ1bmN0aW9uIF9yZW1vdmVCbG9icyhvYmosIGN1cktleSwgY29udGFpbmluZ09iamVjdCkge1xuICAgIGlmICghb2JqKSByZXR1cm4gb2JqO1xuXG4gICAgLy8gY29udmVydCBhbnkgYmxvYlxuICAgIGlmICgod2l0aE5hdGl2ZUJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYikgfHxcbiAgICAgICAgKHdpdGhOYXRpdmVGaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpKSB7XG4gICAgICBwZW5kaW5nQmxvYnMrKztcblxuICAgICAgLy8gYXN5bmMgZmlsZXJlYWRlclxuICAgICAgdmFyIGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHsgLy8gdGhpcy5yZXN1bHQgPT0gYXJyYXlidWZmZXJcbiAgICAgICAgaWYgKGNvbnRhaW5pbmdPYmplY3QpIHtcbiAgICAgICAgICBjb250YWluaW5nT2JqZWN0W2N1cktleV0gPSB0aGlzLnJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBibG9ibGVzc0RhdGEgPSB0aGlzLnJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIG5vdGhpbmcgcGVuZGluZyBpdHMgY2FsbGJhY2sgdGltZVxuICAgICAgICBpZighIC0tcGVuZGluZ0Jsb2JzKSB7XG4gICAgICAgICAgY2FsbGJhY2soYmxvYmxlc3NEYXRhKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgZmlsZVJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihvYmopOyAvLyBibG9iIC0+IGFycmF5YnVmZmVyXG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9iaikpIHsgLy8gaGFuZGxlIGFycmF5XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICBfcmVtb3ZlQmxvYnMob2JqW2ldLCBpLCBvYmopO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgIWlzQnVmKG9iaikpIHsgLy8gYW5kIG9iamVjdFxuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICBfcmVtb3ZlQmxvYnMob2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgcGVuZGluZ0Jsb2JzID0gMDtcbiAgdmFyIGJsb2JsZXNzRGF0YSA9IGRhdGE7XG4gIF9yZW1vdmVCbG9icyhibG9ibGVzc0RhdGEpO1xuICBpZiAoIXBlbmRpbmdCbG9icykge1xuICAgIGNhbGxiYWNrKGJsb2JsZXNzRGF0YSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8XG4gICAgICByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMikge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDEpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPVxuICAgICAgKCh1aW50OFtpXSA8PCAxNikgJiAweEZGMDAwMCkgK1xuICAgICAgKCh1aW50OFtpICsgMV0gPDwgOCkgJiAweEZGMDApICtcbiAgICAgICh1aW50OFtpICsgMl0gJiAweEZGKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKFxuICAgICAgdWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKVxuICAgICkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gKGUgKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gKG0gKiAyNTYpICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAoKHZhbHVlICogYykgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc29ja2V0Jyk7XG5cbi8qKlxuICogRXhwb3J0cyBwYXJzZXJcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICpcbiAqL1xubW9kdWxlLmV4cG9ydHMucGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciB0cmFuc3BvcnRzID0gcmVxdWlyZSgnLi90cmFuc3BvcnRzL2luZGV4Jyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnNvY2tldCcpO1xudmFyIGluZGV4ID0gcmVxdWlyZSgnaW5kZXhvZicpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcbnZhciBwYXJzZXVyaSA9IHJlcXVpcmUoJ3BhcnNldXJpJyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNvY2tldDtcblxuLyoqXG4gKiBTb2NrZXQgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSB1cmkgb3Igb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gU29ja2V0ICh1cmksIG9wdHMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNvY2tldCkpIHJldHVybiBuZXcgU29ja2V0KHVyaSwgb3B0cyk7XG5cbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgaWYgKHVyaSAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHVyaSkge1xuICAgIG9wdHMgPSB1cmk7XG4gICAgdXJpID0gbnVsbDtcbiAgfVxuXG4gIGlmICh1cmkpIHtcbiAgICB1cmkgPSBwYXJzZXVyaSh1cmkpO1xuICAgIG9wdHMuaG9zdG5hbWUgPSB1cmkuaG9zdDtcbiAgICBvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PT0gJ2h0dHBzJyB8fCB1cmkucHJvdG9jb2wgPT09ICd3c3MnO1xuICAgIG9wdHMucG9ydCA9IHVyaS5wb3J0O1xuICAgIGlmICh1cmkucXVlcnkpIG9wdHMucXVlcnkgPSB1cmkucXVlcnk7XG4gIH0gZWxzZSBpZiAob3B0cy5ob3N0KSB7XG4gICAgb3B0cy5ob3N0bmFtZSA9IHBhcnNldXJpKG9wdHMuaG9zdCkuaG9zdDtcbiAgfVxuXG4gIHRoaXMuc2VjdXJlID0gbnVsbCAhPSBvcHRzLnNlY3VyZSA/IG9wdHMuc2VjdXJlXG4gICAgOiAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJyAmJiAnaHR0cHM6JyA9PT0gbG9jYXRpb24ucHJvdG9jb2wpO1xuXG4gIGlmIChvcHRzLmhvc3RuYW1lICYmICFvcHRzLnBvcnQpIHtcbiAgICAvLyBpZiBubyBwb3J0IGlzIHNwZWNpZmllZCBtYW51YWxseSwgdXNlIHRoZSBwcm90b2NvbCBkZWZhdWx0XG4gICAgb3B0cy5wb3J0ID0gdGhpcy5zZWN1cmUgPyAnNDQzJyA6ICc4MCc7XG4gIH1cblxuICB0aGlzLmFnZW50ID0gb3B0cy5hZ2VudCB8fCBmYWxzZTtcbiAgdGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWUgfHxcbiAgICAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJyA/IGxvY2F0aW9uLmhvc3RuYW1lIDogJ2xvY2FsaG9zdCcpO1xuICB0aGlzLnBvcnQgPSBvcHRzLnBvcnQgfHwgKHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9jYXRpb24ucG9ydFxuICAgICAgPyBsb2NhdGlvbi5wb3J0XG4gICAgICA6ICh0aGlzLnNlY3VyZSA/IDQ0MyA6IDgwKSk7XG4gIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5IHx8IHt9O1xuICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiB0aGlzLnF1ZXJ5KSB0aGlzLnF1ZXJ5ID0gcGFyc2Vxcy5kZWNvZGUodGhpcy5xdWVyeSk7XG4gIHRoaXMudXBncmFkZSA9IGZhbHNlICE9PSBvcHRzLnVwZ3JhZGU7XG4gIHRoaXMucGF0aCA9IChvcHRzLnBhdGggfHwgJy9lbmdpbmUuaW8nKS5yZXBsYWNlKC9cXC8kLywgJycpICsgJy8nO1xuICB0aGlzLmZvcmNlSlNPTlAgPSAhIW9wdHMuZm9yY2VKU09OUDtcbiAgdGhpcy5qc29ucCA9IGZhbHNlICE9PSBvcHRzLmpzb25wO1xuICB0aGlzLmZvcmNlQmFzZTY0ID0gISFvcHRzLmZvcmNlQmFzZTY0O1xuICB0aGlzLmVuYWJsZXNYRFIgPSAhIW9wdHMuZW5hYmxlc1hEUjtcbiAgdGhpcy50aW1lc3RhbXBQYXJhbSA9IG9wdHMudGltZXN0YW1wUGFyYW0gfHwgJ3QnO1xuICB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzID0gb3B0cy50aW1lc3RhbXBSZXF1ZXN0cztcbiAgdGhpcy50cmFuc3BvcnRzID0gb3B0cy50cmFuc3BvcnRzIHx8IFsncG9sbGluZycsICd3ZWJzb2NrZXQnXTtcbiAgdGhpcy50cmFuc3BvcnRPcHRpb25zID0gb3B0cy50cmFuc3BvcnRPcHRpb25zIHx8IHt9O1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnJztcbiAgdGhpcy53cml0ZUJ1ZmZlciA9IFtdO1xuICB0aGlzLnByZXZCdWZmZXJMZW4gPSAwO1xuICB0aGlzLnBvbGljeVBvcnQgPSBvcHRzLnBvbGljeVBvcnQgfHwgODQzO1xuICB0aGlzLnJlbWVtYmVyVXBncmFkZSA9IG9wdHMucmVtZW1iZXJVcGdyYWRlIHx8IGZhbHNlO1xuICB0aGlzLmJpbmFyeVR5cGUgPSBudWxsO1xuICB0aGlzLm9ubHlCaW5hcnlVcGdyYWRlcyA9IG9wdHMub25seUJpbmFyeVVwZ3JhZGVzO1xuICB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlID0gZmFsc2UgIT09IG9wdHMucGVyTWVzc2FnZURlZmxhdGUgPyAob3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSB8fCB7fSkgOiBmYWxzZTtcblxuICBpZiAodHJ1ZSA9PT0gdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSkgdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSA9IHt9O1xuICBpZiAodGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSAmJiBudWxsID09IHRoaXMucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkKSB7XG4gICAgdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQgPSAxMDI0O1xuICB9XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMucGZ4ID0gb3B0cy5wZnggfHwgbnVsbDtcbiAgdGhpcy5rZXkgPSBvcHRzLmtleSB8fCBudWxsO1xuICB0aGlzLnBhc3NwaHJhc2UgPSBvcHRzLnBhc3NwaHJhc2UgfHwgbnVsbDtcbiAgdGhpcy5jZXJ0ID0gb3B0cy5jZXJ0IHx8IG51bGw7XG4gIHRoaXMuY2EgPSBvcHRzLmNhIHx8IG51bGw7XG4gIHRoaXMuY2lwaGVycyA9IG9wdHMuY2lwaGVycyB8fCBudWxsO1xuICB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCA9IG9wdHMucmVqZWN0VW5hdXRob3JpemVkID09PSB1bmRlZmluZWQgPyB0cnVlIDogb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7XG4gIHRoaXMuZm9yY2VOb2RlID0gISFvcHRzLmZvcmNlTm9kZTtcblxuICAvLyBkZXRlY3QgUmVhY3ROYXRpdmUgZW52aXJvbm1lbnRcbiAgdGhpcy5pc1JlYWN0TmF0aXZlID0gKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ3N0cmluZycgJiYgbmF2aWdhdG9yLnByb2R1Y3QudG9Mb3dlckNhc2UoKSA9PT0gJ3JlYWN0bmF0aXZlJyk7XG5cbiAgLy8gb3RoZXIgb3B0aW9ucyBmb3IgTm9kZS5qcyBvciBSZWFjdE5hdGl2ZSBjbGllbnRcbiAgaWYgKHR5cGVvZiBzZWxmID09PSAndW5kZWZpbmVkJyB8fCB0aGlzLmlzUmVhY3ROYXRpdmUpIHtcbiAgICBpZiAob3B0cy5leHRyYUhlYWRlcnMgJiYgT2JqZWN0LmtleXMob3B0cy5leHRyYUhlYWRlcnMpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMubG9jYWxBZGRyZXNzKSB7XG4gICAgICB0aGlzLmxvY2FsQWRkcmVzcyA9IG9wdHMubG9jYWxBZGRyZXNzO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNldCBvbiBoYW5kc2hha2VcbiAgdGhpcy5pZCA9IG51bGw7XG4gIHRoaXMudXBncmFkZXMgPSBudWxsO1xuICB0aGlzLnBpbmdJbnRlcnZhbCA9IG51bGw7XG4gIHRoaXMucGluZ1RpbWVvdXQgPSBudWxsO1xuXG4gIC8vIHNldCBvbiBoZWFydGJlYXRcbiAgdGhpcy5waW5nSW50ZXJ2YWxUaW1lciA9IG51bGw7XG4gIHRoaXMucGluZ1RpbWVvdXRUaW1lciA9IG51bGw7XG5cbiAgdGhpcy5vcGVuKCk7XG59XG5cblNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoU29ja2V0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b2NvbCA9IHBhcnNlci5wcm90b2NvbDsgLy8gdGhpcyBpcyBhbiBpbnRcblxuLyoqXG4gKiBFeHBvc2UgZGVwcyBmb3IgbGVnYWN5IGNvbXBhdGliaWxpdHlcbiAqIGFuZCBzdGFuZGFsb25lIGJyb3dzZXIgYWNjZXNzLlxuICovXG5cblNvY2tldC5Tb2NrZXQgPSBTb2NrZXQ7XG5Tb2NrZXQuVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi90cmFuc3BvcnQnKTtcblNvY2tldC50cmFuc3BvcnRzID0gcmVxdWlyZSgnLi90cmFuc3BvcnRzL2luZGV4Jyk7XG5Tb2NrZXQucGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0cmFuc3BvcnQgbmFtZVxuICogQHJldHVybiB7VHJhbnNwb3J0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5jcmVhdGVUcmFuc3BvcnQgPSBmdW5jdGlvbiAobmFtZSkge1xuICBkZWJ1ZygnY3JlYXRpbmcgdHJhbnNwb3J0IFwiJXNcIicsIG5hbWUpO1xuICB2YXIgcXVlcnkgPSBjbG9uZSh0aGlzLnF1ZXJ5KTtcblxuICAvLyBhcHBlbmQgZW5naW5lLmlvIHByb3RvY29sIGlkZW50aWZpZXJcbiAgcXVlcnkuRUlPID0gcGFyc2VyLnByb3RvY29sO1xuXG4gIC8vIHRyYW5zcG9ydCBuYW1lXG4gIHF1ZXJ5LnRyYW5zcG9ydCA9IG5hbWU7XG5cbiAgLy8gcGVyLXRyYW5zcG9ydCBvcHRpb25zXG4gIHZhciBvcHRpb25zID0gdGhpcy50cmFuc3BvcnRPcHRpb25zW25hbWVdIHx8IHt9O1xuXG4gIC8vIHNlc3Npb24gaWQgaWYgd2UgYWxyZWFkeSBoYXZlIG9uZVxuICBpZiAodGhpcy5pZCkgcXVlcnkuc2lkID0gdGhpcy5pZDtcblxuICB2YXIgdHJhbnNwb3J0ID0gbmV3IHRyYW5zcG9ydHNbbmFtZV0oe1xuICAgIHF1ZXJ5OiBxdWVyeSxcbiAgICBzb2NrZXQ6IHRoaXMsXG4gICAgYWdlbnQ6IG9wdGlvbnMuYWdlbnQgfHwgdGhpcy5hZ2VudCxcbiAgICBob3N0bmFtZTogb3B0aW9ucy5ob3N0bmFtZSB8fCB0aGlzLmhvc3RuYW1lLFxuICAgIHBvcnQ6IG9wdGlvbnMucG9ydCB8fCB0aGlzLnBvcnQsXG4gICAgc2VjdXJlOiBvcHRpb25zLnNlY3VyZSB8fCB0aGlzLnNlY3VyZSxcbiAgICBwYXRoOiBvcHRpb25zLnBhdGggfHwgdGhpcy5wYXRoLFxuICAgIGZvcmNlSlNPTlA6IG9wdGlvbnMuZm9yY2VKU09OUCB8fCB0aGlzLmZvcmNlSlNPTlAsXG4gICAganNvbnA6IG9wdGlvbnMuanNvbnAgfHwgdGhpcy5qc29ucCxcbiAgICBmb3JjZUJhc2U2NDogb3B0aW9ucy5mb3JjZUJhc2U2NCB8fCB0aGlzLmZvcmNlQmFzZTY0LFxuICAgIGVuYWJsZXNYRFI6IG9wdGlvbnMuZW5hYmxlc1hEUiB8fCB0aGlzLmVuYWJsZXNYRFIsXG4gICAgdGltZXN0YW1wUmVxdWVzdHM6IG9wdGlvbnMudGltZXN0YW1wUmVxdWVzdHMgfHwgdGhpcy50aW1lc3RhbXBSZXF1ZXN0cyxcbiAgICB0aW1lc3RhbXBQYXJhbTogb3B0aW9ucy50aW1lc3RhbXBQYXJhbSB8fCB0aGlzLnRpbWVzdGFtcFBhcmFtLFxuICAgIHBvbGljeVBvcnQ6IG9wdGlvbnMucG9saWN5UG9ydCB8fCB0aGlzLnBvbGljeVBvcnQsXG4gICAgcGZ4OiBvcHRpb25zLnBmeCB8fCB0aGlzLnBmeCxcbiAgICBrZXk6IG9wdGlvbnMua2V5IHx8IHRoaXMua2V5LFxuICAgIHBhc3NwaHJhc2U6IG9wdGlvbnMucGFzc3BocmFzZSB8fCB0aGlzLnBhc3NwaHJhc2UsXG4gICAgY2VydDogb3B0aW9ucy5jZXJ0IHx8IHRoaXMuY2VydCxcbiAgICBjYTogb3B0aW9ucy5jYSB8fCB0aGlzLmNhLFxuICAgIGNpcGhlcnM6IG9wdGlvbnMuY2lwaGVycyB8fCB0aGlzLmNpcGhlcnMsXG4gICAgcmVqZWN0VW5hdXRob3JpemVkOiBvcHRpb25zLnJlamVjdFVuYXV0aG9yaXplZCB8fCB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCxcbiAgICBwZXJNZXNzYWdlRGVmbGF0ZTogb3B0aW9ucy5wZXJNZXNzYWdlRGVmbGF0ZSB8fCB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlLFxuICAgIGV4dHJhSGVhZGVyczogb3B0aW9ucy5leHRyYUhlYWRlcnMgfHwgdGhpcy5leHRyYUhlYWRlcnMsXG4gICAgZm9yY2VOb2RlOiBvcHRpb25zLmZvcmNlTm9kZSB8fCB0aGlzLmZvcmNlTm9kZSxcbiAgICBsb2NhbEFkZHJlc3M6IG9wdGlvbnMubG9jYWxBZGRyZXNzIHx8IHRoaXMubG9jYWxBZGRyZXNzLFxuICAgIHJlcXVlc3RUaW1lb3V0OiBvcHRpb25zLnJlcXVlc3RUaW1lb3V0IHx8IHRoaXMucmVxdWVzdFRpbWVvdXQsXG4gICAgcHJvdG9jb2xzOiBvcHRpb25zLnByb3RvY29scyB8fCB2b2lkICgwKSxcbiAgICBpc1JlYWN0TmF0aXZlOiB0aGlzLmlzUmVhY3ROYXRpdmVcbiAgfSk7XG5cbiAgcmV0dXJuIHRyYW5zcG9ydDtcbn07XG5cbmZ1bmN0aW9uIGNsb25lIChvYmopIHtcbiAgdmFyIG8gPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICBvW2ldID0gb2JqW2ldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbztcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyB0cmFuc3BvcnQgdG8gdXNlIGFuZCBzdGFydHMgcHJvYmUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblNvY2tldC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHRyYW5zcG9ydDtcbiAgaWYgKHRoaXMucmVtZW1iZXJVcGdyYWRlICYmIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiYgdGhpcy50cmFuc3BvcnRzLmluZGV4T2YoJ3dlYnNvY2tldCcpICE9PSAtMSkge1xuICAgIHRyYW5zcG9ydCA9ICd3ZWJzb2NrZXQnO1xuICB9IGVsc2UgaWYgKDAgPT09IHRoaXMudHJhbnNwb3J0cy5sZW5ndGgpIHtcbiAgICAvLyBFbWl0IGVycm9yIG9uIG5leHQgdGljayBzbyBpdCBjYW4gYmUgbGlzdGVuZWQgdG9cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLmVtaXQoJ2Vycm9yJywgJ05vIHRyYW5zcG9ydHMgYXZhaWxhYmxlJyk7XG4gICAgfSwgMCk7XG4gICAgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIHRyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTtcbiAgfVxuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7XG5cbiAgLy8gUmV0cnkgd2l0aCB0aGUgbmV4dCB0cmFuc3BvcnQgaWYgdGhlIHRyYW5zcG9ydCBpcyBkaXNhYmxlZCAoanNvbnA6IGZhbHNlKVxuICB0cnkge1xuICAgIHRyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aGlzLnRyYW5zcG9ydHMuc2hpZnQoKTtcbiAgICB0aGlzLm9wZW4oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0cmFuc3BvcnQub3BlbigpO1xuICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnNldFRyYW5zcG9ydCA9IGZ1bmN0aW9uICh0cmFuc3BvcnQpIHtcbiAgZGVidWcoJ3NldHRpbmcgdHJhbnNwb3J0ICVzJywgdHJhbnNwb3J0Lm5hbWUpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKHRoaXMudHJhbnNwb3J0KSB7XG4gICAgZGVidWcoJ2NsZWFyaW5nIGV4aXN0aW5nIHRyYW5zcG9ydCAlcycsIHRoaXMudHJhbnNwb3J0Lm5hbWUpO1xuICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICB9XG5cbiAgLy8gc2V0IHVwIHRyYW5zcG9ydFxuICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcblxuICAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xuICB0cmFuc3BvcnRcbiAgLm9uKCdkcmFpbicsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9uRHJhaW4oKTtcbiAgfSlcbiAgLm9uKCdwYWNrZXQnLCBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgc2VsZi5vblBhY2tldChwYWNrZXQpO1xuICB9KVxuICAub24oJ2Vycm9yJywgZnVuY3Rpb24gKGUpIHtcbiAgICBzZWxmLm9uRXJyb3IoZSk7XG4gIH0pXG4gIC5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vbkNsb3NlKCd0cmFuc3BvcnQgY2xvc2UnKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFByb2JlcyBhIHRyYW5zcG9ydC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHJhbnNwb3J0IG5hbWVcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUucHJvYmUgPSBmdW5jdGlvbiAobmFtZSkge1xuICBkZWJ1ZygncHJvYmluZyB0cmFuc3BvcnQgXCIlc1wiJywgbmFtZSk7XG4gIHZhciB0cmFuc3BvcnQgPSB0aGlzLmNyZWF0ZVRyYW5zcG9ydChuYW1lLCB7IHByb2JlOiAxIH0pO1xuICB2YXIgZmFpbGVkID0gZmFsc2U7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gb25UcmFuc3BvcnRPcGVuICgpIHtcbiAgICBpZiAoc2VsZi5vbmx5QmluYXJ5VXBncmFkZXMpIHtcbiAgICAgIHZhciB1cGdyYWRlTG9zZXNCaW5hcnkgPSAhdGhpcy5zdXBwb3J0c0JpbmFyeSAmJiBzZWxmLnRyYW5zcG9ydC5zdXBwb3J0c0JpbmFyeTtcbiAgICAgIGZhaWxlZCA9IGZhaWxlZCB8fCB1cGdyYWRlTG9zZXNCaW5hcnk7XG4gICAgfVxuICAgIGlmIChmYWlsZWQpIHJldHVybjtcblxuICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIG9wZW5lZCcsIG5hbWUpO1xuICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6ICdwaW5nJywgZGF0YTogJ3Byb2JlJyB9XSk7XG4gICAgdHJhbnNwb3J0Lm9uY2UoJ3BhY2tldCcsIGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgIGlmIChmYWlsZWQpIHJldHVybjtcbiAgICAgIGlmICgncG9uZycgPT09IG1zZy50eXBlICYmICdwcm9iZScgPT09IG1zZy5kYXRhKSB7XG4gICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIHBvbmcnLCBuYW1lKTtcbiAgICAgICAgc2VsZi51cGdyYWRpbmcgPSB0cnVlO1xuICAgICAgICBzZWxmLmVtaXQoJ3VwZ3JhZGluZycsIHRyYW5zcG9ydCk7XG4gICAgICAgIGlmICghdHJhbnNwb3J0KSByZXR1cm47XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSAnd2Vic29ja2V0JyA9PT0gdHJhbnNwb3J0Lm5hbWU7XG5cbiAgICAgICAgZGVidWcoJ3BhdXNpbmcgY3VycmVudCB0cmFuc3BvcnQgXCIlc1wiJywgc2VsZi50cmFuc3BvcnQubmFtZSk7XG4gICAgICAgIHNlbGYudHJhbnNwb3J0LnBhdXNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoZmFpbGVkKSByZXR1cm47XG4gICAgICAgICAgaWYgKCdjbG9zZWQnID09PSBzZWxmLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgICAgICAgICBkZWJ1ZygnY2hhbmdpbmcgdHJhbnNwb3J0IGFuZCBzZW5kaW5nIHVwZ3JhZGUgcGFja2V0Jyk7XG5cbiAgICAgICAgICBjbGVhbnVwKCk7XG5cbiAgICAgICAgICBzZWxmLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6ICd1cGdyYWRlJyB9XSk7XG4gICAgICAgICAgc2VsZi5lbWl0KCd1cGdyYWRlJywgdHJhbnNwb3J0KTtcbiAgICAgICAgICB0cmFuc3BvcnQgPSBudWxsO1xuICAgICAgICAgIHNlbGYudXBncmFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgc2VsZi5mbHVzaCgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCcsIG5hbWUpO1xuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdwcm9iZSBlcnJvcicpO1xuICAgICAgICBlcnIudHJhbnNwb3J0ID0gdHJhbnNwb3J0Lm5hbWU7XG4gICAgICAgIHNlbGYuZW1pdCgndXBncmFkZUVycm9yJywgZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZyZWV6ZVRyYW5zcG9ydCAoKSB7XG4gICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuXG4gICAgLy8gQW55IGNhbGxiYWNrIGNhbGxlZCBieSB0cmFuc3BvcnQgc2hvdWxkIGJlIGlnbm9yZWQgc2luY2Ugbm93XG4gICAgZmFpbGVkID0gdHJ1ZTtcblxuICAgIGNsZWFudXAoKTtcblxuICAgIHRyYW5zcG9ydC5jbG9zZSgpO1xuICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gIH1cblxuICAvLyBIYW5kbGUgYW55IGVycm9yIHRoYXQgaGFwcGVucyB3aGlsZSBwcm9iaW5nXG4gIGZ1bmN0aW9uIG9uZXJyb3IgKGVycikge1xuICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcigncHJvYmUgZXJyb3I6ICcgKyBlcnIpO1xuICAgIGVycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuXG4gICAgZnJlZXplVHJhbnNwb3J0KCk7XG5cbiAgICBkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBmYWlsZWQgYmVjYXVzZSBvZiBlcnJvcjogJXMnLCBuYW1lLCBlcnIpO1xuXG4gICAgc2VsZi5lbWl0KCd1cGdyYWRlRXJyb3InLCBlcnJvcik7XG4gIH1cblxuICBmdW5jdGlvbiBvblRyYW5zcG9ydENsb3NlICgpIHtcbiAgICBvbmVycm9yKCd0cmFuc3BvcnQgY2xvc2VkJyk7XG4gIH1cblxuICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgY2xvc2VkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgZnVuY3Rpb24gb25jbG9zZSAoKSB7XG4gICAgb25lcnJvcignc29ja2V0IGNsb3NlZCcpO1xuICB9XG5cbiAgLy8gV2hlbiB0aGUgc29ja2V0IGlzIHVwZ3JhZGVkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgZnVuY3Rpb24gb251cGdyYWRlICh0bykge1xuICAgIGlmICh0cmFuc3BvcnQgJiYgdG8ubmFtZSAhPT0gdHJhbnNwb3J0Lm5hbWUpIHtcbiAgICAgIGRlYnVnKCdcIiVzXCIgd29ya3MgLSBhYm9ydGluZyBcIiVzXCInLCB0by5uYW1lLCB0cmFuc3BvcnQubmFtZSk7XG4gICAgICBmcmVlemVUcmFuc3BvcnQoKTtcbiAgICB9XG4gIH1cblxuICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBvbiB0aGUgdHJhbnNwb3J0IGFuZCBvbiBzZWxmXG4gIGZ1bmN0aW9uIGNsZWFudXAgKCkge1xuICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcignb3BlbicsIG9uVHJhbnNwb3J0T3Blbik7XG4gICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvblRyYW5zcG9ydENsb3NlKTtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGluZycsIG9udXBncmFkZSk7XG4gIH1cblxuICB0cmFuc3BvcnQub25jZSgnb3BlbicsIG9uVHJhbnNwb3J0T3Blbik7XG4gIHRyYW5zcG9ydC5vbmNlKCdlcnJvcicsIG9uZXJyb3IpO1xuICB0cmFuc3BvcnQub25jZSgnY2xvc2UnLCBvblRyYW5zcG9ydENsb3NlKTtcblxuICB0aGlzLm9uY2UoJ2Nsb3NlJywgb25jbG9zZSk7XG4gIHRoaXMub25jZSgndXBncmFkaW5nJywgb251cGdyYWRlKTtcblxuICB0cmFuc3BvcnQub3BlbigpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2hlbiBjb25uZWN0aW9uIGlzIGRlZW1lZCBvcGVuLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbk9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdzb2NrZXQgb3BlbicpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7XG4gIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSAnd2Vic29ja2V0JyA9PT0gdGhpcy50cmFuc3BvcnQubmFtZTtcbiAgdGhpcy5lbWl0KCdvcGVuJyk7XG4gIHRoaXMuZmx1c2goKTtcblxuICAvLyB3ZSBjaGVjayBmb3IgYHJlYWR5U3RhdGVgIGluIGNhc2UgYW4gYG9wZW5gXG4gIC8vIGxpc3RlbmVyIGFscmVhZHkgY2xvc2VkIHRoZSBzb2NrZXRcbiAgaWYgKCdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlICYmIHRoaXMudXBncmFkZSAmJiB0aGlzLnRyYW5zcG9ydC5wYXVzZSkge1xuICAgIGRlYnVnKCdzdGFydGluZyB1cGdyYWRlIHByb2JlcycpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy51cGdyYWRlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRoaXMucHJvYmUodGhpcy51cGdyYWRlc1tpXSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgYSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vblBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAnY2xvc2luZycgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIGRlYnVnKCdzb2NrZXQgcmVjZWl2ZTogdHlwZSBcIiVzXCIsIGRhdGEgXCIlc1wiJywgcGFja2V0LnR5cGUsIHBhY2tldC5kYXRhKTtcblxuICAgIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcblxuICAgIC8vIFNvY2tldCBpcyBsaXZlIC0gYW55IHBhY2tldCBjb3VudHNcbiAgICB0aGlzLmVtaXQoJ2hlYXJ0YmVhdCcpO1xuXG4gICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgICAgY2FzZSAnb3Blbic6XG4gICAgICAgIHRoaXMub25IYW5kc2hha2UoSlNPTi5wYXJzZShwYWNrZXQuZGF0YSkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAncG9uZyc6XG4gICAgICAgIHRoaXMuc2V0UGluZygpO1xuICAgICAgICB0aGlzLmVtaXQoJ3BvbmcnKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignc2VydmVyIGVycm9yJyk7XG4gICAgICAgIGVyci5jb2RlID0gcGFja2V0LmRhdGE7XG4gICAgICAgIHRoaXMub25FcnJvcihlcnIpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgIHRoaXMuZW1pdCgnZGF0YScsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgdGhpcy5lbWl0KCdtZXNzYWdlJywgcGFja2V0LmRhdGEpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZGVidWcoJ3BhY2tldCByZWNlaXZlZCB3aXRoIHNvY2tldCByZWFkeVN0YXRlIFwiJXNcIicsIHRoaXMucmVhZHlTdGF0ZSk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhhbmRzaGFrZSBvYmpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25IYW5kc2hha2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLmVtaXQoJ2hhbmRzaGFrZScsIGRhdGEpO1xuICB0aGlzLmlkID0gZGF0YS5zaWQ7XG4gIHRoaXMudHJhbnNwb3J0LnF1ZXJ5LnNpZCA9IGRhdGEuc2lkO1xuICB0aGlzLnVwZ3JhZGVzID0gdGhpcy5maWx0ZXJVcGdyYWRlcyhkYXRhLnVwZ3JhZGVzKTtcbiAgdGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDtcbiAgdGhpcy5waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7XG4gIHRoaXMub25PcGVuKCk7XG4gIC8vIEluIGNhc2Ugb3BlbiBoYW5kbGVyIGNsb3NlcyBzb2NrZXRcbiAgaWYgKCdjbG9zZWQnID09PSB0aGlzLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgdGhpcy5zZXRQaW5nKCk7XG5cbiAgLy8gUHJvbG9uZyBsaXZlbmVzcyBvZiBzb2NrZXQgb24gaGVhcnRiZWF0XG4gIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2hlYXJ0YmVhdCcsIHRoaXMub25IZWFydGJlYXQpO1xuICB0aGlzLm9uKCdoZWFydGJlYXQnLCB0aGlzLm9uSGVhcnRiZWF0KTtcbn07XG5cbi8qKlxuICogUmVzZXRzIHBpbmcgdGltZW91dC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uSGVhcnRiZWF0ID0gZnVuY3Rpb24gKHRpbWVvdXQpIHtcbiAgY2xlYXJUaW1lb3V0KHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgc2VsZi5waW5nVGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCdjbG9zZWQnID09PSBzZWxmLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgICBzZWxmLm9uQ2xvc2UoJ3BpbmcgdGltZW91dCcpO1xuICB9LCB0aW1lb3V0IHx8IChzZWxmLnBpbmdJbnRlcnZhbCArIHNlbGYucGluZ1RpbWVvdXQpKTtcbn07XG5cbi8qKlxuICogUGluZ3Mgc2VydmVyIGV2ZXJ5IGB0aGlzLnBpbmdJbnRlcnZhbGAgYW5kIGV4cGVjdHMgcmVzcG9uc2VcbiAqIHdpdGhpbiBgdGhpcy5waW5nVGltZW91dGAgb3IgY2xvc2VzIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5zZXRQaW5nID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGNsZWFyVGltZW91dChzZWxmLnBpbmdJbnRlcnZhbFRpbWVyKTtcbiAgc2VsZi5waW5nSW50ZXJ2YWxUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgIGRlYnVnKCd3cml0aW5nIHBpbmcgcGFja2V0IC0gZXhwZWN0aW5nIHBvbmcgd2l0aGluICVzbXMnLCBzZWxmLnBpbmdUaW1lb3V0KTtcbiAgICBzZWxmLnBpbmcoKTtcbiAgICBzZWxmLm9uSGVhcnRiZWF0KHNlbGYucGluZ1RpbWVvdXQpO1xuICB9LCBzZWxmLnBpbmdJbnRlcnZhbCk7XG59O1xuXG4vKipcbiogU2VuZHMgYSBwaW5nIHBhY2tldC5cbipcbiogQGFwaSBwcml2YXRlXG4qL1xuXG5Tb2NrZXQucHJvdG90eXBlLnBpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5zZW5kUGFja2V0KCdwaW5nJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYuZW1pdCgncGluZycpO1xuICB9KTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIG9uIGBkcmFpbmAgZXZlbnRcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uRHJhaW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMud3JpdGVCdWZmZXIuc3BsaWNlKDAsIHRoaXMucHJldkJ1ZmZlckxlbik7XG5cbiAgLy8gc2V0dGluZyBwcmV2QnVmZmVyTGVuID0gMCBpcyB2ZXJ5IGltcG9ydGFudFxuICAvLyBmb3IgZXhhbXBsZSwgd2hlbiB1cGdyYWRpbmcsIHVwZ3JhZGUgcGFja2V0IGlzIHNlbnQgb3ZlcixcbiAgLy8gYW5kIGEgbm9uemVybyBwcmV2QnVmZmVyTGVuIGNvdWxkIGNhdXNlIHByb2JsZW1zIG9uIGBkcmFpbmBcbiAgdGhpcy5wcmV2QnVmZmVyTGVuID0gMDtcblxuICBpZiAoMCA9PT0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICB0aGlzLmVtaXQoJ2RyYWluJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5mbHVzaCgpO1xuICB9XG59O1xuXG4vKipcbiAqIEZsdXNoIHdyaXRlIGJ1ZmZlcnMuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdjbG9zZWQnICE9PSB0aGlzLnJlYWR5U3RhdGUgJiYgdGhpcy50cmFuc3BvcnQud3JpdGFibGUgJiZcbiAgICAhdGhpcy51cGdyYWRpbmcgJiYgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICBkZWJ1ZygnZmx1c2hpbmcgJWQgcGFja2V0cyBpbiBzb2NrZXQnLCB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCk7XG4gICAgdGhpcy50cmFuc3BvcnQuc2VuZCh0aGlzLndyaXRlQnVmZmVyKTtcbiAgICAvLyBrZWVwIHRyYWNrIG9mIGN1cnJlbnQgbGVuZ3RoIG9mIHdyaXRlQnVmZmVyXG4gICAgLy8gc3BsaWNlIHdyaXRlQnVmZmVyIGFuZCBjYWxsYmFja0J1ZmZlciBvbiBgZHJhaW5gXG4gICAgdGhpcy5wcmV2QnVmZmVyTGVuID0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGg7XG4gICAgdGhpcy5lbWl0KCdmbHVzaCcpO1xuICB9XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgbWVzc2FnZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gKiBAcmV0dXJuIHtTb2NrZXR9IGZvciBjaGFpbmluZy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS53cml0ZSA9XG5Tb2NrZXQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAobXNnLCBvcHRpb25zLCBmbikge1xuICB0aGlzLnNlbmRQYWNrZXQoJ21lc3NhZ2UnLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYWNrZXQgdHlwZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuc2VuZFBhY2tldCA9IGZ1bmN0aW9uICh0eXBlLCBkYXRhLCBvcHRpb25zLCBmbikge1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGRhdGEpIHtcbiAgICBmbiA9IGRhdGE7XG4gICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgIGZuID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuXG4gIGlmICgnY2xvc2luZycgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2VkJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIG9wdGlvbnMuY29tcHJlc3MgPSBmYWxzZSAhPT0gb3B0aW9ucy5jb21wcmVzcztcblxuICB2YXIgcGFja2V0ID0ge1xuICAgIHR5cGU6IHR5cGUsXG4gICAgZGF0YTogZGF0YSxcbiAgICBvcHRpb25zOiBvcHRpb25zXG4gIH07XG4gIHRoaXMuZW1pdCgncGFja2V0Q3JlYXRlJywgcGFja2V0KTtcbiAgdGhpcy53cml0ZUJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gIGlmIChmbikgdGhpcy5vbmNlKCdmbHVzaCcsIGZuKTtcbiAgdGhpcy5mbHVzaCgpO1xufTtcblxuLyoqXG4gKiBDbG9zZXMgdGhlIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NpbmcnO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICB0aGlzLm9uY2UoJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgICAgICB3YWl0Rm9yVXBncmFkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2UgKCkge1xuICAgIHNlbGYub25DbG9zZSgnZm9yY2VkIGNsb3NlJyk7XG4gICAgZGVidWcoJ3NvY2tldCBjbG9zaW5nIC0gdGVsbGluZyB0cmFuc3BvcnQgdG8gY2xvc2UnKTtcbiAgICBzZWxmLnRyYW5zcG9ydC5jbG9zZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYW51cEFuZENsb3NlICgpIHtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRlJywgY2xlYW51cEFuZENsb3NlKTtcbiAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRlRXJyb3InLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgIGNsb3NlKCk7XG4gIH1cblxuICBmdW5jdGlvbiB3YWl0Rm9yVXBncmFkZSAoKSB7XG4gICAgLy8gd2FpdCBmb3IgdXBncmFkZSB0byBmaW5pc2ggc2luY2Ugd2UgY2FuJ3Qgc2VuZCBwYWNrZXRzIHdoaWxlIHBhdXNpbmcgYSB0cmFuc3BvcnRcbiAgICBzZWxmLm9uY2UoJ3VwZ3JhZGUnLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgIHNlbGYub25jZSgndXBncmFkZUVycm9yJywgY2xlYW51cEFuZENsb3NlKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgZXJyb3JcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gIGRlYnVnKCdzb2NrZXQgZXJyb3IgJWonLCBlcnIpO1xuICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG4gIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB0aGlzLm9uQ2xvc2UoJ3RyYW5zcG9ydCBlcnJvcicsIGVycik7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBjbG9zZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAocmVhc29uLCBkZXNjKSB7XG4gIGlmICgnb3BlbmluZycgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2luZycgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIGRlYnVnKCdzb2NrZXQgY2xvc2Ugd2l0aCByZWFzb246IFwiJXNcIicsIHJlYXNvbik7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gY2xlYXIgdGltZXJzXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucGluZ0ludGVydmFsVGltZXIpO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnBpbmdUaW1lb3V0VGltZXIpO1xuXG4gICAgLy8gc3RvcCBldmVudCBmcm9tIGZpcmluZyBhZ2FpbiBmb3IgdHJhbnNwb3J0XG4gICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCdjbG9zZScpO1xuXG4gICAgLy8gZW5zdXJlIHRyYW5zcG9ydCB3b24ndCBzdGF5IG9wZW5cbiAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuXG4gICAgLy8gaWdub3JlIGZ1cnRoZXIgdHJhbnNwb3J0IGNvbW11bmljYXRpb25cbiAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblxuICAgIC8vIHNldCByZWFkeSBzdGF0ZVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuXG4gICAgLy8gY2xlYXIgc2Vzc2lvbiBpZFxuICAgIHRoaXMuaWQgPSBudWxsO1xuXG4gICAgLy8gZW1pdCBjbG9zZSBldmVudFxuICAgIHRoaXMuZW1pdCgnY2xvc2UnLCByZWFzb24sIGRlc2MpO1xuXG4gICAgLy8gY2xlYW4gYnVmZmVycyBhZnRlciwgc28gdXNlcnMgY2FuIHN0aWxsXG4gICAgLy8gZ3JhYiB0aGUgYnVmZmVycyBvbiBgY2xvc2VgIGV2ZW50XG4gICAgc2VsZi53cml0ZUJ1ZmZlciA9IFtdO1xuICAgIHNlbGYucHJldkJ1ZmZlckxlbiA9IDA7XG4gIH1cbn07XG5cbi8qKlxuICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gc2VydmVyIHVwZ3JhZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5maWx0ZXJVcGdyYWRlcyA9IGZ1bmN0aW9uICh1cGdyYWRlcykge1xuICB2YXIgZmlsdGVyZWRVcGdyYWRlcyA9IFtdO1xuICBmb3IgKHZhciBpID0gMCwgaiA9IHVwZ3JhZGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgIGlmICh+aW5kZXgodGhpcy50cmFuc3BvcnRzLCB1cGdyYWRlc1tpXSkpIGZpbHRlcmVkVXBncmFkZXMucHVzaCh1cGdyYWRlc1tpXSk7XG4gIH1cbiAgcmV0dXJuIGZpbHRlcmVkVXBncmFkZXM7XG59O1xuIiwiXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICpcbiAqIExvZ2ljIGJvcnJvd2VkIGZyb20gTW9kZXJuaXpyOlxuICpcbiAqICAgLSBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvY29ycy5qc1xuICovXG5cbnRyeSB7XG4gIG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xufSBjYXRjaCAoZXJyKSB7XG4gIC8vIGlmIFhNTEh0dHAgc3VwcG9ydCBpcyBkaXNhYmxlZCBpbiBJRSB0aGVuIGl0IHdpbGwgdGhyb3dcbiAgLy8gd2hlbiB0cnlpbmcgdG8gY3JlYXRlXG4gIG1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG59XG4iLCIvKiBnbG9iYWwgYXR0YWNoRXZlbnQgKi9cblxuLyoqXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxuICovXG5cbnZhciBYTUxIdHRwUmVxdWVzdCA9IHJlcXVpcmUoJ3htbGh0dHByZXF1ZXN0LXNzbCcpO1xudmFyIFBvbGxpbmcgPSByZXF1aXJlKCcuL3BvbGxpbmcnKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnY29tcG9uZW50LWluaGVyaXQnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6cG9sbGluZy14aHInKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFhIUjtcbm1vZHVsZS5leHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0O1xuXG4vKipcbiAqIEVtcHR5IGZ1bmN0aW9uXG4gKi9cblxuZnVuY3Rpb24gZW1wdHkgKCkge31cblxuLyoqXG4gKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBYSFIgKG9wdHMpIHtcbiAgUG9sbGluZy5jYWxsKHRoaXMsIG9wdHMpO1xuICB0aGlzLnJlcXVlc3RUaW1lb3V0ID0gb3B0cy5yZXF1ZXN0VGltZW91dDtcbiAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcblxuICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBpc1NTTCA9ICdodHRwczonID09PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICB2YXIgcG9ydCA9IGxvY2F0aW9uLnBvcnQ7XG5cbiAgICAvLyBzb21lIHVzZXIgYWdlbnRzIGhhdmUgZW1wdHkgYGxvY2F0aW9uLnBvcnRgXG4gICAgaWYgKCFwb3J0KSB7XG4gICAgICBwb3J0ID0gaXNTU0wgPyA0NDMgOiA4MDtcbiAgICB9XG5cbiAgICB0aGlzLnhkID0gKHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0cy5ob3N0bmFtZSAhPT0gbG9jYXRpb24uaG9zdG5hbWUpIHx8XG4gICAgICBwb3J0ICE9PSBvcHRzLnBvcnQ7XG4gICAgdGhpcy54cyA9IG9wdHMuc2VjdXJlICE9PSBpc1NTTDtcbiAgfVxufVxuXG4vKipcbiAqIEluaGVyaXRzIGZyb20gUG9sbGluZy5cbiAqL1xuXG5pbmhlcml0KFhIUiwgUG9sbGluZyk7XG5cbi8qKlxuICogWEhSIHN1cHBvcnRzIGJpbmFyeVxuICovXG5cblhIUi5wcm90b3R5cGUuc3VwcG9ydHNCaW5hcnkgPSB0cnVlO1xuXG4vKipcbiAqIENyZWF0ZXMgYSByZXF1ZXN0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblhIUi5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICBvcHRzLnVyaSA9IHRoaXMudXJpKCk7XG4gIG9wdHMueGQgPSB0aGlzLnhkO1xuICBvcHRzLnhzID0gdGhpcy54cztcbiAgb3B0cy5hZ2VudCA9IHRoaXMuYWdlbnQgfHwgZmFsc2U7XG4gIG9wdHMuc3VwcG9ydHNCaW5hcnkgPSB0aGlzLnN1cHBvcnRzQmluYXJ5O1xuICBvcHRzLmVuYWJsZXNYRFIgPSB0aGlzLmVuYWJsZXNYRFI7XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIG9wdHMucGZ4ID0gdGhpcy5wZng7XG4gIG9wdHMua2V5ID0gdGhpcy5rZXk7XG4gIG9wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtcbiAgb3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O1xuICBvcHRzLmNhID0gdGhpcy5jYTtcbiAgb3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO1xuICBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO1xuICBvcHRzLnJlcXVlc3RUaW1lb3V0ID0gdGhpcy5yZXF1ZXN0VGltZW91dDtcblxuICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICBvcHRzLmV4dHJhSGVhZGVycyA9IHRoaXMuZXh0cmFIZWFkZXJzO1xuXG4gIHJldHVybiBuZXcgUmVxdWVzdChvcHRzKTtcbn07XG5cbi8qKlxuICogU2VuZHMgZGF0YS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YSB0byBzZW5kLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGVkIHVwb24gZmx1c2guXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5YSFIucHJvdG90eXBlLmRvV3JpdGUgPSBmdW5jdGlvbiAoZGF0YSwgZm4pIHtcbiAgdmFyIGlzQmluYXJ5ID0gdHlwZW9mIGRhdGEgIT09ICdzdHJpbmcnICYmIGRhdGEgIT09IHVuZGVmaW5lZDtcbiAgdmFyIHJlcSA9IHRoaXMucmVxdWVzdCh7IG1ldGhvZDogJ1BPU1QnLCBkYXRhOiBkYXRhLCBpc0JpbmFyeTogaXNCaW5hcnkgfSk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgcmVxLm9uKCdzdWNjZXNzJywgZm4pO1xuICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgIHNlbGYub25FcnJvcigneGhyIHBvc3QgZXJyb3InLCBlcnIpO1xuICB9KTtcbiAgdGhpcy5zZW5kWGhyID0gcmVxO1xufTtcblxuLyoqXG4gKiBTdGFydHMgYSBwb2xsIGN5Y2xlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblhIUi5wcm90b3R5cGUuZG9Qb2xsID0gZnVuY3Rpb24gKCkge1xuICBkZWJ1ZygneGhyIHBvbGwnKTtcbiAgdmFyIHJlcSA9IHRoaXMucmVxdWVzdCgpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHJlcS5vbignZGF0YScsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgc2VsZi5vbkRhdGEoZGF0YSk7XG4gIH0pO1xuICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgIHNlbGYub25FcnJvcigneGhyIHBvbGwgZXJyb3InLCBlcnIpO1xuICB9KTtcbiAgdGhpcy5wb2xsWGhyID0gcmVxO1xufTtcblxuLyoqXG4gKiBSZXF1ZXN0IGNvbnN0cnVjdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdCAob3B0cykge1xuICB0aGlzLm1ldGhvZCA9IG9wdHMubWV0aG9kIHx8ICdHRVQnO1xuICB0aGlzLnVyaSA9IG9wdHMudXJpO1xuICB0aGlzLnhkID0gISFvcHRzLnhkO1xuICB0aGlzLnhzID0gISFvcHRzLnhzO1xuICB0aGlzLmFzeW5jID0gZmFsc2UgIT09IG9wdHMuYXN5bmM7XG4gIHRoaXMuZGF0YSA9IHVuZGVmaW5lZCAhPT0gb3B0cy5kYXRhID8gb3B0cy5kYXRhIDogbnVsbDtcbiAgdGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQ7XG4gIHRoaXMuaXNCaW5hcnkgPSBvcHRzLmlzQmluYXJ5O1xuICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gb3B0cy5zdXBwb3J0c0JpbmFyeTtcbiAgdGhpcy5lbmFibGVzWERSID0gb3B0cy5lbmFibGVzWERSO1xuICB0aGlzLnJlcXVlc3RUaW1lb3V0ID0gb3B0cy5yZXF1ZXN0VGltZW91dDtcblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5wZnggPSBvcHRzLnBmeDtcbiAgdGhpcy5rZXkgPSBvcHRzLmtleTtcbiAgdGhpcy5wYXNzcGhyYXNlID0gb3B0cy5wYXNzcGhyYXNlO1xuICB0aGlzLmNlcnQgPSBvcHRzLmNlcnQ7XG4gIHRoaXMuY2EgPSBvcHRzLmNhO1xuICB0aGlzLmNpcGhlcnMgPSBvcHRzLmNpcGhlcnM7XG4gIHRoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7XG5cbiAgLy8gb3RoZXIgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcblxuICB0aGlzLmNyZWF0ZSgpO1xufVxuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgWEhSIG9iamVjdCBhbmQgc2VuZHMgdGhlIHJlcXVlc3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgb3B0cyA9IHsgYWdlbnQ6IHRoaXMuYWdlbnQsIHhkb21haW46IHRoaXMueGQsIHhzY2hlbWU6IHRoaXMueHMsIGVuYWJsZXNYRFI6IHRoaXMuZW5hYmxlc1hEUiB9O1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICBvcHRzLnBmeCA9IHRoaXMucGZ4O1xuICBvcHRzLmtleSA9IHRoaXMua2V5O1xuICBvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7XG4gIG9wdHMuY2VydCA9IHRoaXMuY2VydDtcbiAgb3B0cy5jYSA9IHRoaXMuY2E7XG4gIG9wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztcbiAgb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPSB0aGlzLnJlamVjdFVuYXV0aG9yaXplZDtcblxuICB2YXIgeGhyID0gdGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cyk7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0cnkge1xuICAgIGRlYnVnKCd4aHIgb3BlbiAlczogJXMnLCB0aGlzLm1ldGhvZCwgdGhpcy51cmkpO1xuICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVyaSwgdGhpcy5hc3luYyk7XG4gICAgdHJ5IHtcbiAgICAgIGlmICh0aGlzLmV4dHJhSGVhZGVycykge1xuICAgICAgICB4aHIuc2V0RGlzYWJsZUhlYWRlckNoZWNrICYmIHhoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sodHJ1ZSk7XG4gICAgICAgIGZvciAodmFyIGkgaW4gdGhpcy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICBpZiAodGhpcy5leHRyYUhlYWRlcnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGksIHRoaXMuZXh0cmFIZWFkZXJzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgaWYgKCdQT1NUJyA9PT0gdGhpcy5tZXRob2QpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICh0aGlzLmlzQmluYXJ5KSB7XG4gICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7fVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJyovKicpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAvLyBpZTYgY2hlY2tcbiAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yZXF1ZXN0VGltZW91dCkge1xuICAgICAgeGhyLnRpbWVvdXQgPSB0aGlzLnJlcXVlc3RUaW1lb3V0O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhhc1hEUigpKSB7XG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLm9uTG9hZCgpO1xuICAgICAgfTtcbiAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLm9uRXJyb3IoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDIpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdmFyIGNvbnRlbnRUeXBlID0geGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKTtcbiAgICAgICAgICAgIGlmIChzZWxmLnN1cHBvcnRzQmluYXJ5ICYmIGNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJykge1xuICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG4gICAgICAgIGlmICg0ICE9PSB4aHIucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICAgICAgICBpZiAoMjAwID09PSB4aHIuc3RhdHVzIHx8IDEyMjMgPT09IHhoci5zdGF0dXMpIHtcbiAgICAgICAgICBzZWxmLm9uTG9hZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgYGVycm9yYCBldmVudCBoYW5kbGVyIHRoYXQncyB1c2VyLXNldFxuICAgICAgICAgIC8vIGRvZXMgbm90IHRocm93IGluIHRoZSBzYW1lIHRpY2sgYW5kIGdldHMgY2F1Z2h0IGhlcmVcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYub25FcnJvcih4aHIuc3RhdHVzKTtcbiAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBkZWJ1ZygneGhyIGRhdGEgJXMnLCB0aGlzLmRhdGEpO1xuICAgIHhoci5zZW5kKHRoaXMuZGF0YSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBOZWVkIHRvIGRlZmVyIHNpbmNlIC5jcmVhdGUoKSBpcyBjYWxsZWQgZGlyZWN0bHkgZmhyb20gdGhlIGNvbnN0cnVjdG9yXG4gICAgLy8gYW5kIHRodXMgdGhlICdlcnJvcicgZXZlbnQgY2FuIG9ubHkgYmUgb25seSBib3VuZCAqYWZ0ZXIqIHRoaXMgZXhjZXB0aW9uXG4gICAgLy8gb2NjdXJzLiAgVGhlcmVmb3JlLCBhbHNvLCB3ZSBjYW5ub3QgdGhyb3cgaGVyZSBhdCBhbGwuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLm9uRXJyb3IoZSk7XG4gICAgfSwgMCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLmluZGV4ID0gUmVxdWVzdC5yZXF1ZXN0c0NvdW50Kys7XG4gICAgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XSA9IHRoaXM7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZXNwb25zZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5vblN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW1pdCgnc3VjY2VzcycpO1xuICB0aGlzLmNsZWFudXAoKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIGlmIHdlIGhhdmUgZGF0YS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB0aGlzLmVtaXQoJ2RhdGEnLCBkYXRhKTtcbiAgdGhpcy5vblN1Y2Nlc3MoKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIHRoaXMuY2xlYW51cCh0cnVlKTtcbn07XG5cbi8qKlxuICogQ2xlYW5zIHVwIGhvdXNlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbiAoZnJvbUVycm9yKSB7XG4gIGlmICgndW5kZWZpbmVkJyA9PT0gdHlwZW9mIHRoaXMueGhyIHx8IG51bGwgPT09IHRoaXMueGhyKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHhtbGh0dHByZXF1ZXN0XG4gIGlmICh0aGlzLmhhc1hEUigpKSB7XG4gICAgdGhpcy54aHIub25sb2FkID0gdGhpcy54aHIub25lcnJvciA9IGVtcHR5O1xuICB9IGVsc2Uge1xuICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuICB9XG5cbiAgaWYgKGZyb21FcnJvcikge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnhoci5hYm9ydCgpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cblxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGRlbGV0ZSBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdO1xuICB9XG5cbiAgdGhpcy54aHIgPSBudWxsO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBsb2FkLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLm9uTG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGRhdGE7XG4gIHRyeSB7XG4gICAgdmFyIGNvbnRlbnRUeXBlO1xuICAgIHRyeSB7XG4gICAgICBjb250ZW50VHlwZSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIGlmIChjb250ZW50VHlwZSA9PT0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpIHtcbiAgICAgIGRhdGEgPSB0aGlzLnhoci5yZXNwb25zZSB8fCB0aGlzLnhoci5yZXNwb25zZVRleHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEgPSB0aGlzLnhoci5yZXNwb25zZVRleHQ7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgdGhpcy5vbkVycm9yKGUpO1xuICB9XG4gIGlmIChudWxsICE9IGRhdGEpIHtcbiAgICB0aGlzLm9uRGF0YShkYXRhKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDaGVjayBpZiBpdCBoYXMgWERvbWFpblJlcXVlc3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuaGFzWERSID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdHlwZW9mIFhEb21haW5SZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJiAhdGhpcy54cyAmJiB0aGlzLmVuYWJsZXNYRFI7XG59O1xuXG4vKipcbiAqIEFib3J0cyB0aGUgcmVxdWVzdC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmNsZWFudXAoKTtcbn07XG5cbi8qKlxuICogQWJvcnRzIHBlbmRpbmcgcmVxdWVzdHMgd2hlbiB1bmxvYWRpbmcgdGhlIHdpbmRvdy4gVGhpcyBpcyBuZWVkZWQgdG8gcHJldmVudFxuICogbWVtb3J5IGxlYWtzIChlLmcuIHdoZW4gdXNpbmcgSUUpIGFuZCB0byBlbnN1cmUgdGhhdCBubyBzcHVyaW91cyBlcnJvciBpc1xuICogZW1pdHRlZC5cbiAqL1xuXG5SZXF1ZXN0LnJlcXVlc3RzQ291bnQgPSAwO1xuUmVxdWVzdC5yZXF1ZXN0cyA9IHt9O1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICBpZiAodHlwZW9mIGF0dGFjaEV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgYXR0YWNoRXZlbnQoJ29udW5sb2FkJywgdW5sb2FkSGFuZGxlcik7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgdGVybWluYXRpb25FdmVudCA9ICdvbnBhZ2VoaWRlJyBpbiBzZWxmID8gJ3BhZ2VoaWRlJyA6ICd1bmxvYWQnO1xuICAgIGFkZEV2ZW50TGlzdGVuZXIodGVybWluYXRpb25FdmVudCwgdW5sb2FkSGFuZGxlciwgZmFsc2UpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVubG9hZEhhbmRsZXIgKCkge1xuICBmb3IgKHZhciBpIGluIFJlcXVlc3QucmVxdWVzdHMpIHtcbiAgICBpZiAoUmVxdWVzdC5yZXF1ZXN0cy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgUmVxdWVzdC5yZXF1ZXN0c1tpXS5hYm9ydCgpO1xuICAgIH1cbiAgfVxufVxuIiwiXG4vKipcbiAqIEdldHMgdGhlIGtleXMgZm9yIGFuIG9iamVjdC5cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0ga2V5c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzIChvYmope1xuICB2YXIgYXJyID0gW107XG4gIHZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcy5jYWxsKG9iaiwgaSkpIHtcbiAgICAgIGFyci5wdXNoKGkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyO1xufTtcbiIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuIiwiLyoqXG4gKiBBbiBhYnN0cmFjdGlvbiBmb3Igc2xpY2luZyBhbiBhcnJheWJ1ZmZlciBldmVuIHdoZW5cbiAqIEFycmF5QnVmZmVyLnByb3RvdHlwZS5zbGljZSBpcyBub3Qgc3VwcG9ydGVkXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGFycmF5YnVmZmVyLmJ5dGVMZW5ndGg7XG4gIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgZW5kID0gZW5kIHx8IGJ5dGVzO1xuXG4gIGlmIChhcnJheWJ1ZmZlci5zbGljZSkgeyByZXR1cm4gYXJyYXlidWZmZXIuc2xpY2Uoc3RhcnQsIGVuZCk7IH1cblxuICBpZiAoc3RhcnQgPCAwKSB7IHN0YXJ0ICs9IGJ5dGVzOyB9XG4gIGlmIChlbmQgPCAwKSB7IGVuZCArPSBieXRlczsgfVxuICBpZiAoZW5kID4gYnl0ZXMpIHsgZW5kID0gYnl0ZXM7IH1cblxuICBpZiAoc3RhcnQgPj0gYnl0ZXMgfHwgc3RhcnQgPj0gZW5kIHx8IGJ5dGVzID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBBcnJheUJ1ZmZlcigwKTtcbiAgfVxuXG4gIHZhciBhYnYgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7XG4gIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheShlbmQgLSBzdGFydCk7XG4gIGZvciAodmFyIGkgPSBzdGFydCwgaWkgPSAwOyBpIDwgZW5kOyBpKyssIGlpKyspIHtcbiAgICByZXN1bHRbaWldID0gYWJ2W2ldO1xuICB9XG4gIHJldHVybiByZXN1bHQuYnVmZmVyO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gYWZ0ZXJcblxuZnVuY3Rpb24gYWZ0ZXIoY291bnQsIGNhbGxiYWNrLCBlcnJfY2IpIHtcbiAgICB2YXIgYmFpbCA9IGZhbHNlXG4gICAgZXJyX2NiID0gZXJyX2NiIHx8IG5vb3BcbiAgICBwcm94eS5jb3VudCA9IGNvdW50XG5cbiAgICByZXR1cm4gKGNvdW50ID09PSAwKSA/IGNhbGxiYWNrKCkgOiBwcm94eVxuXG4gICAgZnVuY3Rpb24gcHJveHkoZXJyLCByZXN1bHQpIHtcbiAgICAgICAgaWYgKHByb3h5LmNvdW50IDw9IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYWZ0ZXIgY2FsbGVkIHRvbyBtYW55IHRpbWVzJylcbiAgICAgICAgfVxuICAgICAgICAtLXByb3h5LmNvdW50XG5cbiAgICAgICAgLy8gYWZ0ZXIgZmlyc3QgZXJyb3IsIHJlc3QgYXJlIHBhc3NlZCB0byBlcnJfY2JcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgYmFpbCA9IHRydWVcbiAgICAgICAgICAgIGNhbGxiYWNrKGVycilcbiAgICAgICAgICAgIC8vIGZ1dHVyZSBlcnJvciBjYWxsYmFja3Mgd2lsbCBnbyB0byBlcnJvciBoYW5kbGVyXG4gICAgICAgICAgICBjYWxsYmFjayA9IGVycl9jYlxuICAgICAgICB9IGVsc2UgaWYgKHByb3h5LmNvdW50ID09PSAwICYmICFiYWlsKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwiLyohIGh0dHBzOi8vbXRocy5iZS91dGY4anMgdjIuMS4yIGJ5IEBtYXRoaWFzICovXG5cbnZhciBzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuXG4vLyBUYWtlbiBmcm9tIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZVxuZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcblx0dmFyIG91dHB1dCA9IFtdO1xuXHR2YXIgY291bnRlciA9IDA7XG5cdHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuXHR2YXIgdmFsdWU7XG5cdHZhciBleHRyYTtcblx0d2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcblx0XHR2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0aWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuXHRcdFx0Ly8gaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyXG5cdFx0XHRleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG5cdFx0XHRpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHsgLy8gbG93IHN1cnJvZ2F0ZVxuXHRcdFx0XHRvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlIG5leHRcblx0XHRcdFx0Ly8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG5cdFx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHRcdFx0Y291bnRlci0tO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRvdXRwdXQucHVzaCh2YWx1ZSk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBvdXRwdXQ7XG59XG5cbi8vIFRha2VuIGZyb20gaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlXG5mdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG5cdHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cdHZhciBpbmRleCA9IC0xO1xuXHR2YXIgdmFsdWU7XG5cdHZhciBvdXRwdXQgPSAnJztcblx0d2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcblx0XHR2YWx1ZSA9IGFycmF5W2luZGV4XTtcblx0XHRpZiAodmFsdWUgPiAweEZGRkYpIHtcblx0XHRcdHZhbHVlIC09IDB4MTAwMDA7XG5cdFx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcblx0XHRcdHZhbHVlID0gMHhEQzAwIHwgdmFsdWUgJiAweDNGRjtcblx0XHR9XG5cdFx0b3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7XG5cdH1cblx0cmV0dXJuIG91dHB1dDtcbn1cblxuZnVuY3Rpb24gY2hlY2tTY2FsYXJWYWx1ZShjb2RlUG9pbnQsIHN0cmljdCkge1xuXHRpZiAoY29kZVBvaW50ID49IDB4RDgwMCAmJiBjb2RlUG9pbnQgPD0gMHhERkZGKSB7XG5cdFx0aWYgKHN0cmljdCkge1xuXHRcdFx0dGhyb3cgRXJyb3IoXG5cdFx0XHRcdCdMb25lIHN1cnJvZ2F0ZSBVKycgKyBjb2RlUG9pbnQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgK1xuXHRcdFx0XHQnIGlzIG5vdCBhIHNjYWxhciB2YWx1ZSdcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5mdW5jdGlvbiBjcmVhdGVCeXRlKGNvZGVQb2ludCwgc2hpZnQpIHtcblx0cmV0dXJuIHN0cmluZ0Zyb21DaGFyQ29kZSgoKGNvZGVQb2ludCA+PiBzaGlmdCkgJiAweDNGKSB8IDB4ODApO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVDb2RlUG9pbnQoY29kZVBvaW50LCBzdHJpY3QpIHtcblx0aWYgKChjb2RlUG9pbnQgJiAweEZGRkZGRjgwKSA9PSAwKSB7IC8vIDEtYnl0ZSBzZXF1ZW5jZVxuXHRcdHJldHVybiBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50KTtcblx0fVxuXHR2YXIgc3ltYm9sID0gJyc7XG5cdGlmICgoY29kZVBvaW50ICYgMHhGRkZGRjgwMCkgPT0gMCkgeyAvLyAyLWJ5dGUgc2VxdWVuY2Vcblx0XHRzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoKChjb2RlUG9pbnQgPj4gNikgJiAweDFGKSB8IDB4QzApO1xuXHR9XG5cdGVsc2UgaWYgKChjb2RlUG9pbnQgJiAweEZGRkYwMDAwKSA9PSAwKSB7IC8vIDMtYnl0ZSBzZXF1ZW5jZVxuXHRcdGlmICghY2hlY2tTY2FsYXJWYWx1ZShjb2RlUG9pbnQsIHN0cmljdCkpIHtcblx0XHRcdGNvZGVQb2ludCA9IDB4RkZGRDtcblx0XHR9XG5cdFx0c3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKCgoY29kZVBvaW50ID4+IDEyKSAmIDB4MEYpIHwgMHhFMCk7XG5cdFx0c3ltYm9sICs9IGNyZWF0ZUJ5dGUoY29kZVBvaW50LCA2KTtcblx0fVxuXHRlbHNlIGlmICgoY29kZVBvaW50ICYgMHhGRkUwMDAwMCkgPT0gMCkgeyAvLyA0LWJ5dGUgc2VxdWVuY2Vcblx0XHRzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoKChjb2RlUG9pbnQgPj4gMTgpICYgMHgwNykgfCAweEYwKTtcblx0XHRzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIDEyKTtcblx0XHRzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIDYpO1xuXHR9XG5cdHN5bWJvbCArPSBzdHJpbmdGcm9tQ2hhckNvZGUoKGNvZGVQb2ludCAmIDB4M0YpIHwgMHg4MCk7XG5cdHJldHVybiBzeW1ib2w7XG59XG5cbmZ1bmN0aW9uIHV0ZjhlbmNvZGUoc3RyaW5nLCBvcHRzKSB7XG5cdG9wdHMgPSBvcHRzIHx8IHt9O1xuXHR2YXIgc3RyaWN0ID0gZmFsc2UgIT09IG9wdHMuc3RyaWN0O1xuXG5cdHZhciBjb2RlUG9pbnRzID0gdWNzMmRlY29kZShzdHJpbmcpO1xuXHR2YXIgbGVuZ3RoID0gY29kZVBvaW50cy5sZW5ndGg7XG5cdHZhciBpbmRleCA9IC0xO1xuXHR2YXIgY29kZVBvaW50O1xuXHR2YXIgYnl0ZVN0cmluZyA9ICcnO1xuXHR3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuXHRcdGNvZGVQb2ludCA9IGNvZGVQb2ludHNbaW5kZXhdO1xuXHRcdGJ5dGVTdHJpbmcgKz0gZW5jb2RlQ29kZVBvaW50KGNvZGVQb2ludCwgc3RyaWN0KTtcblx0fVxuXHRyZXR1cm4gYnl0ZVN0cmluZztcbn1cblxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIHJlYWRDb250aW51YXRpb25CeXRlKCkge1xuXHRpZiAoYnl0ZUluZGV4ID49IGJ5dGVDb3VudCkge1xuXHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGJ5dGUgaW5kZXgnKTtcblx0fVxuXG5cdHZhciBjb250aW51YXRpb25CeXRlID0gYnl0ZUFycmF5W2J5dGVJbmRleF0gJiAweEZGO1xuXHRieXRlSW5kZXgrKztcblxuXHRpZiAoKGNvbnRpbnVhdGlvbkJ5dGUgJiAweEMwKSA9PSAweDgwKSB7XG5cdFx0cmV0dXJuIGNvbnRpbnVhdGlvbkJ5dGUgJiAweDNGO1xuXHR9XG5cblx0Ly8gSWYgd2UgZW5kIHVwIGhlcmUsIGl04oCZcyBub3QgYSBjb250aW51YXRpb24gYnl0ZVxuXHR0aHJvdyBFcnJvcignSW52YWxpZCBjb250aW51YXRpb24gYnl0ZScpO1xufVxuXG5mdW5jdGlvbiBkZWNvZGVTeW1ib2woc3RyaWN0KSB7XG5cdHZhciBieXRlMTtcblx0dmFyIGJ5dGUyO1xuXHR2YXIgYnl0ZTM7XG5cdHZhciBieXRlNDtcblx0dmFyIGNvZGVQb2ludDtcblxuXHRpZiAoYnl0ZUluZGV4ID4gYnl0ZUNvdW50KSB7XG5cdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgYnl0ZSBpbmRleCcpO1xuXHR9XG5cblx0aWYgKGJ5dGVJbmRleCA9PSBieXRlQ291bnQpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBSZWFkIGZpcnN0IGJ5dGVcblx0Ynl0ZTEgPSBieXRlQXJyYXlbYnl0ZUluZGV4XSAmIDB4RkY7XG5cdGJ5dGVJbmRleCsrO1xuXG5cdC8vIDEtYnl0ZSBzZXF1ZW5jZSAobm8gY29udGludWF0aW9uIGJ5dGVzKVxuXHRpZiAoKGJ5dGUxICYgMHg4MCkgPT0gMCkge1xuXHRcdHJldHVybiBieXRlMTtcblx0fVxuXG5cdC8vIDItYnl0ZSBzZXF1ZW5jZVxuXHRpZiAoKGJ5dGUxICYgMHhFMCkgPT0gMHhDMCkge1xuXHRcdGJ5dGUyID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRjb2RlUG9pbnQgPSAoKGJ5dGUxICYgMHgxRikgPDwgNikgfCBieXRlMjtcblx0XHRpZiAoY29kZVBvaW50ID49IDB4ODApIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gMy1ieXRlIHNlcXVlbmNlIChtYXkgaW5jbHVkZSB1bnBhaXJlZCBzdXJyb2dhdGVzKVxuXHRpZiAoKGJ5dGUxICYgMHhGMCkgPT0gMHhFMCkge1xuXHRcdGJ5dGUyID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRieXRlMyA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0Y29kZVBvaW50ID0gKChieXRlMSAmIDB4MEYpIDw8IDEyKSB8IChieXRlMiA8PCA2KSB8IGJ5dGUzO1xuXHRcdGlmIChjb2RlUG9pbnQgPj0gMHgwODAwKSB7XG5cdFx0XHRyZXR1cm4gY2hlY2tTY2FsYXJWYWx1ZShjb2RlUG9pbnQsIHN0cmljdCkgPyBjb2RlUG9pbnQgOiAweEZGRkQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gNC1ieXRlIHNlcXVlbmNlXG5cdGlmICgoYnl0ZTEgJiAweEY4KSA9PSAweEYwKSB7XG5cdFx0Ynl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdGJ5dGUzID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRieXRlNCA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0Y29kZVBvaW50ID0gKChieXRlMSAmIDB4MDcpIDw8IDB4MTIpIHwgKGJ5dGUyIDw8IDB4MEMpIHxcblx0XHRcdChieXRlMyA8PCAweDA2KSB8IGJ5dGU0O1xuXHRcdGlmIChjb2RlUG9pbnQgPj0gMHgwMTAwMDAgJiYgY29kZVBvaW50IDw9IDB4MTBGRkZGKSB7XG5cdFx0XHRyZXR1cm4gY29kZVBvaW50O1xuXHRcdH1cblx0fVxuXG5cdHRocm93IEVycm9yKCdJbnZhbGlkIFVURi04IGRldGVjdGVkJyk7XG59XG5cbnZhciBieXRlQXJyYXk7XG52YXIgYnl0ZUNvdW50O1xudmFyIGJ5dGVJbmRleDtcbmZ1bmN0aW9uIHV0ZjhkZWNvZGUoYnl0ZVN0cmluZywgb3B0cykge1xuXHRvcHRzID0gb3B0cyB8fCB7fTtcblx0dmFyIHN0cmljdCA9IGZhbHNlICE9PSBvcHRzLnN0cmljdDtcblxuXHRieXRlQXJyYXkgPSB1Y3MyZGVjb2RlKGJ5dGVTdHJpbmcpO1xuXHRieXRlQ291bnQgPSBieXRlQXJyYXkubGVuZ3RoO1xuXHRieXRlSW5kZXggPSAwO1xuXHR2YXIgY29kZVBvaW50cyA9IFtdO1xuXHR2YXIgdG1wO1xuXHR3aGlsZSAoKHRtcCA9IGRlY29kZVN5bWJvbChzdHJpY3QpKSAhPT0gZmFsc2UpIHtcblx0XHRjb2RlUG9pbnRzLnB1c2godG1wKTtcblx0fVxuXHRyZXR1cm4gdWNzMmVuY29kZShjb2RlUG9pbnRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdHZlcnNpb246ICcyLjEuMicsXG5cdGVuY29kZTogdXRmOGVuY29kZSxcblx0ZGVjb2RlOiB1dGY4ZGVjb2RlXG59O1xuIiwiLypcbiAqIGJhc2U2NC1hcnJheWJ1ZmZlclxuICogaHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlclxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMiBOaWtsYXMgdm9uIEhlcnR6ZW5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBjaGFycyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiO1xuXG4gIC8vIFVzZSBhIGxvb2t1cCB0YWJsZSB0byBmaW5kIHRoZSBpbmRleC5cbiAgdmFyIGxvb2t1cCA9IG5ldyBVaW50OEFycmF5KDI1Nik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICBsb29rdXBbY2hhcnMuY2hhckNvZGVBdChpKV0gPSBpO1xuICB9XG5cbiAgZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbihhcnJheWJ1ZmZlcikge1xuICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKSxcbiAgICBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9IFwiXCI7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKz0zKSB7XG4gICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07XG4gICAgICBiYXNlNjQgKz0gY2hhcnNbKChieXRlc1tpXSAmIDMpIDw8IDQpIHwgKGJ5dGVzW2kgKyAxXSA+PiA0KV07XG4gICAgICBiYXNlNjQgKz0gY2hhcnNbKChieXRlc1tpICsgMV0gJiAxNSkgPDwgMikgfCAoYnl0ZXNbaSArIDJdID4+IDYpXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107XG4gICAgfVxuXG4gICAgaWYgKChsZW4gJSAzKSA9PT0gMikge1xuICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMSkgKyBcIj1cIjtcbiAgICB9IGVsc2UgaWYgKGxlbiAlIDMgPT09IDEpIHtcbiAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgXCI9PVwiO1xuICAgIH1cblxuICAgIHJldHVybiBiYXNlNjQ7XG4gIH07XG5cbiAgZXhwb3J0cy5kZWNvZGUgPSAgZnVuY3Rpb24oYmFzZTY0KSB7XG4gICAgdmFyIGJ1ZmZlckxlbmd0aCA9IGJhc2U2NC5sZW5ndGggKiAwLjc1LFxuICAgIGxlbiA9IGJhc2U2NC5sZW5ndGgsIGksIHAgPSAwLFxuICAgIGVuY29kZWQxLCBlbmNvZGVkMiwgZW5jb2RlZDMsIGVuY29kZWQ0O1xuXG4gICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMV0gPT09IFwiPVwiKSB7XG4gICAgICBidWZmZXJMZW5ndGgtLTtcbiAgICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDJdID09PSBcIj1cIikge1xuICAgICAgICBidWZmZXJMZW5ndGgtLTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgYXJyYXlidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoYnVmZmVyTGVuZ3RoKSxcbiAgICBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrPTQpIHtcbiAgICAgIGVuY29kZWQxID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkpXTtcbiAgICAgIGVuY29kZWQyID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkrMSldO1xuICAgICAgZW5jb2RlZDMgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSsyKV07XG4gICAgICBlbmNvZGVkNCA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKzMpXTtcblxuICAgICAgYnl0ZXNbcCsrXSA9IChlbmNvZGVkMSA8PCAyKSB8IChlbmNvZGVkMiA+PiA0KTtcbiAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQyICYgMTUpIDw8IDQpIHwgKGVuY29kZWQzID4+IDIpO1xuICAgICAgYnl0ZXNbcCsrXSA9ICgoZW5jb2RlZDMgJiAzKSA8PCA2KSB8IChlbmNvZGVkNCAmIDYzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXlidWZmZXI7XG4gIH07XG59KSgpO1xuIiwiLyoqXHJcbiAqIENyZWF0ZSBhIGJsb2IgYnVpbGRlciBldmVuIHdoZW4gdmVuZG9yIHByZWZpeGVzIGV4aXN0XHJcbiAqL1xyXG5cclxudmFyIEJsb2JCdWlsZGVyID0gdHlwZW9mIEJsb2JCdWlsZGVyICE9PSAndW5kZWZpbmVkJyA/IEJsb2JCdWlsZGVyIDpcclxuICB0eXBlb2YgV2ViS2l0QmxvYkJ1aWxkZXIgIT09ICd1bmRlZmluZWQnID8gV2ViS2l0QmxvYkJ1aWxkZXIgOlxyXG4gIHR5cGVvZiBNU0Jsb2JCdWlsZGVyICE9PSAndW5kZWZpbmVkJyA/IE1TQmxvYkJ1aWxkZXIgOlxyXG4gIHR5cGVvZiBNb3pCbG9iQnVpbGRlciAhPT0gJ3VuZGVmaW5lZCcgPyBNb3pCbG9iQnVpbGRlciA6IFxyXG4gIGZhbHNlO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIEJsb2IgY29uc3RydWN0b3IgaXMgc3VwcG9ydGVkXHJcbiAqL1xyXG5cclxudmFyIGJsb2JTdXBwb3J0ZWQgPSAoZnVuY3Rpb24oKSB7XHJcbiAgdHJ5IHtcclxuICAgIHZhciBhID0gbmV3IEJsb2IoWydoaSddKTtcclxuICAgIHJldHVybiBhLnNpemUgPT09IDI7XHJcbiAgfSBjYXRjaChlKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59KSgpO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIEJsb2IgY29uc3RydWN0b3Igc3VwcG9ydHMgQXJyYXlCdWZmZXJWaWV3c1xyXG4gKiBGYWlscyBpbiBTYWZhcmkgNiwgc28gd2UgbmVlZCB0byBtYXAgdG8gQXJyYXlCdWZmZXJzIHRoZXJlLlxyXG4gKi9cclxuXHJcbnZhciBibG9iU3VwcG9ydHNBcnJheUJ1ZmZlclZpZXcgPSBibG9iU3VwcG9ydGVkICYmIChmdW5jdGlvbigpIHtcclxuICB0cnkge1xyXG4gICAgdmFyIGIgPSBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoWzEsMl0pXSk7XHJcbiAgICByZXR1cm4gYi5zaXplID09PSAyO1xyXG4gIH0gY2F0Y2goZSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufSkoKTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBCbG9iQnVpbGRlciBpcyBzdXBwb3J0ZWRcclxuICovXHJcblxyXG52YXIgYmxvYkJ1aWxkZXJTdXBwb3J0ZWQgPSBCbG9iQnVpbGRlclxyXG4gICYmIEJsb2JCdWlsZGVyLnByb3RvdHlwZS5hcHBlbmRcclxuICAmJiBCbG9iQnVpbGRlci5wcm90b3R5cGUuZ2V0QmxvYjtcclxuXHJcbi8qKlxyXG4gKiBIZWxwZXIgZnVuY3Rpb24gdGhhdCBtYXBzIEFycmF5QnVmZmVyVmlld3MgdG8gQXJyYXlCdWZmZXJzXHJcbiAqIFVzZWQgYnkgQmxvYkJ1aWxkZXIgY29uc3RydWN0b3IgYW5kIG9sZCBicm93c2VycyB0aGF0IGRpZG4ndFxyXG4gKiBzdXBwb3J0IGl0IGluIHRoZSBCbG9iIGNvbnN0cnVjdG9yLlxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG1hcEFycmF5QnVmZmVyVmlld3MoYXJ5KSB7XHJcbiAgcmV0dXJuIGFyeS5tYXAoZnVuY3Rpb24oY2h1bmspIHtcclxuICAgIGlmIChjaHVuay5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xyXG4gICAgICB2YXIgYnVmID0gY2h1bmsuYnVmZmVyO1xyXG5cclxuICAgICAgLy8gaWYgdGhpcyBpcyBhIHN1YmFycmF5LCBtYWtlIGEgY29weSBzbyB3ZSBvbmx5XHJcbiAgICAgIC8vIGluY2x1ZGUgdGhlIHN1YmFycmF5IHJlZ2lvbiBmcm9tIHRoZSB1bmRlcmx5aW5nIGJ1ZmZlclxyXG4gICAgICBpZiAoY2h1bmsuYnl0ZUxlbmd0aCAhPT0gYnVmLmJ5dGVMZW5ndGgpIHtcclxuICAgICAgICB2YXIgY29weSA9IG5ldyBVaW50OEFycmF5KGNodW5rLmJ5dGVMZW5ndGgpO1xyXG4gICAgICAgIGNvcHkuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZiwgY2h1bmsuYnl0ZU9mZnNldCwgY2h1bmsuYnl0ZUxlbmd0aCkpO1xyXG4gICAgICAgIGJ1ZiA9IGNvcHkuYnVmZmVyO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gYnVmO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjaHVuaztcclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gQmxvYkJ1aWxkZXJDb25zdHJ1Y3RvcihhcnksIG9wdGlvbnMpIHtcclxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgdmFyIGJiID0gbmV3IEJsb2JCdWlsZGVyKCk7XHJcbiAgbWFwQXJyYXlCdWZmZXJWaWV3cyhhcnkpLmZvckVhY2goZnVuY3Rpb24ocGFydCkge1xyXG4gICAgYmIuYXBwZW5kKHBhcnQpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gKG9wdGlvbnMudHlwZSkgPyBiYi5nZXRCbG9iKG9wdGlvbnMudHlwZSkgOiBiYi5nZXRCbG9iKCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBCbG9iQ29uc3RydWN0b3IoYXJ5LCBvcHRpb25zKSB7XHJcbiAgcmV0dXJuIG5ldyBCbG9iKG1hcEFycmF5QnVmZmVyVmlld3MoYXJ5KSwgb3B0aW9ucyB8fCB7fSk7XHJcbn07XHJcblxyXG5pZiAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgQmxvYkJ1aWxkZXJDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBCbG9iLnByb3RvdHlwZTtcclxuICBCbG9iQ29uc3RydWN0b3IucHJvdG90eXBlID0gQmxvYi5wcm90b3R5cGU7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG4gIGlmIChibG9iU3VwcG9ydGVkKSB7XHJcbiAgICByZXR1cm4gYmxvYlN1cHBvcnRzQXJyYXlCdWZmZXJWaWV3ID8gQmxvYiA6IEJsb2JDb25zdHJ1Y3RvcjtcclxuICB9IGVsc2UgaWYgKGJsb2JCdWlsZGVyU3VwcG9ydGVkKSB7XHJcbiAgICByZXR1cm4gQmxvYkJ1aWxkZXJDb25zdHJ1Y3RvcjtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICB9XHJcbn0pKCk7XHJcbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIEFjdGl2ZSBgZGVidWdgIGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0cy5pbnN0YW5jZXMgPSBbXTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgdmFyIHByZXZUaW1lO1xuXG4gIGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgIC8vIGRpc2FibGVkP1xuICAgIGlmICghZGVidWcuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgdmFyIHNlbGYgPSBkZWJ1ZztcblxuICAgIC8vIHNldCBgZGlmZmAgdGltZXN0YW1wXG4gICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgcHJldlRpbWUgPSBjdXJyO1xuXG4gICAgLy8gdHVybiB0aGUgYGFyZ3VtZW50c2AgaW50byBhIHByb3BlciBBcnJheVxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBhcmdzWzBdID0gZXhwb3J0cy5jb2VyY2UoYXJnc1swXSk7XG5cbiAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBhcmdzWzBdKSB7XG4gICAgICAvLyBhbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuICAgICAgYXJncy51bnNoaWZ0KCclTycpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgZnVuY3Rpb24obWF0Y2gsIGZvcm1hdCkge1xuICAgICAgLy8gaWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICBpbmRleCsrO1xuICAgICAgdmFyIGZvcm1hdHRlciA9IGV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cbiAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGluZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICAvLyBhcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuICAgIGV4cG9ydHMuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG4gICAgdmFyIGxvZ0ZuID0gZGVidWcubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgbG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cblxuICBkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gIGRlYnVnLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQobmFtZXNwYWNlKTtcbiAgZGVidWcudXNlQ29sb3JzID0gZXhwb3J0cy51c2VDb2xvcnMoKTtcbiAgZGVidWcuY29sb3IgPSBzZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuICBkZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICBleHBvcnRzLmluc3RhbmNlcy5wdXNoKGRlYnVnKTtcblxuICByZXR1cm4gZGVidWc7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICB2YXIgaW5kZXggPSBleHBvcnRzLmluc3RhbmNlcy5pbmRleE9mKHRoaXMpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgZXhwb3J0cy5pbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG4gKiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG4gIGV4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTtcblxuICBleHBvcnRzLm5hbWVzID0gW107XG4gIGV4cG9ydHMuc2tpcHMgPSBbXTtcblxuICB2YXIgaTtcbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IGV4cG9ydHMuaW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGluc3RhbmNlID0gZXhwb3J0cy5pbnN0YW5jZXNbaV07XG4gICAgaW5zdGFuY2UuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChpbnN0YW5jZS5uYW1lc3BhY2UpO1xuICB9XG59XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xuICBleHBvcnRzLmVuYWJsZSgnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgaWYgKG5hbWVbbmFtZS5sZW5ndGggLSAxXSA9PT0gJyonKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcbiAgcmV0dXJuIHZhbDtcbn1cbiIsIi8qKlxuICogTW9kdWxlIHJlcXVpcmVtZW50cy5cbiAqL1xuXG52YXIgUG9sbGluZyA9IHJlcXVpcmUoJy4vcG9sbGluZycpO1xudmFyIGluaGVyaXQgPSByZXF1aXJlKCdjb21wb25lbnQtaW5oZXJpdCcpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gSlNPTlBQb2xsaW5nO1xuXG4vKipcbiAqIENhY2hlZCByZWd1bGFyIGV4cHJlc3Npb25zLlxuICovXG5cbnZhciByTmV3bGluZSA9IC9cXG4vZztcbnZhciByRXNjYXBlZE5ld2xpbmUgPSAvXFxcXG4vZztcblxuLyoqXG4gKiBHbG9iYWwgSlNPTlAgY2FsbGJhY2tzLlxuICovXG5cbnZhciBjYWxsYmFja3M7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBlbXB0eSAoKSB7IH1cblxuLyoqXG4gKiBVbnRpbCBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1nbG9iYWwgaXMgc2hpcHBlZC5cbiAqL1xuZnVuY3Rpb24gZ2xvYiAoKSB7XG4gIHJldHVybiB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmXG4gICAgICA6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93XG4gICAgICA6IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDoge307XG59XG5cbi8qKlxuICogSlNPTlAgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cy5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gSlNPTlBQb2xsaW5nIChvcHRzKSB7XG4gIFBvbGxpbmcuY2FsbCh0aGlzLCBvcHRzKTtcblxuICB0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcblxuICAvLyBkZWZpbmUgZ2xvYmFsIGNhbGxiYWNrcyBhcnJheSBpZiBub3QgcHJlc2VudFxuICAvLyB3ZSBkbyB0aGlzIGhlcmUgKGxhemlseSkgdG8gYXZvaWQgdW5uZWVkZWQgZ2xvYmFsIHBvbGx1dGlvblxuICBpZiAoIWNhbGxiYWNrcykge1xuICAgIC8vIHdlIG5lZWQgdG8gY29uc2lkZXIgbXVsdGlwbGUgZW5naW5lcyBpbiB0aGUgc2FtZSBwYWdlXG4gICAgdmFyIGdsb2JhbCA9IGdsb2IoKTtcbiAgICBjYWxsYmFja3MgPSBnbG9iYWwuX19fZWlvID0gKGdsb2JhbC5fX19laW8gfHwgW10pO1xuICB9XG5cbiAgLy8gY2FsbGJhY2sgaWRlbnRpZmllclxuICB0aGlzLmluZGV4ID0gY2FsbGJhY2tzLmxlbmd0aDtcblxuICAvLyBhZGQgY2FsbGJhY2sgdG8ganNvbnAgZ2xvYmFsXG4gIHZhciBzZWxmID0gdGhpcztcbiAgY2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gKG1zZykge1xuICAgIHNlbGYub25EYXRhKG1zZyk7XG4gIH0pO1xuXG4gIC8vIGFwcGVuZCB0byBxdWVyeSBzdHJpbmdcbiAgdGhpcy5xdWVyeS5qID0gdGhpcy5pbmRleDtcblxuICAvLyBwcmV2ZW50IHNwdXJpb3VzIGVycm9ycyBmcm9tIGJlaW5nIGVtaXR0ZWQgd2hlbiB0aGUgd2luZG93IGlzIHVubG9hZGVkXG4gIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLnNjcmlwdCkgc2VsZi5zY3JpcHQub25lcnJvciA9IGVtcHR5O1xuICAgIH0sIGZhbHNlKTtcbiAgfVxufVxuXG4vKipcbiAqIEluaGVyaXRzIGZyb20gUG9sbGluZy5cbiAqL1xuXG5pbmhlcml0KEpTT05QUG9sbGluZywgUG9sbGluZyk7XG5cbi8qXG4gKiBKU09OUCBvbmx5IHN1cHBvcnRzIGJpbmFyeSBhcyBiYXNlNjQgZW5jb2RlZCBzdHJpbmdzXG4gKi9cblxuSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuXG4vKipcbiAqIENsb3NlcyB0aGUgc29ja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkpTT05QUG9sbGluZy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc2NyaXB0KSB7XG4gICAgdGhpcy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdCk7XG4gICAgdGhpcy5zY3JpcHQgPSBudWxsO1xuICB9XG5cbiAgaWYgKHRoaXMuZm9ybSkge1xuICAgIHRoaXMuZm9ybS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZm9ybSk7XG4gICAgdGhpcy5mb3JtID0gbnVsbDtcbiAgICB0aGlzLmlmcmFtZSA9IG51bGw7XG4gIH1cblxuICBQb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlLmNhbGwodGhpcyk7XG59O1xuXG4vKipcbiAqIFN0YXJ0cyBhIHBvbGwgY3ljbGUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb1BvbGwgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gIGlmICh0aGlzLnNjcmlwdCkge1xuICAgIHRoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpO1xuICAgIHRoaXMuc2NyaXB0ID0gbnVsbDtcbiAgfVxuXG4gIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gIHNjcmlwdC5zcmMgPSB0aGlzLnVyaSgpO1xuICBzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgc2VsZi5vbkVycm9yKCdqc29ucCBwb2xsIGVycm9yJywgZSk7XG4gIH07XG5cbiAgdmFyIGluc2VydEF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICBpZiAoaW5zZXJ0QXQpIHtcbiAgICBpbnNlcnRBdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzY3JpcHQsIGluc2VydEF0KTtcbiAgfSBlbHNlIHtcbiAgICAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICB9XG4gIHRoaXMuc2NyaXB0ID0gc2NyaXB0O1xuXG4gIHZhciBpc1VBZ2Vja28gPSAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG5hdmlnYXRvciAmJiAvZ2Vja28vaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gIGlmIChpc1VBZ2Vja28pIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICB9LCAxMDApO1xuICB9XG59O1xuXG4vKipcbiAqIFdyaXRlcyB3aXRoIGEgaGlkZGVuIGlmcmFtZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YSB0byBzZW5kXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsZWQgdXBvbiBmbHVzaC5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkpTT05QUG9sbGluZy5wcm90b3R5cGUuZG9Xcml0ZSA9IGZ1bmN0aW9uIChkYXRhLCBmbikge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICB2YXIgYXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7XG4gICAgdmFyIGlkID0gdGhpcy5pZnJhbWVJZCA9ICdlaW9faWZyYW1lXycgKyB0aGlzLmluZGV4O1xuICAgIHZhciBpZnJhbWU7XG5cbiAgICBmb3JtLmNsYXNzTmFtZSA9ICdzb2NrZXRpbyc7XG4gICAgZm9ybS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgZm9ybS5zdHlsZS50b3AgPSAnLTEwMDBweCc7XG4gICAgZm9ybS5zdHlsZS5sZWZ0ID0gJy0xMDAwcHgnO1xuICAgIGZvcm0udGFyZ2V0ID0gaWQ7XG4gICAgZm9ybS5tZXRob2QgPSAnUE9TVCc7XG4gICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjY2VwdC1jaGFyc2V0JywgJ3V0Zi04Jyk7XG4gICAgYXJlYS5uYW1lID0gJ2QnO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQoYXJlYSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgfVxuXG4gIHRoaXMuZm9ybS5hY3Rpb24gPSB0aGlzLnVyaSgpO1xuXG4gIGZ1bmN0aW9uIGNvbXBsZXRlICgpIHtcbiAgICBpbml0SWZyYW1lKCk7XG4gICAgZm4oKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRJZnJhbWUgKCkge1xuICAgIGlmIChzZWxmLmlmcmFtZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2VsZi5mb3JtLnJlbW92ZUNoaWxkKHNlbGYuaWZyYW1lKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgc2VsZi5vbkVycm9yKCdqc29ucCBwb2xsaW5nIGlmcmFtZSByZW1vdmFsIGVycm9yJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIC8vIGllNiBkeW5hbWljIGlmcmFtZXMgd2l0aCB0YXJnZXQ9XCJcIiBzdXBwb3J0ICh0aGFua3MgQ2hyaXMgTGFtYmFjaGVyKVxuICAgICAgdmFyIGh0bWwgPSAnPGlmcmFtZSBzcmM9XCJqYXZhc2NyaXB0OjBcIiBuYW1lPVwiJyArIHNlbGYuaWZyYW1lSWQgKyAnXCI+JztcbiAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaHRtbCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICBpZnJhbWUubmFtZSA9IHNlbGYuaWZyYW1lSWQ7XG4gICAgICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6MCc7XG4gICAgfVxuXG4gICAgaWZyYW1lLmlkID0gc2VsZi5pZnJhbWVJZDtcblxuICAgIHNlbGYuZm9ybS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgIHNlbGYuaWZyYW1lID0gaWZyYW1lO1xuICB9XG5cbiAgaW5pdElmcmFtZSgpO1xuXG4gIC8vIGVzY2FwZSBcXG4gdG8gcHJldmVudCBpdCBmcm9tIGJlaW5nIGNvbnZlcnRlZCBpbnRvIFxcclxcbiBieSBzb21lIFVBc1xuICAvLyBkb3VibGUgZXNjYXBpbmcgaXMgcmVxdWlyZWQgZm9yIGVzY2FwZWQgbmV3IGxpbmVzIGJlY2F1c2UgdW5lc2NhcGluZyBvZiBuZXcgbGluZXMgY2FuIGJlIGRvbmUgc2FmZWx5IG9uIHNlcnZlci1zaWRlXG4gIGRhdGEgPSBkYXRhLnJlcGxhY2UockVzY2FwZWROZXdsaW5lLCAnXFxcXFxcbicpO1xuICB0aGlzLmFyZWEudmFsdWUgPSBkYXRhLnJlcGxhY2Uock5ld2xpbmUsICdcXFxcbicpO1xuXG4gIHRyeSB7XG4gICAgdGhpcy5mb3JtLnN1Ym1pdCgpO1xuICB9IGNhdGNoIChlKSB7fVxuXG4gIGlmICh0aGlzLmlmcmFtZS5hdHRhY2hFdmVudCkge1xuICAgIHRoaXMuaWZyYW1lLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLmlmcmFtZS5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmlmcmFtZS5vbmxvYWQgPSBjb21wbGV0ZTtcbiAgfVxufTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgVHJhbnNwb3J0ID0gcmVxdWlyZSgnLi4vdHJhbnNwb3J0Jyk7XG52YXIgcGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xudmFyIHBhcnNlcXMgPSByZXF1aXJlKCdwYXJzZXFzJyk7XG52YXIgaW5oZXJpdCA9IHJlcXVpcmUoJ2NvbXBvbmVudC1pbmhlcml0Jyk7XG52YXIgeWVhc3QgPSByZXF1aXJlKCd5ZWFzdCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDp3ZWJzb2NrZXQnKTtcblxudmFyIEJyb3dzZXJXZWJTb2NrZXQsIE5vZGVXZWJTb2NrZXQ7XG5cbmlmICh0eXBlb2YgV2ViU29ja2V0ICE9PSAndW5kZWZpbmVkJykge1xuICBCcm93c2VyV2ViU29ja2V0ID0gV2ViU29ja2V0O1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgQnJvd3NlcldlYlNvY2tldCA9IHNlbGYuV2ViU29ja2V0IHx8IHNlbGYuTW96V2ViU29ja2V0O1xufSBlbHNlIHtcbiAgdHJ5IHtcbiAgICBOb2RlV2ViU29ja2V0ID0gcmVxdWlyZSgnd3MnKTtcbiAgfSBjYXRjaCAoZSkgeyB9XG59XG5cbi8qKlxuICogR2V0IGVpdGhlciB0aGUgYFdlYlNvY2tldGAgb3IgYE1veldlYlNvY2tldGAgZ2xvYmFsc1xuICogaW4gdGhlIGJyb3dzZXIgb3IgdHJ5IHRvIHJlc29sdmUgV2ViU29ja2V0LWNvbXBhdGlibGVcbiAqIGludGVyZmFjZSBleHBvc2VkIGJ5IGB3c2AgZm9yIE5vZGUtbGlrZSBlbnZpcm9ubWVudC5cbiAqL1xuXG52YXIgV2ViU29ja2V0SW1wbCA9IEJyb3dzZXJXZWJTb2NrZXQgfHwgTm9kZVdlYlNvY2tldDtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdTO1xuXG4vKipcbiAqIFdlYlNvY2tldCB0cmFuc3BvcnQgY29uc3RydWN0b3IuXG4gKlxuICogQGFwaSB7T2JqZWN0fSBjb25uZWN0aW9uIG9wdGlvbnNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gV1MgKG9wdHMpIHtcbiAgdmFyIGZvcmNlQmFzZTY0ID0gKG9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NCk7XG4gIGlmIChmb3JjZUJhc2U2NCkge1xuICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgfVxuICB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlID0gb3B0cy5wZXJNZXNzYWdlRGVmbGF0ZTtcbiAgdGhpcy51c2luZ0Jyb3dzZXJXZWJTb2NrZXQgPSBCcm93c2VyV2ViU29ja2V0ICYmICFvcHRzLmZvcmNlTm9kZTtcbiAgdGhpcy5wcm90b2NvbHMgPSBvcHRzLnByb3RvY29scztcbiAgaWYgKCF0aGlzLnVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgIFdlYlNvY2tldEltcGwgPSBOb2RlV2ViU29ja2V0O1xuICB9XG4gIFRyYW5zcG9ydC5jYWxsKHRoaXMsIG9wdHMpO1xufVxuXG4vKipcbiAqIEluaGVyaXRzIGZyb20gVHJhbnNwb3J0LlxuICovXG5cbmluaGVyaXQoV1MsIFRyYW5zcG9ydCk7XG5cbi8qKlxuICogVHJhbnNwb3J0IG5hbWUuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5XUy5wcm90b3R5cGUubmFtZSA9ICd3ZWJzb2NrZXQnO1xuXG4vKlxuICogV2ViU29ja2V0cyBzdXBwb3J0IGJpbmFyeVxuICovXG5cbldTLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IHRydWU7XG5cbi8qKlxuICogT3BlbnMgc29ja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS5kb09wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICghdGhpcy5jaGVjaygpKSB7XG4gICAgLy8gbGV0IHByb2JlIHRpbWVvdXRcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdXJpID0gdGhpcy51cmkoKTtcbiAgdmFyIHByb3RvY29scyA9IHRoaXMucHJvdG9jb2xzO1xuICB2YXIgb3B0cyA9IHtcbiAgICBhZ2VudDogdGhpcy5hZ2VudCxcbiAgICBwZXJNZXNzYWdlRGVmbGF0ZTogdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZVxuICB9O1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICBvcHRzLnBmeCA9IHRoaXMucGZ4O1xuICBvcHRzLmtleSA9IHRoaXMua2V5O1xuICBvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7XG4gIG9wdHMuY2VydCA9IHRoaXMuY2VydDtcbiAgb3B0cy5jYSA9IHRoaXMuY2E7XG4gIG9wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztcbiAgb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPSB0aGlzLnJlamVjdFVuYXV0aG9yaXplZDtcbiAgaWYgKHRoaXMuZXh0cmFIZWFkZXJzKSB7XG4gICAgb3B0cy5oZWFkZXJzID0gdGhpcy5leHRyYUhlYWRlcnM7XG4gIH1cbiAgaWYgKHRoaXMubG9jYWxBZGRyZXNzKSB7XG4gICAgb3B0cy5sb2NhbEFkZHJlc3MgPSB0aGlzLmxvY2FsQWRkcmVzcztcbiAgfVxuXG4gIHRyeSB7XG4gICAgdGhpcy53cyA9XG4gICAgICB0aGlzLnVzaW5nQnJvd3NlcldlYlNvY2tldCAmJiAhdGhpcy5pc1JlYWN0TmF0aXZlXG4gICAgICAgID8gcHJvdG9jb2xzXG4gICAgICAgICAgPyBuZXcgV2ViU29ja2V0SW1wbCh1cmksIHByb3RvY29scylcbiAgICAgICAgICA6IG5ldyBXZWJTb2NrZXRJbXBsKHVyaSlcbiAgICAgICAgOiBuZXcgV2ViU29ja2V0SW1wbCh1cmksIHByb3RvY29scywgb3B0cyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxuXG4gIGlmICh0aGlzLndzLmJpbmFyeVR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLndzLnN1cHBvcnRzICYmIHRoaXMud3Muc3VwcG9ydHMuYmluYXJ5KSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IHRydWU7XG4gICAgdGhpcy53cy5iaW5hcnlUeXBlID0gJ25vZGVidWZmZXInO1xuICB9IGVsc2Uge1xuICAgIHRoaXMud3MuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gIH1cblxuICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG59O1xuXG4vKipcbiAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBzb2NrZXRcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICB0aGlzLndzLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9uT3BlbigpO1xuICB9O1xuICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5vbkNsb3NlKCk7XG4gIH07XG4gIHRoaXMud3Mub25tZXNzYWdlID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgc2VsZi5vbkRhdGEoZXYuZGF0YSk7XG4gIH07XG4gIHRoaXMud3Mub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgc2VsZi5vbkVycm9yKCd3ZWJzb2NrZXQgZXJyb3InLCBlKTtcbiAgfTtcbn07XG5cbi8qKlxuICogV3JpdGVzIGRhdGEgdG8gc29ja2V0LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IG9mIHBhY2tldHMuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAocGFja2V0cykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcblxuICAvLyBlbmNvZGVQYWNrZXQgZWZmaWNpZW50IGFzIGl0IHVzZXMgV1MgZnJhbWluZ1xuICAvLyBubyBuZWVkIGZvciBlbmNvZGVQYXlsb2FkXG4gIHZhciB0b3RhbCA9IHBhY2tldHMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IHRvdGFsOyBpIDwgbDsgaSsrKSB7XG4gICAgKGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICAgIHBhcnNlci5lbmNvZGVQYWNrZXQocGFja2V0LCBzZWxmLnN1cHBvcnRzQmluYXJ5LCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAoIXNlbGYudXNpbmdCcm93c2VyV2ViU29ja2V0KSB7XG4gICAgICAgICAgLy8gYWx3YXlzIGNyZWF0ZSBhIG5ldyBvYmplY3QgKEdILTQzNylcbiAgICAgICAgICB2YXIgb3B0cyA9IHt9O1xuICAgICAgICAgIGlmIChwYWNrZXQub3B0aW9ucykge1xuICAgICAgICAgICAgb3B0cy5jb21wcmVzcyA9IHBhY2tldC5vcHRpb25zLmNvbXByZXNzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWxmLnBlck1lc3NhZ2VEZWZsYXRlKSB7XG4gICAgICAgICAgICB2YXIgbGVuID0gJ3N0cmluZycgPT09IHR5cGVvZiBkYXRhID8gQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSkgOiBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChsZW4gPCBzZWxmLnBlck1lc3NhZ2VEZWZsYXRlLnRocmVzaG9sZCkge1xuICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU29tZXRpbWVzIHRoZSB3ZWJzb2NrZXQgaGFzIGFscmVhZHkgYmVlbiBjbG9zZWQgYnV0IHRoZSBicm93c2VyIGRpZG4ndFxuICAgICAgICAvLyBoYXZlIGEgY2hhbmNlIG9mIGluZm9ybWluZyB1cyBhYm91dCBpdCB5ZXQsIGluIHRoYXQgY2FzZSBzZW5kIHdpbGxcbiAgICAgICAgLy8gdGhyb3cgYW4gZXJyb3JcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAoc2VsZi51c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgIC8vIFR5cGVFcnJvciBpcyB0aHJvd24gd2hlbiBwYXNzaW5nIHRoZSBzZWNvbmQgYXJndW1lbnQgb24gU2FmYXJpXG4gICAgICAgICAgICBzZWxmLndzLnNlbmQoZGF0YSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYud3Muc2VuZChkYXRhLCBvcHRzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBkZWJ1Zygnd2Vic29ja2V0IGNsb3NlZCBiZWZvcmUgb25jbG9zZSBldmVudCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLS10b3RhbCB8fCBkb25lKCk7XG4gICAgICB9KTtcbiAgICB9KShwYWNrZXRzW2ldKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvbmUgKCkge1xuICAgIHNlbGYuZW1pdCgnZmx1c2gnKTtcblxuICAgIC8vIGZha2UgZHJhaW5cbiAgICAvLyBkZWZlciB0byBuZXh0IHRpY2sgdG8gYWxsb3cgU29ja2V0IHRvIGNsZWFyIHdyaXRlQnVmZmVyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIHNlbGYuZW1pdCgnZHJhaW4nKTtcbiAgICB9LCAwKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBjbG9zZVxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24gKCkge1xuICBUcmFuc3BvcnQucHJvdG90eXBlLm9uQ2xvc2UuY2FsbCh0aGlzKTtcbn07XG5cbi8qKlxuICogQ2xvc2VzIHNvY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5XUy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiB0aGlzLndzICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS51cmkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gIHZhciBzY2hlbWEgPSB0aGlzLnNlY3VyZSA/ICd3c3MnIDogJ3dzJztcbiAgdmFyIHBvcnQgPSAnJztcblxuICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICBpZiAodGhpcy5wb3J0ICYmICgoJ3dzcycgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICgnd3MnID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMucG9ydCkgIT09IDgwKSkpIHtcbiAgICBwb3J0ID0gJzonICsgdGhpcy5wb3J0O1xuICB9XG5cbiAgLy8gYXBwZW5kIHRpbWVzdGFtcCB0byBVUklcbiAgaWYgKHRoaXMudGltZXN0YW1wUmVxdWVzdHMpIHtcbiAgICBxdWVyeVt0aGlzLnRpbWVzdGFtcFBhcmFtXSA9IHllYXN0KCk7XG4gIH1cblxuICAvLyBjb21tdW5pY2F0ZSBiaW5hcnkgc3VwcG9ydCBjYXBhYmlsaXRpZXNcbiAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgcXVlcnkuYjY0ID0gMTtcbiAgfVxuXG4gIHF1ZXJ5ID0gcGFyc2Vxcy5lbmNvZGUocXVlcnkpO1xuXG4gIC8vIHByZXBlbmQgPyB0byBxdWVyeVxuICBpZiAocXVlcnkubGVuZ3RoKSB7XG4gICAgcXVlcnkgPSAnPycgKyBxdWVyeTtcbiAgfVxuXG4gIHZhciBpcHY2ID0gdGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgIT09IC0xO1xuICByZXR1cm4gc2NoZW1hICsgJzovLycgKyAoaXB2NiA/ICdbJyArIHRoaXMuaG9zdG5hbWUgKyAnXScgOiB0aGlzLmhvc3RuYW1lKSArIHBvcnQgKyB0aGlzLnBhdGggKyBxdWVyeTtcbn07XG5cbi8qKlxuICogRmVhdHVyZSBkZXRlY3Rpb24gZm9yIFdlYlNvY2tldC5cbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufSB3aGV0aGVyIHRoaXMgdHJhbnNwb3J0IGlzIGF2YWlsYWJsZS5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuV1MucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gISFXZWJTb2NrZXRJbXBsICYmICEoJ19faW5pdGlhbGl6ZScgaW4gV2ViU29ja2V0SW1wbCAmJiB0aGlzLm5hbWUgPT09IFdTLnByb3RvdHlwZS5uYW1lKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHRvQXJyYXlcblxuZnVuY3Rpb24gdG9BcnJheShsaXN0LCBpbmRleCkge1xuICAgIHZhciBhcnJheSA9IFtdXG5cbiAgICBpbmRleCA9IGluZGV4IHx8IDBcblxuICAgIGZvciAodmFyIGkgPSBpbmRleCB8fCAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBhcnJheVtpIC0gaW5kZXhdID0gbGlzdFtpXVxuICAgIH1cblxuICAgIHJldHVybiBhcnJheVxufVxuIiwiXG4vKipcbiAqIEV4cG9zZSBgQmFja29mZmAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrb2ZmO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYmFja29mZiB0aW1lciB3aXRoIGBvcHRzYC5cbiAqXG4gKiAtIGBtaW5gIGluaXRpYWwgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgWzEwMF1cbiAqIC0gYG1heGAgbWF4IHRpbWVvdXQgWzEwMDAwXVxuICogLSBgaml0dGVyYCBbMF1cbiAqIC0gYGZhY3RvcmAgWzJdXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gQmFja29mZihvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuICB0aGlzLm1zID0gb3B0cy5taW4gfHwgMTAwO1xuICB0aGlzLm1heCA9IG9wdHMubWF4IHx8IDEwMDAwO1xuICB0aGlzLmZhY3RvciA9IG9wdHMuZmFjdG9yIHx8IDI7XG4gIHRoaXMuaml0dGVyID0gb3B0cy5qaXR0ZXIgPiAwICYmIG9wdHMuaml0dGVyIDw9IDEgPyBvcHRzLmppdHRlciA6IDA7XG4gIHRoaXMuYXR0ZW1wdHMgPSAwO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgYmFja29mZiBkdXJhdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLmR1cmF0aW9uID0gZnVuY3Rpb24oKXtcbiAgdmFyIG1zID0gdGhpcy5tcyAqIE1hdGgucG93KHRoaXMuZmFjdG9yLCB0aGlzLmF0dGVtcHRzKyspO1xuICBpZiAodGhpcy5qaXR0ZXIpIHtcbiAgICB2YXIgcmFuZCA9ICBNYXRoLnJhbmRvbSgpO1xuICAgIHZhciBkZXZpYXRpb24gPSBNYXRoLmZsb29yKHJhbmQgKiB0aGlzLmppdHRlciAqIG1zKTtcbiAgICBtcyA9IChNYXRoLmZsb29yKHJhbmQgKiAxMCkgJiAxKSA9PSAwICA/IG1zIC0gZGV2aWF0aW9uIDogbXMgKyBkZXZpYXRpb247XG4gIH1cbiAgcmV0dXJuIE1hdGgubWluKG1zLCB0aGlzLm1heCkgfCAwO1xufTtcblxuLyoqXG4gKiBSZXNldCB0aGUgbnVtYmVyIG9mIGF0dGVtcHRzLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpe1xuICB0aGlzLmF0dGVtcHRzID0gMDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtaW5pbXVtIGR1cmF0aW9uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRNaW4gPSBmdW5jdGlvbihtaW4pe1xuICB0aGlzLm1zID0gbWluO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG1heGltdW0gZHVyYXRpb25cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnNldE1heCA9IGZ1bmN0aW9uKG1heCl7XG4gIHRoaXMubWF4ID0gbWF4O1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGppdHRlclxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuc2V0Sml0dGVyID0gZnVuY3Rpb24oaml0dGVyKXtcbiAgdGhpcy5qaXR0ZXIgPSBqaXR0ZXI7XG59O1xuXG4iXSwic291cmNlUm9vdCI6IiJ9
