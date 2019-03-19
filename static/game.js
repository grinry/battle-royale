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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2xpYi9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFyc2Vxcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWluaGVyaXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbGliL3htbGh0dHByZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3BhcnNldXJpL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2lzLWJ1ZmZlci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2xpYi9tYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3BvbGxpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2hhcy1iaW5hcnkyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy95ZWFzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW5kZXhvZi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvc29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2xpYi9vbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29tcG9uZW50LWJpbmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvbGliL3VybC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2RlYnVnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2JpbmFyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvc29ja2V0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9oYXMtY29ycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9saWIva2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaGFzLWJpbmFyeTIvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FycmF5YnVmZmVyLnNsaWNlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZnRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9saWIvdXRmOC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFzZTY0LWFycmF5YnVmZmVyL2xpYi9iYXNlNjQtYXJyYXlidWZmZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Jsb2IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9kZWJ1Zy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9saWIvdHJhbnNwb3J0cy9wb2xsaW5nLWpzb25wLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2xpYi90cmFuc3BvcnRzL3dlYnNvY2tldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdG8tYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JhY2tvMi9pbmRleC5qcyJdLCJuYW1lcyI6WyJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwibW9kdWxlcyIsImNhbGwiLCJtIiwiYyIsImQiLCJuYW1lIiwiZ2V0dGVyIiwibyIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImdldCIsInIiLCJTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInZhbHVlIiwidCIsIm1vZGUiLCJfX2VzTW9kdWxlIiwibnMiLCJjcmVhdGUiLCJrZXkiLCJiaW5kIiwibiIsIm9iamVjdCIsInByb3BlcnR5IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJwIiwicyIsIkVtaXR0ZXIiLCJvYmoiLCJtaXhpbiIsIm9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwiZm4iLCJ0aGlzIiwiX2NhbGxiYWNrcyIsInB1c2giLCJvbmNlIiwib2ZmIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJyZW1vdmVMaXN0ZW5lciIsInJlbW92ZUFsbExpc3RlbmVycyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJsZW5ndGgiLCJjYiIsImNhbGxiYWNrcyIsInNwbGljZSIsImVtaXQiLCJhcmdzIiwic2xpY2UiLCJsZW4iLCJsaXN0ZW5lcnMiLCJoYXNMaXN0ZW5lcnMiLCJiYXNlNjRlbmNvZGVyIiwia2V5cyIsImhhc0JpbmFyeSIsInNsaWNlQnVmZmVyIiwiYWZ0ZXIiLCJ1dGY4IiwiQXJyYXlCdWZmZXIiLCJpc0FuZHJvaWQiLCJuYXZpZ2F0b3IiLCJ0ZXN0IiwidXNlckFnZW50IiwiaXNQaGFudG9tSlMiLCJkb250U2VuZEJsb2JzIiwicHJvdG9jb2wiLCJwYWNrZXRzIiwib3BlbiIsImNsb3NlIiwicGluZyIsInBvbmciLCJtZXNzYWdlIiwidXBncmFkZSIsIm5vb3AiLCJwYWNrZXRzbGlzdCIsImVyciIsInR5cGUiLCJkYXRhIiwiQmxvYiIsIm1hcCIsImFyeSIsImVhY2giLCJkb25lIiwicmVzdWx0IiwiQXJyYXkiLCJuZXh0IiwiZWFjaFdpdGhJbmRleCIsImVsIiwiZXJyb3IiLCJtc2ciLCJlbmNvZGVQYWNrZXQiLCJwYWNrZXQiLCJzdXBwb3J0c0JpbmFyeSIsInV0ZjhlbmNvZGUiLCJjYWxsYmFjayIsInVuZGVmaW5lZCIsImJ1ZmZlciIsImVuY29kZUJhc2U2NFBhY2tldCIsImNvbnRlbnRBcnJheSIsIlVpbnQ4QXJyYXkiLCJyZXN1bHRCdWZmZXIiLCJieXRlTGVuZ3RoIiwiZW5jb2RlQXJyYXlCdWZmZXIiLCJmciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImVuY29kZUJsb2JBc0FycmF5QnVmZmVyIiwiYmxvYiIsImVuY29kZUJsb2IiLCJiYXNlNjQiLCJlbmNvZGVCYXNlNjRPYmplY3QiLCJlbmNvZGVkIiwiZW5jb2RlIiwiU3RyaW5nIiwic3RyaWN0IiwiYjY0ZGF0YSIsImI2NCIsInNwbGl0IiwicmVhZEFzRGF0YVVSTCIsImZyb21DaGFyQ29kZSIsImUiLCJ0eXBlZCIsImJhc2ljIiwiYnRvYSIsImRlY29kZVBhY2tldCIsImJpbmFyeVR5cGUiLCJ1dGY4ZGVjb2RlIiwiY2hhckF0IiwiZGVjb2RlQmFzZTY0UGFja2V0Iiwic3Vic3RyIiwiZGVjb2RlIiwidHJ5RGVjb2RlIiwiTnVtYmVyIiwic3Vic3RyaW5nIiwicmVzdCIsImVuY29kZVBheWxvYWQiLCJpc0JpbmFyeSIsImVuY29kZVBheWxvYWRBc0Jsb2IiLCJlbmNvZGVQYXlsb2FkQXNBcnJheUJ1ZmZlciIsImRvbmVDYWxsYmFjayIsInNldExlbmd0aEhlYWRlciIsInJlc3VsdHMiLCJqb2luIiwiZGVjb2RlUGF5bG9hZCIsImRlY29kZVBheWxvYWRBc0JpbmFyeSIsImNociIsImVuY29kZWRQYWNrZXRzIiwidG90YWxMZW5ndGgiLCJyZWR1Y2UiLCJhY2MiLCJ0b1N0cmluZyIsInJlc3VsdEFycmF5IiwiYnVmZmVySW5kZXgiLCJmb3JFYWNoIiwiaXNTdHJpbmciLCJhYiIsInZpZXciLCJjaGFyQ29kZUF0IiwibGVuU3RyIiwicGFyc2VJbnQiLCJiaW5hcnlJZGVudGlmaWVyIiwic2l6ZSIsImxlbmd0aEFyeSIsImJ1ZmZlclRhaWwiLCJidWZmZXJzIiwidGFpbEFycmF5IiwibXNnTGVuZ3RoIiwidG90YWwiLCJwcm9jZXNzIiwibG9hZCIsInN0b3JhZ2UiLCJkZWJ1ZyIsImVudiIsIkRFQlVHIiwibG9nIiwiY29uc29sZSIsIkZ1bmN0aW9uIiwiZm9ybWF0QXJncyIsInVzZUNvbG9ycyIsIm5hbWVzcGFjZSIsImh1bWFuaXplIiwiZGlmZiIsImNvbG9yIiwiaW5kZXgiLCJsYXN0QyIsInJlcGxhY2UiLCJtYXRjaCIsInNhdmUiLCJuYW1lc3BhY2VzIiwicmVtb3ZlSXRlbSIsIndpbmRvdyIsInRvTG93ZXJDYXNlIiwiZG9jdW1lbnQiLCJkb2N1bWVudEVsZW1lbnQiLCJzdHlsZSIsIldlYmtpdEFwcGVhcmFuY2UiLCJmaXJlYnVnIiwiZXhjZXB0aW9uIiwidGFibGUiLCJSZWdFeHAiLCIkMSIsImNocm9tZSIsImxvY2FsIiwibG9jYWxTdG9yYWdlIiwibG9jYWxzdG9yYWdlIiwiY29sb3JzIiwiZm9ybWF0dGVycyIsImoiLCJ2IiwiSlNPTiIsInN0cmluZ2lmeSIsImVuYWJsZSIsInN0ciIsImVuY29kZVVSSUNvbXBvbmVudCIsInFzIiwicXJ5IiwicGFpcnMiLCJwYWlyIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwiYSIsImIiLCJjb25zdHJ1Y3RvciIsImNhY2hlZFNldFRpbWVvdXQiLCJjYWNoZWRDbGVhclRpbWVvdXQiLCJkZWZhdWx0U2V0VGltb3V0IiwiRXJyb3IiLCJkZWZhdWx0Q2xlYXJUaW1lb3V0IiwicnVuVGltZW91dCIsImZ1biIsInNldFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJjdXJyZW50UXVldWUiLCJxdWV1ZSIsImRyYWluaW5nIiwicXVldWVJbmRleCIsImNsZWFuVXBOZXh0VGljayIsImNvbmNhdCIsImRyYWluUXVldWUiLCJ0aW1lb3V0IiwicnVuIiwibWFya2VyIiwicnVuQ2xlYXJUaW1lb3V0IiwiSXRlbSIsImFycmF5IiwibmV4dFRpY2siLCJ0aXRsZSIsImJyb3dzZXIiLCJhcmd2IiwidmVyc2lvbiIsInZlcnNpb25zIiwiYWRkTGlzdGVuZXIiLCJwcmVwZW5kTGlzdGVuZXIiLCJwcmVwZW5kT25jZUxpc3RlbmVyIiwiYmluZGluZyIsImN3ZCIsImNoZGlyIiwiZGlyIiwidW1hc2siLCJoIiwieSIsInBsdXJhbCIsIm1zIiwiTWF0aCIsImZsb29yIiwiY2VpbCIsInZhbCIsIm9wdGlvbnMiLCJleGVjIiwicGFyc2VGbG9hdCIsInBhcnNlIiwiaXNOYU4iLCJsb25nIiwicm91bmQiLCJmbXRTaG9ydCIsImJpbmFyeSIsImlzQXJyYXkiLCJpc0J1ZiIsIkVuY29kZXIiLCJ0eXBlcyIsIkNPTk5FQ1QiLCJESVNDT05ORUNUIiwiRVZFTlQiLCJBQ0siLCJFUlJPUiIsIkJJTkFSWV9FVkVOVCIsIkJJTkFSWV9BQ0siLCJEZWNvZGVyIiwiRVJST1JfUEFDS0VUIiwiZW5jb2RlQXNTdHJpbmciLCJhdHRhY2htZW50cyIsIm5zcCIsImlkIiwicGF5bG9hZCIsInRyeVN0cmluZ2lmeSIsInJlY29uc3RydWN0b3IiLCJCaW5hcnlSZWNvbnN0cnVjdG9yIiwicmVjb25QYWNrIiwicmVtb3ZlQmxvYnMiLCJibG9ibGVzc0RhdGEiLCJkZWNvbnN0cnVjdGlvbiIsImRlY29uc3RydWN0UGFja2V0IiwicGFjayIsInVuc2hpZnQiLCJlbmNvZGVBc0JpbmFyeSIsImFkZCIsImJ1ZiIsInRyeVBhcnNlIiwiaXNQYXlsb2FkVmFsaWQiLCJkZWNvZGVTdHJpbmciLCJ0YWtlQmluYXJ5RGF0YSIsImRlc3Ryb3kiLCJmaW5pc2hlZFJlY29uc3RydWN0aW9uIiwiYmluRGF0YSIsInJlY29uc3RydWN0UGFja2V0IiwiZ2xvYmFsIiwiaWVlZTc1NCIsImtNYXhMZW5ndGgiLCJCdWZmZXIiLCJUWVBFRF9BUlJBWV9TVVBQT1JUIiwiY3JlYXRlQnVmZmVyIiwidGhhdCIsIlJhbmdlRXJyb3IiLCJfX3Byb3RvX18iLCJhcmciLCJlbmNvZGluZ09yT2Zmc2V0IiwiYWxsb2NVbnNhZmUiLCJmcm9tIiwiVHlwZUVycm9yIiwiYnl0ZU9mZnNldCIsImZyb21BcnJheUxpa2UiLCJmcm9tQXJyYXlCdWZmZXIiLCJzdHJpbmciLCJlbmNvZGluZyIsImlzRW5jb2RpbmciLCJhY3R1YWwiLCJ3cml0ZSIsImZyb21TdHJpbmciLCJpc0J1ZmZlciIsImNoZWNrZWQiLCJjb3B5IiwiZnJvbU9iamVjdCIsImFzc2VydFNpemUiLCJpc1ZpZXciLCJsb3dlcmVkQ2FzZSIsInV0ZjhUb0J5dGVzIiwiYmFzZTY0VG9CeXRlcyIsInN3YXAiLCJiaWRpcmVjdGlvbmFsSW5kZXhPZiIsImFycmF5SW5kZXhPZiIsImluZGV4T2YiLCJsYXN0SW5kZXhPZiIsImFyciIsImluZGV4U2l6ZSIsImFyckxlbmd0aCIsInZhbExlbmd0aCIsInJlYWQiLCJyZWFkVUludDE2QkUiLCJmb3VuZEluZGV4IiwiZm91bmQiLCJoZXhXcml0ZSIsIm9mZnNldCIsInJlbWFpbmluZyIsInN0ckxlbiIsInBhcnNlZCIsInV0ZjhXcml0ZSIsImJsaXRCdWZmZXIiLCJhc2NpaVdyaXRlIiwiYnl0ZUFycmF5IiwiYXNjaWlUb0J5dGVzIiwibGF0aW4xV3JpdGUiLCJiYXNlNjRXcml0ZSIsInVjczJXcml0ZSIsInVuaXRzIiwiaGkiLCJsbyIsInV0ZjE2bGVUb0J5dGVzIiwiYmFzZTY0U2xpY2UiLCJzdGFydCIsImVuZCIsImZyb21CeXRlQXJyYXkiLCJ1dGY4U2xpY2UiLCJtaW4iLCJyZXMiLCJzZWNvbmRCeXRlIiwidGhpcmRCeXRlIiwiZm91cnRoQnl0ZSIsInRlbXBDb2RlUG9pbnQiLCJmaXJzdEJ5dGUiLCJjb2RlUG9pbnQiLCJieXRlc1BlclNlcXVlbmNlIiwiY29kZVBvaW50cyIsIk1BWF9BUkdVTUVOVFNfTEVOR1RIIiwiZGVjb2RlQ29kZVBvaW50c0FycmF5IiwiU2xvd0J1ZmZlciIsImFsbG9jIiwiSU5TUEVDVF9NQVhfQllURVMiLCJmb28iLCJzdWJhcnJheSIsInR5cGVkQXJyYXlTdXBwb3J0IiwicG9vbFNpemUiLCJfYXVnbWVudCIsInNwZWNpZXMiLCJjb25maWd1cmFibGUiLCJmaWxsIiwiYWxsb2NVbnNhZmVTbG93IiwiX2lzQnVmZmVyIiwiY29tcGFyZSIsIngiLCJsaXN0IiwicG9zIiwic3dhcDE2Iiwic3dhcDMyIiwic3dhcDY0IiwiaGV4U2xpY2UiLCJhc2NpaVNsaWNlIiwibGF0aW4xU2xpY2UiLCJ1dGYxNmxlU2xpY2UiLCJlcXVhbHMiLCJpbnNwZWN0IiwibWF4IiwidGFyZ2V0IiwidGhpc1N0YXJ0IiwidGhpc0VuZCIsInRoaXNDb3B5IiwidGFyZ2V0Q29weSIsImluY2x1ZGVzIiwiaXNGaW5pdGUiLCJ0b0pTT04iLCJfYXJyIiwicmV0Iiwib3V0IiwidG9IZXgiLCJieXRlcyIsImNoZWNrT2Zmc2V0IiwiZXh0IiwiY2hlY2tJbnQiLCJvYmplY3RXcml0ZVVJbnQxNiIsImxpdHRsZUVuZGlhbiIsIm9iamVjdFdyaXRlVUludDMyIiwiY2hlY2tJRUVFNzU0Iiwid3JpdGVGbG9hdCIsIm5vQXNzZXJ0Iiwid3JpdGVEb3VibGUiLCJuZXdCdWYiLCJzbGljZUxlbiIsInJlYWRVSW50TEUiLCJtdWwiLCJyZWFkVUludEJFIiwicmVhZFVJbnQ4IiwicmVhZFVJbnQxNkxFIiwicmVhZFVJbnQzMkxFIiwicmVhZFVJbnQzMkJFIiwicmVhZEludExFIiwicG93IiwicmVhZEludEJFIiwicmVhZEludDgiLCJyZWFkSW50MTZMRSIsInJlYWRJbnQxNkJFIiwicmVhZEludDMyTEUiLCJyZWFkSW50MzJCRSIsInJlYWRGbG9hdExFIiwicmVhZEZsb2F0QkUiLCJyZWFkRG91YmxlTEUiLCJyZWFkRG91YmxlQkUiLCJ3cml0ZVVJbnRMRSIsIndyaXRlVUludEJFIiwid3JpdGVVSW50OCIsIndyaXRlVUludDE2TEUiLCJ3cml0ZVVJbnQxNkJFIiwid3JpdGVVSW50MzJMRSIsIndyaXRlVUludDMyQkUiLCJ3cml0ZUludExFIiwibGltaXQiLCJzdWIiLCJ3cml0ZUludEJFIiwid3JpdGVJbnQ4Iiwid3JpdGVJbnQxNkxFIiwid3JpdGVJbnQxNkJFIiwid3JpdGVJbnQzMkxFIiwid3JpdGVJbnQzMkJFIiwid3JpdGVGbG9hdExFIiwid3JpdGVGbG9hdEJFIiwid3JpdGVEb3VibGVMRSIsIndyaXRlRG91YmxlQkUiLCJ0YXJnZXRTdGFydCIsInNldCIsImNvZGUiLCJJTlZBTElEX0JBU0U2NF9SRSIsIkluZmluaXR5IiwibGVhZFN1cnJvZ2F0ZSIsInRvQnl0ZUFycmF5IiwidHJpbSIsInN0cmluZ3RyaW0iLCJiYXNlNjRjbGVhbiIsInNyYyIsImRzdCIsImhhc0NPUlMiLCJvcHRzIiwieGRvbWFpbiIsInhzY2hlbWUiLCJlbmFibGVzWERSIiwiWE1MSHR0cFJlcXVlc3QiLCJYRG9tYWluUmVxdWVzdCIsInNlbGYiLCJwYXJzZXIiLCJUcmFuc3BvcnQiLCJwYXRoIiwiaG9zdG5hbWUiLCJwb3J0Iiwic2VjdXJlIiwicXVlcnkiLCJ0aW1lc3RhbXBQYXJhbSIsInRpbWVzdGFtcFJlcXVlc3RzIiwicmVhZHlTdGF0ZSIsImFnZW50Iiwic29ja2V0IiwicGZ4IiwicGFzc3BocmFzZSIsImNlcnQiLCJjYSIsImNpcGhlcnMiLCJyZWplY3RVbmF1dGhvcml6ZWQiLCJmb3JjZU5vZGUiLCJpc1JlYWN0TmF0aXZlIiwiZXh0cmFIZWFkZXJzIiwibG9jYWxBZGRyZXNzIiwib25FcnJvciIsImRlc2MiLCJkZXNjcmlwdGlvbiIsImRvT3BlbiIsImRvQ2xvc2UiLCJvbkNsb3NlIiwic2VuZCIsIm9uT3BlbiIsIndyaXRhYmxlIiwib25EYXRhIiwib25QYWNrZXQiLCJyZSIsInBhcnRzIiwidXJpIiwic291cmNlIiwiaG9zdCIsImF1dGhvcml0eSIsImlwdjZ1cmkiLCJ3aXRoTmF0aXZlQnVmZmVyIiwid2l0aE5hdGl2ZUFycmF5QnVmZmVyIiwiZyIsImVpbyIsIlNvY2tldCIsIkJhY2tvZmYiLCJoYXMiLCJNYW5hZ2VyIiwibnNwcyIsInN1YnMiLCJyZWNvbm5lY3Rpb24iLCJyZWNvbm5lY3Rpb25BdHRlbXB0cyIsInJlY29ubmVjdGlvbkRlbGF5IiwicmVjb25uZWN0aW9uRGVsYXlNYXgiLCJyYW5kb21pemF0aW9uRmFjdG9yIiwiYmFja29mZiIsImppdHRlciIsImNvbm5lY3RpbmciLCJsYXN0UGluZyIsInBhY2tldEJ1ZmZlciIsIl9wYXJzZXIiLCJlbmNvZGVyIiwiZGVjb2RlciIsImF1dG9Db25uZWN0IiwiZW1pdEFsbCIsInVwZGF0ZVNvY2tldElkcyIsImdlbmVyYXRlSWQiLCJlbmdpbmUiLCJfcmVjb25uZWN0aW9uIiwiX3JlY29ubmVjdGlvbkF0dGVtcHRzIiwiX3JlY29ubmVjdGlvbkRlbGF5Iiwic2V0TWluIiwiX3JhbmRvbWl6YXRpb25GYWN0b3IiLCJzZXRKaXR0ZXIiLCJfcmVjb25uZWN0aW9uRGVsYXlNYXgiLCJzZXRNYXgiLCJfdGltZW91dCIsIm1heWJlUmVjb25uZWN0T25PcGVuIiwicmVjb25uZWN0aW5nIiwiYXR0ZW1wdHMiLCJyZWNvbm5lY3QiLCJjb25uZWN0Iiwic2tpcFJlY29ubmVjdCIsIm9wZW5TdWIiLCJvbm9wZW4iLCJlcnJvclN1YiIsImNsZWFudXAiLCJ0aW1lciIsIm9ucGluZyIsIkRhdGUiLCJvbnBvbmciLCJvbmRhdGEiLCJvbmRlY29kZWQiLCJvbmVycm9yIiwib25Db25uZWN0aW5nIiwicHJvY2Vzc1BhY2tldFF1ZXVlIiwic2hpZnQiLCJzdWJzTGVuZ3RoIiwiZGlzY29ubmVjdCIsInJlc2V0Iiwib25jbG9zZSIsInJlYXNvbiIsImRlbGF5IiwiZHVyYXRpb24iLCJvbnJlY29ubmVjdCIsImF0dGVtcHQiLCJYSFIiLCJKU09OUCIsIndlYnNvY2tldCIsInBvbGxpbmciLCJ4ZCIsInhzIiwianNvbnAiLCJsb2NhdGlvbiIsImlzU1NMIiwiZm9yY2VKU09OUCIsInBhcnNlcXMiLCJpbmhlcml0IiwieWVhc3QiLCJQb2xsaW5nIiwiaGFzWEhSMiIsInJlc3BvbnNlVHlwZSIsImZvcmNlQmFzZTY0IiwicG9sbCIsInBhdXNlIiwib25QYXVzZSIsImRvUG9sbCIsImNhbGxiYWNrZm4iLCJkb1dyaXRlIiwic2NoZW1hIiwic2lkIiwid2l0aE5hdGl2ZUJsb2IiLCJ3aXRoTmF0aXZlRmlsZSIsIkZpbGUiLCJwcmV2IiwiYWxwaGFiZXQiLCJzZWVkIiwibnVtIiwibm93IiwiZGVjb2RlZCIsInRvQXJyYXkiLCJoYXNCaW4iLCJldmVudHMiLCJjb25uZWN0X2Vycm9yIiwiY29ubmVjdF90aW1lb3V0IiwicmVjb25uZWN0X2F0dGVtcHQiLCJyZWNvbm5lY3RfZmFpbGVkIiwicmVjb25uZWN0X2Vycm9yIiwiaW8iLCJqc29uIiwiaWRzIiwiYWNrcyIsInJlY2VpdmVCdWZmZXIiLCJzZW5kQnVmZmVyIiwiY29ubmVjdGVkIiwiZGlzY29ubmVjdGVkIiwiZmxhZ3MiLCJzdWJFdmVudHMiLCJldiIsImNvbXByZXNzIiwicG9wIiwib25wYWNrZXQiLCJzYW1lTmFtZXNwYWNlIiwicm9vdE5hbWVzcGFjZUVycm9yIiwib25jb25uZWN0Iiwib25ldmVudCIsIm9uYWNrIiwib25kaXNjb25uZWN0IiwiYWNrIiwic2VudCIsImVtaXRCdWZmZXJlZCIsIm1vdmVtZW50IiwidXAiLCJkb3duIiwibGVmdCIsInJpZ2h0Iiwia2V5Q29kZSIsInNldEludGVydmFsIiwiY2FudmFzIiwiZ2V0RWxlbWVudEJ5SWQiLCJ3aWR0aCIsImhlaWdodCIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiZm9udCIsInBsYXllcnMiLCJjbGVhclJlY3QiLCJwbGF5ZXIiLCJmaWxsU3R5bGUiLCJiZWdpblBhdGgiLCJhcmMiLCJQSSIsImZpbGxUZXh0IiwidXJsIiwibG9va3VwIiwiY2FjaGUiLCJtYW5hZ2VycyIsImZvcmNlTmV3IiwibXVsdGlwbGV4IiwicGFyc2V1cmkiLCJsb2MiLCJocmVmIiwiY3JlYXRlRGVidWciLCJwcmV2VGltZSIsImVuYWJsZWQiLCJjdXJyIiwiY29lcmNlIiwiZm9ybWF0IiwiZm9ybWF0dGVyIiwiaGFzaCIsImFicyIsInNlbGVjdENvbG9yIiwiaW5pdCIsImluc3RhbmNlcyIsInN0YWNrIiwiZGlzYWJsZSIsIm5hbWVzIiwic2tpcHMiLCJpbnN0YW5jZSIsInBhY2tldERhdGEiLCJfZGVjb25zdHJ1Y3RQYWNrZXQiLCJwbGFjZWhvbGRlciIsIl9wbGFjZWhvbGRlciIsIm5ld0RhdGEiLCJfcmVjb25zdHJ1Y3RQYWNrZXQiLCJwZW5kaW5nQmxvYnMiLCJfcmVtb3ZlQmxvYnMiLCJjdXJLZXkiLCJjb250YWluaW5nT2JqZWN0IiwiZmlsZVJlYWRlciIsImxlbnMiLCJnZXRMZW5zIiwidmFsaWRMZW4iLCJwbGFjZUhvbGRlcnNMZW4iLCJ0bXAiLCJBcnIiLCJfYnl0ZUxlbmd0aCIsImN1ckJ5dGUiLCJyZXZMb29rdXAiLCJ1aW50OCIsImV4dHJhQnl0ZXMiLCJsZW4yIiwiZW5jb2RlQ2h1bmsiLCJvdXRwdXQiLCJpc0xFIiwibUxlbiIsIm5CeXRlcyIsImVMZW4iLCJlTWF4IiwiZUJpYXMiLCJuQml0cyIsIk5hTiIsInJ0IiwiTE4yIiwidHJhbnNwb3J0cyIsInRyYW5zcG9ydE9wdGlvbnMiLCJ3cml0ZUJ1ZmZlciIsInByZXZCdWZmZXJMZW4iLCJwb2xpY3lQb3J0IiwicmVtZW1iZXJVcGdyYWRlIiwib25seUJpbmFyeVVwZ3JhZGVzIiwicGVyTWVzc2FnZURlZmxhdGUiLCJ0aHJlc2hvbGQiLCJwcm9kdWN0IiwidXBncmFkZXMiLCJwaW5nSW50ZXJ2YWwiLCJwaW5nVGltZW91dCIsInBpbmdJbnRlcnZhbFRpbWVyIiwicGluZ1RpbWVvdXRUaW1lciIsInByaW9yV2Vic29ja2V0U3VjY2VzcyIsImNyZWF0ZVRyYW5zcG9ydCIsImNsb25lIiwiRUlPIiwidHJhbnNwb3J0IiwicmVxdWVzdFRpbWVvdXQiLCJwcm90b2NvbHMiLCJzZXRUcmFuc3BvcnQiLCJvbkRyYWluIiwicHJvYmUiLCJmYWlsZWQiLCJvblRyYW5zcG9ydE9wZW4iLCJ1cGdyYWRlTG9zZXNCaW5hcnkiLCJ1cGdyYWRpbmciLCJmbHVzaCIsImZyZWV6ZVRyYW5zcG9ydCIsIm9uVHJhbnNwb3J0Q2xvc2UiLCJvbnVwZ3JhZGUiLCJ0byIsIm9uSGFuZHNoYWtlIiwic2V0UGluZyIsImZpbHRlclVwZ3JhZGVzIiwib25IZWFydGJlYXQiLCJzZW5kUGFja2V0Iiwid2FpdEZvclVwZ3JhZGUiLCJjbGVhbnVwQW5kQ2xvc2UiLCJmaWx0ZXJlZFVwZ3JhZGVzIiwiZW1wdHkiLCJSZXF1ZXN0IiwibWV0aG9kIiwiYXN5bmMiLCJyZXF1ZXN0IiwicmVxIiwic2VuZFhociIsInBvbGxYaHIiLCJ4aHIiLCJzZXREaXNhYmxlSGVhZGVyQ2hlY2siLCJzZXRSZXF1ZXN0SGVhZGVyIiwid2l0aENyZWRlbnRpYWxzIiwiaGFzWERSIiwib25Mb2FkIiwicmVzcG9uc2VUZXh0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwiY29udGVudFR5cGUiLCJnZXRSZXNwb25zZUhlYWRlciIsInN0YXR1cyIsInJlcXVlc3RzQ291bnQiLCJyZXF1ZXN0cyIsIm9uU3VjY2VzcyIsImZyb21FcnJvciIsImFib3J0IiwicmVzcG9uc2UiLCJhdHRhY2hFdmVudCIsInVubG9hZEhhbmRsZXIiLCJ0ZXJtaW5hdGlvbkV2ZW50IiwiYXJyYXlidWZmZXIiLCJhYnYiLCJpaSIsImNvdW50IiwiZXJyX2NiIiwiYmFpbCIsInByb3h5IiwiYnl0ZUNvdW50IiwiYnl0ZUluZGV4Iiwic3RyaW5nRnJvbUNoYXJDb2RlIiwidWNzMmRlY29kZSIsImV4dHJhIiwiY291bnRlciIsImNoZWNrU2NhbGFyVmFsdWUiLCJ0b1VwcGVyQ2FzZSIsImNyZWF0ZUJ5dGUiLCJlbmNvZGVDb2RlUG9pbnQiLCJzeW1ib2wiLCJyZWFkQ29udGludWF0aW9uQnl0ZSIsImNvbnRpbnVhdGlvbkJ5dGUiLCJkZWNvZGVTeW1ib2wiLCJieXRlMSIsImJ5dGVTdHJpbmciLCJ1Y3MyZW5jb2RlIiwiY2hhcnMiLCJlbmNvZGVkMSIsImVuY29kZWQyIiwiZW5jb2RlZDMiLCJlbmNvZGVkNCIsImJ1ZmZlckxlbmd0aCIsIkJsb2JCdWlsZGVyIiwiV2ViS2l0QmxvYkJ1aWxkZXIiLCJNU0Jsb2JCdWlsZGVyIiwiTW96QmxvYkJ1aWxkZXIiLCJibG9iU3VwcG9ydGVkIiwiYmxvYlN1cHBvcnRzQXJyYXlCdWZmZXJWaWV3IiwiYmxvYkJ1aWxkZXJTdXBwb3J0ZWQiLCJhcHBlbmQiLCJnZXRCbG9iIiwibWFwQXJyYXlCdWZmZXJWaWV3cyIsImNodW5rIiwiQmxvYkJ1aWxkZXJDb25zdHJ1Y3RvciIsImJiIiwicGFydCIsIkJsb2JDb25zdHJ1Y3RvciIsIkpTT05QUG9sbGluZyIsInJOZXdsaW5lIiwickVzY2FwZWROZXdsaW5lIiwiZ2xvYiIsIl9fX2VpbyIsInNjcmlwdCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsImZvcm0iLCJpZnJhbWUiLCJjcmVhdGVFbGVtZW50IiwiaW5zZXJ0QXQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImluc2VydEJlZm9yZSIsImhlYWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJhcmVhIiwiaWZyYW1lSWQiLCJjbGFzc05hbWUiLCJwb3NpdGlvbiIsInRvcCIsInNldEF0dHJpYnV0ZSIsImNvbXBsZXRlIiwiaW5pdElmcmFtZSIsImh0bWwiLCJhY3Rpb24iLCJzdWJtaXQiLCJCcm93c2VyV2ViU29ja2V0IiwiTm9kZVdlYlNvY2tldCIsIldlYlNvY2tldCIsIk1veldlYlNvY2tldCIsIldlYlNvY2tldEltcGwiLCJXUyIsInVzaW5nQnJvd3NlcldlYlNvY2tldCIsImNoZWNrIiwiaGVhZGVycyIsIndzIiwic3VwcG9ydHMiLCJhZGRFdmVudExpc3RlbmVycyIsIm9ubWVzc2FnZSIsImZhY3RvciIsInJhbmQiLCJyYW5kb20iLCJkZXZpYXRpb24iXSwibWFwcGluZ3MiOiJhQUNBLElBQUFBLEVBQUEsR0FHQSxTQUFBQyxFQUFBQyxHQUdBLEdBQUFGLEVBQUFFLEdBQ0EsT0FBQUYsRUFBQUUsR0FBQUMsUUFHQSxJQUFBQyxFQUFBSixFQUFBRSxHQUFBLENBQ0FHLEVBQUFILEVBQ0FJLEdBQUEsRUFDQUgsUUFBQSxJQVVBLE9BTkFJLEVBQUFMLEdBQUFNLEtBQUFKLEVBQUFELFFBQUFDLElBQUFELFFBQUFGLEdBR0FHLEVBQUFFLEdBQUEsRUFHQUYsRUFBQUQsUUFLQUYsRUFBQVEsRUFBQUYsRUFHQU4sRUFBQVMsRUFBQVYsRUFHQUMsRUFBQVUsRUFBQSxTQUFBUixFQUFBUyxFQUFBQyxHQUNBWixFQUFBYSxFQUFBWCxFQUFBUyxJQUNBRyxPQUFBQyxlQUFBYixFQUFBUyxFQUFBLENBQTBDSyxZQUFBLEVBQUFDLElBQUFMLEtBSzFDWixFQUFBa0IsRUFBQSxTQUFBaEIsR0FDQSxvQkFBQWlCLGVBQUFDLGFBQ0FOLE9BQUFDLGVBQUFiLEVBQUFpQixPQUFBQyxZQUFBLENBQXdEQyxNQUFBLFdBRXhEUCxPQUFBQyxlQUFBYixFQUFBLGNBQWlEbUIsT0FBQSxLQVFqRHJCLEVBQUFzQixFQUFBLFNBQUFELEVBQUFFLEdBRUEsR0FEQSxFQUFBQSxJQUFBRixFQUFBckIsRUFBQXFCLElBQ0EsRUFBQUUsRUFBQSxPQUFBRixFQUNBLEtBQUFFLEdBQUEsaUJBQUFGLFFBQUFHLFdBQUEsT0FBQUgsRUFDQSxJQUFBSSxFQUFBWCxPQUFBWSxPQUFBLE1BR0EsR0FGQTFCLEVBQUFrQixFQUFBTyxHQUNBWCxPQUFBQyxlQUFBVSxFQUFBLFdBQXlDVCxZQUFBLEVBQUFLLFVBQ3pDLEVBQUFFLEdBQUEsaUJBQUFGLEVBQUEs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TyxLQUFBc08sR0FBQUMsS0FBQStMLElBQUF0YSxLQUFBbTNCLE9BQUFuM0IsS0FBQXdpQixZQUNBLEdBQUF4aUIsS0FBQWloQixPQUFBLENBQ0EsSUFBQW1XLEVBQUE3b0IsS0FBQThvQixTQUNBQyxFQUFBL29CLEtBQUFDLE1BQUE0b0IsRUFBQXAzQixLQUFBaWhCLE9BQUEzUyxHQUNBQSxFQUFBLE1BQUFDLEtBQUFDLE1BQUEsR0FBQTRvQixJQUFBOW9CLEVBQUFncEIsRUFBQWhwQixFQUFBZ3BCLEVBRUEsU0FBQS9vQixLQUFBdUgsSUFBQXhILEVBQUF0TyxLQUFBb1ksTUFTQWtJLEVBQUFqaEIsVUFBQXVrQixNQUFBLFdBQ0E1akIsS0FBQXdpQixTQUFBLEdBU0FsQyxFQUFBamhCLFVBQUEyaUIsT0FBQSxTQUFBbE0sR0FDQTlWLEtBQUFzTyxHQUFBd0gsR0FTQXdLLEVBQUFqaEIsVUFBQStpQixPQUFBLFNBQUFoSyxHQUNBcFksS0FBQW9ZLE9BU0FrSSxFQUFBamhCLFVBQUE2aUIsVUFBQSxTQUFBakIsR0FDQWpoQixLQUFBaWhCIiwiZmlsZSI6ImdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMjUpO1xuIiwiXHJcbi8qKlxyXG4gKiBFeHBvc2UgYEVtaXR0ZXJgLlxyXG4gKi9cclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XHJcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XHJcbn07XHJcblxyXG4vKipcclxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG1peGluKG9iaikge1xyXG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xyXG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xyXG4gIH1cclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub24gPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgKHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdKVxyXG4gICAgLnB1c2goZm4pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxyXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICBmdW5jdGlvbiBvbigpIHtcclxuICAgIHRoaXMub2ZmKGV2ZW50LCBvbik7XHJcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gIH1cclxuXHJcbiAgb24uZm4gPSBmbjtcclxuICB0aGlzLm9uKGV2ZW50LCBvbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcclxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cclxuICAvLyBhbGxcclxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gc3BlY2lmaWMgZXZlbnRcclxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XHJcblxyXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcclxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcclxuICB2YXIgY2I7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcclxuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtNaXhlZH0gLi4uXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuXHJcbiAgaWYgKGNhbGxiYWNrcykge1xyXG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcclxufTtcclxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBrZXlzID0gcmVxdWlyZSgnLi9rZXlzJyk7XG52YXIgaGFzQmluYXJ5ID0gcmVxdWlyZSgnaGFzLWJpbmFyeTInKTtcbnZhciBzbGljZUJ1ZmZlciA9IHJlcXVpcmUoJ2FycmF5YnVmZmVyLnNsaWNlJyk7XG52YXIgYWZ0ZXIgPSByZXF1aXJlKCdhZnRlcicpO1xudmFyIHV0ZjggPSByZXF1aXJlKCcuL3V0ZjgnKTtcblxudmFyIGJhc2U2NGVuY29kZXI7XG5pZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykge1xuICBiYXNlNjRlbmNvZGVyID0gcmVxdWlyZSgnYmFzZTY0LWFycmF5YnVmZmVyJyk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgd2UgYXJlIHJ1bm5pbmcgYW4gYW5kcm9pZCBicm93c2VyLiBUaGF0IHJlcXVpcmVzIHVzIHRvIHVzZVxuICogQXJyYXlCdWZmZXIgd2l0aCBwb2xsaW5nIHRyYW5zcG9ydHMuLi5cbiAqXG4gKiBodHRwOi8vZ2hpbmRhLm5ldC9qcGVnLWJsb2ItYWpheC1hbmRyb2lkL1xuICovXG5cbnZhciBpc0FuZHJvaWQgPSB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAvQW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbi8qKlxuICogQ2hlY2sgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gUGhhbnRvbUpTLlxuICogVXBsb2FkaW5nIGEgQmxvYiB3aXRoIFBoYW50b21KUyBkb2VzIG5vdCB3b3JrIGNvcnJlY3RseSwgYXMgcmVwb3J0ZWQgaGVyZTpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcml5YS9waGFudG9tanMvaXNzdWVzLzExMzk1XG4gKiBAdHlwZSBib29sZWFuXG4gKi9cbnZhciBpc1BoYW50b21KUyA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIC9QaGFudG9tSlMvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vKipcbiAqIFdoZW4gdHJ1ZSwgYXZvaWRzIHVzaW5nIEJsb2JzIHRvIGVuY29kZSBwYXlsb2Fkcy5cbiAqIEB0eXBlIGJvb2xlYW5cbiAqL1xudmFyIGRvbnRTZW5kQmxvYnMgPSBpc0FuZHJvaWQgfHwgaXNQaGFudG9tSlM7XG5cbi8qKlxuICogQ3VycmVudCBwcm90b2NvbCB2ZXJzaW9uLlxuICovXG5cbmV4cG9ydHMucHJvdG9jb2wgPSAzO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlcy5cbiAqL1xuXG52YXIgcGFja2V0cyA9IGV4cG9ydHMucGFja2V0cyA9IHtcbiAgICBvcGVuOiAgICAgMCAgICAvLyBub24td3NcbiAgLCBjbG9zZTogICAgMSAgICAvLyBub24td3NcbiAgLCBwaW5nOiAgICAgMlxuICAsIHBvbmc6ICAgICAzXG4gICwgbWVzc2FnZTogIDRcbiAgLCB1cGdyYWRlOiAgNVxuICAsIG5vb3A6ICAgICA2XG59O1xuXG52YXIgcGFja2V0c2xpc3QgPSBrZXlzKHBhY2tldHMpO1xuXG4vKipcbiAqIFByZW1hZGUgZXJyb3IgcGFja2V0LlxuICovXG5cbnZhciBlcnIgPSB7IHR5cGU6ICdlcnJvcicsIGRhdGE6ICdwYXJzZXIgZXJyb3InIH07XG5cbi8qKlxuICogQ3JlYXRlIGEgYmxvYiBhcGkgZXZlbiBmb3IgYmxvYiBidWlsZGVyIHdoZW4gdmVuZG9yIHByZWZpeGVzIGV4aXN0XG4gKi9cblxudmFyIEJsb2IgPSByZXF1aXJlKCdibG9iJyk7XG5cbi8qKlxuICogRW5jb2RlcyBhIHBhY2tldC5cbiAqXG4gKiAgICAgPHBhY2tldCB0eXBlIGlkPiBbIDxkYXRhPiBdXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgNWhlbGxvIHdvcmxkXG4gKiAgICAgM1xuICogICAgIDRcbiAqXG4gKiBCaW5hcnkgaXMgZW5jb2RlZCBpbiBhbiBpZGVudGljYWwgcHJpbmNpcGxlXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGVQYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgdXRmOGVuY29kZSwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBzdXBwb3J0c0JpbmFyeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gc3VwcG9ydHNCaW5hcnk7XG4gICAgc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdXRmOGVuY29kZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gdXRmOGVuY29kZTtcbiAgICB1dGY4ZW5jb2RlID0gbnVsbDtcbiAgfVxuXG4gIHZhciBkYXRhID0gKHBhY2tldC5kYXRhID09PSB1bmRlZmluZWQpXG4gICAgPyB1bmRlZmluZWRcbiAgICA6IHBhY2tldC5kYXRhLmJ1ZmZlciB8fCBwYWNrZXQuZGF0YTtcblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiBkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZW5jb2RlQXJyYXlCdWZmZXIocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBCbG9iICE9PSAndW5kZWZpbmVkJyAmJiBkYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgIHJldHVybiBlbmNvZGVCbG9iKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKTtcbiAgfVxuXG4gIC8vIG1pZ2h0IGJlIGFuIG9iamVjdCB3aXRoIHsgYmFzZTY0OiB0cnVlLCBkYXRhOiBkYXRhQXNCYXNlNjRTdHJpbmcgfVxuICBpZiAoZGF0YSAmJiBkYXRhLmJhc2U2NCkge1xuICAgIHJldHVybiBlbmNvZGVCYXNlNjRPYmplY3QocGFja2V0LCBjYWxsYmFjayk7XG4gIH1cblxuICAvLyBTZW5kaW5nIGRhdGEgYXMgYSB1dGYtOCBzdHJpbmdcbiAgdmFyIGVuY29kZWQgPSBwYWNrZXRzW3BhY2tldC50eXBlXTtcblxuICAvLyBkYXRhIGZyYWdtZW50IGlzIG9wdGlvbmFsXG4gIGlmICh1bmRlZmluZWQgIT09IHBhY2tldC5kYXRhKSB7XG4gICAgZW5jb2RlZCArPSB1dGY4ZW5jb2RlID8gdXRmOC5lbmNvZGUoU3RyaW5nKHBhY2tldC5kYXRhKSwgeyBzdHJpY3Q6IGZhbHNlIH0pIDogU3RyaW5nKHBhY2tldC5kYXRhKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsYmFjaygnJyArIGVuY29kZWQpO1xuXG59O1xuXG5mdW5jdGlvbiBlbmNvZGVCYXNlNjRPYmplY3QocGFja2V0LCBjYWxsYmFjaykge1xuICAvLyBwYWNrZXQgZGF0YSBpcyBhbiBvYmplY3QgeyBiYXNlNjQ6IHRydWUsIGRhdGE6IGRhdGFBc0Jhc2U2NFN0cmluZyB9XG4gIHZhciBtZXNzYWdlID0gJ2InICsgZXhwb3J0cy5wYWNrZXRzW3BhY2tldC50eXBlXSArIHBhY2tldC5kYXRhLmRhdGE7XG4gIHJldHVybiBjYWxsYmFjayhtZXNzYWdlKTtcbn1cblxuLyoqXG4gKiBFbmNvZGUgcGFja2V0IGhlbHBlcnMgZm9yIGJpbmFyeSB0eXBlc1xuICovXG5cbmZ1bmN0aW9uIGVuY29kZUFycmF5QnVmZmVyKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gIGlmICghc3VwcG9ydHNCaW5hcnkpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQocGFja2V0LCBjYWxsYmFjayk7XG4gIH1cblxuICB2YXIgZGF0YSA9IHBhY2tldC5kYXRhO1xuICB2YXIgY29udGVudEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gIHZhciByZXN1bHRCdWZmZXIgPSBuZXcgVWludDhBcnJheSgxICsgZGF0YS5ieXRlTGVuZ3RoKTtcblxuICByZXN1bHRCdWZmZXJbMF0gPSBwYWNrZXRzW3BhY2tldC50eXBlXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZW50QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICByZXN1bHRCdWZmZXJbaSsxXSA9IGNvbnRlbnRBcnJheVtpXTtcbiAgfVxuXG4gIHJldHVybiBjYWxsYmFjayhyZXN1bHRCdWZmZXIuYnVmZmVyKTtcbn1cblxuZnVuY3Rpb24gZW5jb2RlQmxvYkFzQXJyYXlCdWZmZXIocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spIHtcbiAgaWYgKCFzdXBwb3J0c0JpbmFyeSkge1xuICAgIHJldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHZhciBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gIGZyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0KHsgdHlwZTogcGFja2V0LnR5cGUsIGRhdGE6IGZyLnJlc3VsdCB9LCBzdXBwb3J0c0JpbmFyeSwgdHJ1ZSwgY2FsbGJhY2spO1xuICB9O1xuICByZXR1cm4gZnIucmVhZEFzQXJyYXlCdWZmZXIocGFja2V0LmRhdGEpO1xufVxuXG5mdW5jdGlvbiBlbmNvZGVCbG9iKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gIGlmICghc3VwcG9ydHNCaW5hcnkpIHtcbiAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQocGFja2V0LCBjYWxsYmFjayk7XG4gIH1cblxuICBpZiAoZG9udFNlbmRCbG9icykge1xuICAgIHJldHVybiBlbmNvZGVCbG9iQXNBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjayk7XG4gIH1cblxuICB2YXIgbGVuZ3RoID0gbmV3IFVpbnQ4QXJyYXkoMSk7XG4gIGxlbmd0aFswXSA9IHBhY2tldHNbcGFja2V0LnR5cGVdO1xuICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtsZW5ndGguYnVmZmVyLCBwYWNrZXQuZGF0YV0pO1xuXG4gIHJldHVybiBjYWxsYmFjayhibG9iKTtcbn1cblxuLyoqXG4gKiBFbmNvZGVzIGEgcGFja2V0IHdpdGggYmluYXJ5IGRhdGEgaW4gYSBiYXNlNjQgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCwgaGFzIGB0eXBlYCBhbmQgYGRhdGFgXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGJhc2U2NCBlbmNvZGVkIG1lc3NhZ2VcbiAqL1xuXG5leHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldCA9IGZ1bmN0aW9uKHBhY2tldCwgY2FsbGJhY2spIHtcbiAgdmFyIG1lc3NhZ2UgPSAnYicgKyBleHBvcnRzLnBhY2tldHNbcGFja2V0LnR5cGVdO1xuICBpZiAodHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIHBhY2tldC5kYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgIHZhciBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgZnIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYjY0ID0gZnIucmVzdWx0LnNwbGl0KCcsJylbMV07XG4gICAgICBjYWxsYmFjayhtZXNzYWdlICsgYjY0KTtcbiAgICB9O1xuICAgIHJldHVybiBmci5yZWFkQXNEYXRhVVJMKHBhY2tldC5kYXRhKTtcbiAgfVxuXG4gIHZhciBiNjRkYXRhO1xuICB0cnkge1xuICAgIGI2NGRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KHBhY2tldC5kYXRhKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBpUGhvbmUgU2FmYXJpIGRvZXNuJ3QgbGV0IHlvdSBhcHBseSB3aXRoIHR5cGVkIGFycmF5c1xuICAgIHZhciB0eXBlZCA9IG5ldyBVaW50OEFycmF5KHBhY2tldC5kYXRhKTtcbiAgICB2YXIgYmFzaWMgPSBuZXcgQXJyYXkodHlwZWQubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICBiYXNpY1tpXSA9IHR5cGVkW2ldO1xuICAgIH1cbiAgICBiNjRkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBiYXNpYyk7XG4gIH1cbiAgbWVzc2FnZSArPSBidG9hKGI2NGRhdGEpO1xuICByZXR1cm4gY2FsbGJhY2sobWVzc2FnZSk7XG59O1xuXG4vKipcbiAqIERlY29kZXMgYSBwYWNrZXQuIENoYW5nZXMgZm9ybWF0IHRvIEJsb2IgaWYgcmVxdWVzdGVkLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBgdHlwZWAgYW5kIGBkYXRhYCAoaWYgYW55KVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5kZWNvZGVQYWNrZXQgPSBmdW5jdGlvbiAoZGF0YSwgYmluYXJ5VHlwZSwgdXRmOGRlY29kZSkge1xuICBpZiAoZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGVycjtcbiAgfVxuICAvLyBTdHJpbmcgZGF0YVxuICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKGRhdGEuY2hhckF0KDApID09PSAnYicpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmRlY29kZUJhc2U2NFBhY2tldChkYXRhLnN1YnN0cigxKSwgYmluYXJ5VHlwZSk7XG4gICAgfVxuXG4gICAgaWYgKHV0ZjhkZWNvZGUpIHtcbiAgICAgIGRhdGEgPSB0cnlEZWNvZGUoZGF0YSk7XG4gICAgICBpZiAoZGF0YSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHR5cGUgPSBkYXRhLmNoYXJBdCgwKTtcblxuICAgIGlmIChOdW1iZXIodHlwZSkgIT0gdHlwZSB8fCAhcGFja2V0c2xpc3RbdHlwZV0pIHtcbiAgICAgIHJldHVybiBlcnI7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEubGVuZ3RoID4gMSkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogcGFja2V0c2xpc3RbdHlwZV0sIGRhdGE6IGRhdGEuc3Vic3RyaW5nKDEpIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IHBhY2tldHNsaXN0W3R5cGVdIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIGFzQXJyYXkgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgdmFyIHR5cGUgPSBhc0FycmF5WzBdO1xuICB2YXIgcmVzdCA9IHNsaWNlQnVmZmVyKGRhdGEsIDEpO1xuICBpZiAoQmxvYiAmJiBiaW5hcnlUeXBlID09PSAnYmxvYicpIHtcbiAgICByZXN0ID0gbmV3IEJsb2IoW3Jlc3RdKTtcbiAgfVxuICByZXR1cm4geyB0eXBlOiBwYWNrZXRzbGlzdFt0eXBlXSwgZGF0YTogcmVzdCB9O1xufTtcblxuZnVuY3Rpb24gdHJ5RGVjb2RlKGRhdGEpIHtcbiAgdHJ5IHtcbiAgICBkYXRhID0gdXRmOC5kZWNvZGUoZGF0YSwgeyBzdHJpY3Q6IGZhbHNlIH0pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIERlY29kZXMgYSBwYWNrZXQgZW5jb2RlZCBpbiBhIGJhc2U2NCBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYmFzZTY0IGVuY29kZWQgbWVzc2FnZVxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGB0eXBlYCBhbmQgYGRhdGFgIChpZiBhbnkpXG4gKi9cblxuZXhwb3J0cy5kZWNvZGVCYXNlNjRQYWNrZXQgPSBmdW5jdGlvbihtc2csIGJpbmFyeVR5cGUpIHtcbiAgdmFyIHR5cGUgPSBwYWNrZXRzbGlzdFttc2cuY2hhckF0KDApXTtcbiAgaWYgKCFiYXNlNjRlbmNvZGVyKSB7XG4gICAgcmV0dXJuIHsgdHlwZTogdHlwZSwgZGF0YTogeyBiYXNlNjQ6IHRydWUsIGRhdGE6IG1zZy5zdWJzdHIoMSkgfSB9O1xuICB9XG5cbiAgdmFyIGRhdGEgPSBiYXNlNjRlbmNvZGVyLmRlY29kZShtc2cuc3Vic3RyKDEpKTtcblxuICBpZiAoYmluYXJ5VHlwZSA9PT0gJ2Jsb2InICYmIEJsb2IpIHtcbiAgICBkYXRhID0gbmV3IEJsb2IoW2RhdGFdKTtcbiAgfVxuXG4gIHJldHVybiB7IHR5cGU6IHR5cGUsIGRhdGE6IGRhdGEgfTtcbn07XG5cbi8qKlxuICogRW5jb2RlcyBtdWx0aXBsZSBtZXNzYWdlcyAocGF5bG9hZCkuXG4gKlxuICogICAgIDxsZW5ndGg+OmRhdGFcbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAxMTpoZWxsbyB3b3JsZDI6aGlcbiAqXG4gKiBJZiBhbnkgY29udGVudHMgYXJlIGJpbmFyeSwgdGhleSB3aWxsIGJlIGVuY29kZWQgYXMgYmFzZTY0IHN0cmluZ3MuIEJhc2U2NFxuICogZW5jb2RlZCBzdHJpbmdzIGFyZSBtYXJrZWQgd2l0aCBhIGIgYmVmb3JlIHRoZSBsZW5ndGggc3BlY2lmaWVyXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKHBhY2tldHMsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIHN1cHBvcnRzQmluYXJ5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBzdXBwb3J0c0JpbmFyeTtcbiAgICBzdXBwb3J0c0JpbmFyeSA9IG51bGw7XG4gIH1cblxuICB2YXIgaXNCaW5hcnkgPSBoYXNCaW5hcnkocGFja2V0cyk7XG5cbiAgaWYgKHN1cHBvcnRzQmluYXJ5ICYmIGlzQmluYXJ5KSB7XG4gICAgaWYgKEJsb2IgJiYgIWRvbnRTZW5kQmxvYnMpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0Jsb2IocGFja2V0cywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIHJldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0FycmF5QnVmZmVyKHBhY2tldHMsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGlmICghcGFja2V0cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gY2FsbGJhY2soJzA6Jyk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRMZW5ndGhIZWFkZXIobWVzc2FnZSkge1xuICAgIHJldHVybiBtZXNzYWdlLmxlbmd0aCArICc6JyArIG1lc3NhZ2U7XG4gIH1cblxuICBmdW5jdGlvbiBlbmNvZGVPbmUocGFja2V0LCBkb25lQ2FsbGJhY2spIHtcbiAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsICFpc0JpbmFyeSA/IGZhbHNlIDogc3VwcG9ydHNCaW5hcnksIGZhbHNlLCBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBkb25lQ2FsbGJhY2sobnVsbCwgc2V0TGVuZ3RoSGVhZGVyKG1lc3NhZ2UpKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1hcChwYWNrZXRzLCBlbmNvZGVPbmUsIGZ1bmN0aW9uKGVyciwgcmVzdWx0cykge1xuICAgIHJldHVybiBjYWxsYmFjayhyZXN1bHRzLmpvaW4oJycpKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEFzeW5jIGFycmF5IG1hcCB1c2luZyBhZnRlclxuICovXG5cbmZ1bmN0aW9uIG1hcChhcnksIGVhY2gsIGRvbmUpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShhcnkubGVuZ3RoKTtcbiAgdmFyIG5leHQgPSBhZnRlcihhcnkubGVuZ3RoLCBkb25lKTtcblxuICB2YXIgZWFjaFdpdGhJbmRleCA9IGZ1bmN0aW9uKGksIGVsLCBjYikge1xuICAgIGVhY2goZWwsIGZ1bmN0aW9uKGVycm9yLCBtc2cpIHtcbiAgICAgIHJlc3VsdFtpXSA9IG1zZztcbiAgICAgIGNiKGVycm9yLCByZXN1bHQpO1xuICAgIH0pO1xuICB9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgZWFjaFdpdGhJbmRleChpLCBhcnlbaV0sIG5leHQpO1xuICB9XG59XG5cbi8qXG4gKiBEZWNvZGVzIGRhdGEgd2hlbiBhIHBheWxvYWQgaXMgbWF5YmUgZXhwZWN0ZWQuIFBvc3NpYmxlIGJpbmFyeSBjb250ZW50cyBhcmVcbiAqIGRlY29kZWQgZnJvbSB0aGVpciBiYXNlNjQgcmVwcmVzZW50YXRpb25cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZGF0YSwgY2FsbGJhY2sgbWV0aG9kXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uIChkYXRhLCBiaW5hcnlUeXBlLCBjYWxsYmFjaykge1xuICBpZiAodHlwZW9mIGRhdGEgIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuZGVjb2RlUGF5bG9hZEFzQmluYXJ5KGRhdGEsIGJpbmFyeVR5cGUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYmluYXJ5VHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNhbGxiYWNrID0gYmluYXJ5VHlwZTtcbiAgICBiaW5hcnlUeXBlID0gbnVsbDtcbiAgfVxuXG4gIHZhciBwYWNrZXQ7XG4gIGlmIChkYXRhID09PSAnJykge1xuICAgIC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgfVxuXG4gIHZhciBsZW5ndGggPSAnJywgbiwgbXNnO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgY2hyID0gZGF0YS5jaGFyQXQoaSk7XG5cbiAgICBpZiAoY2hyICE9PSAnOicpIHtcbiAgICAgIGxlbmd0aCArPSBjaHI7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAobGVuZ3RoID09PSAnJyB8fCAobGVuZ3RoICE9IChuID0gTnVtYmVyKGxlbmd0aCkpKSkge1xuICAgICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gICAgfVxuXG4gICAgbXNnID0gZGF0YS5zdWJzdHIoaSArIDEsIG4pO1xuXG4gICAgaWYgKGxlbmd0aCAhPSBtc2cubGVuZ3RoKSB7XG4gICAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICB9XG5cbiAgICBpZiAobXNnLmxlbmd0aCkge1xuICAgICAgcGFja2V0ID0gZXhwb3J0cy5kZWNvZGVQYWNrZXQobXNnLCBiaW5hcnlUeXBlLCBmYWxzZSk7XG5cbiAgICAgIGlmIChlcnIudHlwZSA9PT0gcGFja2V0LnR5cGUgJiYgZXJyLmRhdGEgPT09IHBhY2tldC5kYXRhKSB7XG4gICAgICAgIC8vIHBhcnNlciBlcnJvciBpbiBpbmRpdmlkdWFsIHBhY2tldCAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gICAgICB9XG5cbiAgICAgIHZhciByZXQgPSBjYWxsYmFjayhwYWNrZXQsIGkgKyBuLCBsKTtcbiAgICAgIGlmIChmYWxzZSA9PT0gcmV0KSByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gYWR2YW5jZSBjdXJzb3JcbiAgICBpICs9IG47XG4gICAgbGVuZ3RoID0gJyc7XG4gIH1cblxuICBpZiAobGVuZ3RoICE9PSAnJykge1xuICAgIC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgfVxuXG59O1xuXG4vKipcbiAqIEVuY29kZXMgbXVsdGlwbGUgbWVzc2FnZXMgKHBheWxvYWQpIGFzIGJpbmFyeS5cbiAqXG4gKiA8MSA9IGJpbmFyeSwgMCA9IHN0cmluZz48bnVtYmVyIGZyb20gMC05PjxudW1iZXIgZnJvbSAwLTk+Wy4uLl08bnVtYmVyXG4gKiAyNTU+PGRhdGE+XG4gKlxuICogRXhhbXBsZTpcbiAqIDEgMyAyNTUgMSAyIDMsIGlmIHRoZSBiaW5hcnkgY29udGVudHMgYXJlIGludGVycHJldGVkIGFzIDggYml0IGludGVnZXJzXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICogQHJldHVybiB7QXJyYXlCdWZmZXJ9IGVuY29kZWQgcGF5bG9hZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5lbmNvZGVQYXlsb2FkQXNBcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKHBhY2tldHMsIGNhbGxiYWNrKSB7XG4gIGlmICghcGFja2V0cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gY2FsbGJhY2sobmV3IEFycmF5QnVmZmVyKDApKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsIGRvbmVDYWxsYmFjaykge1xuICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCwgdHJ1ZSwgdHJ1ZSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgcmV0dXJuIGRvbmVDYWxsYmFjayhudWxsLCBkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIG1hcChwYWNrZXRzLCBlbmNvZGVPbmUsIGZ1bmN0aW9uKGVyciwgZW5jb2RlZFBhY2tldHMpIHtcbiAgICB2YXIgdG90YWxMZW5ndGggPSBlbmNvZGVkUGFja2V0cy5yZWR1Y2UoZnVuY3Rpb24oYWNjLCBwKSB7XG4gICAgICB2YXIgbGVuO1xuICAgICAgaWYgKHR5cGVvZiBwID09PSAnc3RyaW5nJyl7XG4gICAgICAgIGxlbiA9IHAubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0gcC5ieXRlTGVuZ3RoO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYyArIGxlbi50b1N0cmluZygpLmxlbmd0aCArIGxlbiArIDI7IC8vIHN0cmluZy9iaW5hcnkgaWRlbnRpZmllciArIHNlcGFyYXRvciA9IDJcbiAgICB9LCAwKTtcblxuICAgIHZhciByZXN1bHRBcnJheSA9IG5ldyBVaW50OEFycmF5KHRvdGFsTGVuZ3RoKTtcblxuICAgIHZhciBidWZmZXJJbmRleCA9IDA7XG4gICAgZW5jb2RlZFBhY2tldHMuZm9yRWFjaChmdW5jdGlvbihwKSB7XG4gICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgcCA9PT0gJ3N0cmluZyc7XG4gICAgICB2YXIgYWIgPSBwO1xuICAgICAgaWYgKGlzU3RyaW5nKSB7XG4gICAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkocC5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2aWV3W2ldID0gcC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIGFiID0gdmlldy5idWZmZXI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1N0cmluZykgeyAvLyBub3QgdHJ1ZSBiaW5hcnlcbiAgICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSAwO1xuICAgICAgfSBlbHNlIHsgLy8gdHJ1ZSBiaW5hcnlcbiAgICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSAxO1xuICAgICAgfVxuXG4gICAgICB2YXIgbGVuU3RyID0gYWIuYnl0ZUxlbmd0aC50b1N0cmluZygpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5TdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSBwYXJzZUludChsZW5TdHJbaV0pO1xuICAgICAgfVxuICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSAyNTU7XG5cbiAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gdmlld1tpXTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBjYWxsYmFjayhyZXN1bHRBcnJheS5idWZmZXIpO1xuICB9KTtcbn07XG5cbi8qKlxuICogRW5jb2RlIGFzIEJsb2JcbiAqL1xuXG5leHBvcnRzLmVuY29kZVBheWxvYWRBc0Jsb2IgPSBmdW5jdGlvbihwYWNrZXRzLCBjYWxsYmFjaykge1xuICBmdW5jdGlvbiBlbmNvZGVPbmUocGFja2V0LCBkb25lQ2FsbGJhY2spIHtcbiAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsIHRydWUsIHRydWUsIGZ1bmN0aW9uKGVuY29kZWQpIHtcbiAgICAgIHZhciBiaW5hcnlJZGVudGlmaWVyID0gbmV3IFVpbnQ4QXJyYXkoMSk7XG4gICAgICBiaW5hcnlJZGVudGlmaWVyWzBdID0gMTtcbiAgICAgIGlmICh0eXBlb2YgZW5jb2RlZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShlbmNvZGVkLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5jb2RlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZpZXdbaV0gPSBlbmNvZGVkLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH1cbiAgICAgICAgZW5jb2RlZCA9IHZpZXcuYnVmZmVyO1xuICAgICAgICBiaW5hcnlJZGVudGlmaWVyWzBdID0gMDtcbiAgICAgIH1cblxuICAgICAgdmFyIGxlbiA9IChlbmNvZGVkIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpXG4gICAgICAgID8gZW5jb2RlZC5ieXRlTGVuZ3RoXG4gICAgICAgIDogZW5jb2RlZC5zaXplO1xuXG4gICAgICB2YXIgbGVuU3RyID0gbGVuLnRvU3RyaW5nKCk7XG4gICAgICB2YXIgbGVuZ3RoQXJ5ID0gbmV3IFVpbnQ4QXJyYXkobGVuU3RyLmxlbmd0aCArIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5TdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGVuZ3RoQXJ5W2ldID0gcGFyc2VJbnQobGVuU3RyW2ldKTtcbiAgICAgIH1cbiAgICAgIGxlbmd0aEFyeVtsZW5TdHIubGVuZ3RoXSA9IDI1NTtcblxuICAgICAgaWYgKEJsb2IpIHtcbiAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbYmluYXJ5SWRlbnRpZmllci5idWZmZXIsIGxlbmd0aEFyeS5idWZmZXIsIGVuY29kZWRdKTtcbiAgICAgICAgZG9uZUNhbGxiYWNrKG51bGwsIGJsb2IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbWFwKHBhY2tldHMsIGVuY29kZU9uZSwgZnVuY3Rpb24oZXJyLCByZXN1bHRzKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBCbG9iKHJlc3VsdHMpKTtcbiAgfSk7XG59O1xuXG4vKlxuICogRGVjb2RlcyBkYXRhIHdoZW4gYSBwYXlsb2FkIGlzIG1heWJlIGV4cGVjdGVkLiBTdHJpbmdzIGFyZSBkZWNvZGVkIGJ5XG4gKiBpbnRlcnByZXRpbmcgZWFjaCBieXRlIGFzIGEga2V5IGNvZGUgZm9yIGVudHJpZXMgbWFya2VkIHRvIHN0YXJ0IHdpdGggMC4gU2VlXG4gKiBkZXNjcmlwdGlvbiBvZiBlbmNvZGVQYXlsb2FkQXNCaW5hcnlcbiAqXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBkYXRhLCBjYWxsYmFjayBtZXRob2RcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5kZWNvZGVQYXlsb2FkQXNCaW5hcnkgPSBmdW5jdGlvbiAoZGF0YSwgYmluYXJ5VHlwZSwgY2FsbGJhY2spIHtcbiAgaWYgKHR5cGVvZiBiaW5hcnlUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY2FsbGJhY2sgPSBiaW5hcnlUeXBlO1xuICAgIGJpbmFyeVR5cGUgPSBudWxsO1xuICB9XG5cbiAgdmFyIGJ1ZmZlclRhaWwgPSBkYXRhO1xuICB2YXIgYnVmZmVycyA9IFtdO1xuXG4gIHdoaWxlIChidWZmZXJUYWlsLmJ5dGVMZW5ndGggPiAwKSB7XG4gICAgdmFyIHRhaWxBcnJheSA9IG5ldyBVaW50OEFycmF5KGJ1ZmZlclRhaWwpO1xuICAgIHZhciBpc1N0cmluZyA9IHRhaWxBcnJheVswXSA9PT0gMDtcbiAgICB2YXIgbXNnTGVuZ3RoID0gJyc7XG5cbiAgICBmb3IgKHZhciBpID0gMTsgOyBpKyspIHtcbiAgICAgIGlmICh0YWlsQXJyYXlbaV0gPT09IDI1NSkgYnJlYWs7XG5cbiAgICAgIC8vIDMxMCA9IGNoYXIgbGVuZ3RoIG9mIE51bWJlci5NQVhfVkFMVUVcbiAgICAgIGlmIChtc2dMZW5ndGgubGVuZ3RoID4gMzEwKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgICAgfVxuXG4gICAgICBtc2dMZW5ndGggKz0gdGFpbEFycmF5W2ldO1xuICAgIH1cblxuICAgIGJ1ZmZlclRhaWwgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLCAyICsgbXNnTGVuZ3RoLmxlbmd0aCk7XG4gICAgbXNnTGVuZ3RoID0gcGFyc2VJbnQobXNnTGVuZ3RoKTtcblxuICAgIHZhciBtc2cgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLCAwLCBtc2dMZW5ndGgpO1xuICAgIGlmIChpc1N0cmluZykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbXNnID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheShtc2cpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaVBob25lIFNhZmFyaSBkb2Vzbid0IGxldCB5b3UgYXBwbHkgdG8gdHlwZWQgYXJyYXlzXG4gICAgICAgIHZhciB0eXBlZCA9IG5ldyBVaW50OEFycmF5KG1zZyk7XG4gICAgICAgIG1zZyA9ICcnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbXNnICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodHlwZWRbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgYnVmZmVycy5wdXNoKG1zZyk7XG4gICAgYnVmZmVyVGFpbCA9IHNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsIG1zZ0xlbmd0aCk7XG4gIH1cblxuICB2YXIgdG90YWwgPSBidWZmZXJzLmxlbmd0aDtcbiAgYnVmZmVycy5mb3JFYWNoKGZ1bmN0aW9uKGJ1ZmZlciwgaSkge1xuICAgIGNhbGxiYWNrKGV4cG9ydHMuZGVjb2RlUGFja2V0KGJ1ZmZlciwgYmluYXJ5VHlwZSwgdHJ1ZSksIGksIHRvdGFsKTtcbiAgfSk7XG59O1xuIiwiLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGVidWcnKTtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lXG4gICAgICAgICAgICAgICAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgID8gY2hyb21lLnN0b3JhZ2UubG9jYWxcbiAgICAgICAgICAgICAgICAgIDogbG9jYWxzdG9yYWdlKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuICAnIzAwMDBDQycsICcjMDAwMEZGJywgJyMwMDMzQ0MnLCAnIzAwMzNGRicsICcjMDA2NkNDJywgJyMwMDY2RkYnLCAnIzAwOTlDQycsXG4gICcjMDA5OUZGJywgJyMwMENDMDAnLCAnIzAwQ0MzMycsICcjMDBDQzY2JywgJyMwMENDOTknLCAnIzAwQ0NDQycsICcjMDBDQ0ZGJyxcbiAgJyMzMzAwQ0MnLCAnIzMzMDBGRicsICcjMzMzM0NDJywgJyMzMzMzRkYnLCAnIzMzNjZDQycsICcjMzM2NkZGJywgJyMzMzk5Q0MnLFxuICAnIzMzOTlGRicsICcjMzNDQzAwJywgJyMzM0NDMzMnLCAnIzMzQ0M2NicsICcjMzNDQzk5JywgJyMzM0NDQ0MnLCAnIzMzQ0NGRicsXG4gICcjNjYwMENDJywgJyM2NjAwRkYnLCAnIzY2MzNDQycsICcjNjYzM0ZGJywgJyM2NkNDMDAnLCAnIzY2Q0MzMycsICcjOTkwMENDJyxcbiAgJyM5OTAwRkYnLCAnIzk5MzNDQycsICcjOTkzM0ZGJywgJyM5OUNDMDAnLCAnIzk5Q0MzMycsICcjQ0MwMDAwJywgJyNDQzAwMzMnLFxuICAnI0NDMDA2NicsICcjQ0MwMDk5JywgJyNDQzAwQ0MnLCAnI0NDMDBGRicsICcjQ0MzMzAwJywgJyNDQzMzMzMnLCAnI0NDMzM2NicsXG4gICcjQ0MzMzk5JywgJyNDQzMzQ0MnLCAnI0NDMzNGRicsICcjQ0M2NjAwJywgJyNDQzY2MzMnLCAnI0NDOTkwMCcsICcjQ0M5OTMzJyxcbiAgJyNDQ0NDMDAnLCAnI0NDQ0MzMycsICcjRkYwMDAwJywgJyNGRjAwMzMnLCAnI0ZGMDA2NicsICcjRkYwMDk5JywgJyNGRjAwQ0MnLFxuICAnI0ZGMDBGRicsICcjRkYzMzAwJywgJyNGRjMzMzMnLCAnI0ZGMzM2NicsICcjRkYzMzk5JywgJyNGRjMzQ0MnLCAnI0ZGMzNGRicsXG4gICcjRkY2NjAwJywgJyNGRjY2MzMnLCAnI0ZGOTkwMCcsICcjRkY5OTMzJywgJyNGRkNDMDAnLCAnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC8oZWRnZXx0cmlkZW50KVxcLyhcXGQrKS8pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cbiIsIi8qKlxyXG4gKiBDb21waWxlcyBhIHF1ZXJ5c3RyaW5nXHJcbiAqIFJldHVybnMgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmV4cG9ydHMuZW5jb2RlID0gZnVuY3Rpb24gKG9iaikge1xyXG4gIHZhciBzdHIgPSAnJztcclxuXHJcbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcclxuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgaWYgKHN0ci5sZW5ndGgpIHN0ciArPSAnJic7XHJcbiAgICAgIHN0ciArPSBlbmNvZGVVUklDb21wb25lbnQoaSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2ldKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBzdHI7XHJcbn07XHJcblxyXG4vKipcclxuICogUGFyc2VzIGEgc2ltcGxlIHF1ZXJ5c3RyaW5nIGludG8gYW4gb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBxc1xyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG5leHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uKHFzKXtcclxuICB2YXIgcXJ5ID0ge307XHJcbiAgdmFyIHBhaXJzID0gcXMuc3BsaXQoJyYnKTtcclxuICBmb3IgKHZhciBpID0gMCwgbCA9IHBhaXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgdmFyIHBhaXIgPSBwYWlyc1tpXS5zcGxpdCgnPScpO1xyXG4gICAgcXJ5W2RlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XHJcbiAgfVxyXG4gIHJldHVybiBxcnk7XHJcbn07XHJcbiIsIlxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhLCBiKXtcbiAgdmFyIGZuID0gZnVuY3Rpb24oKXt9O1xuICBmbi5wcm90b3R5cGUgPSBiLnByb3RvdHlwZTtcbiAgYS5wcm90b3R5cGUgPSBuZXcgZm47XG4gIGEucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gYTtcbn07IiwiLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGVidWcnKTtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lXG4gICAgICAgICAgICAgICAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgID8gY2hyb21lLnN0b3JhZ2UubG9jYWxcbiAgICAgICAgICAgICAgICAgIDogbG9jYWxzdG9yYWdlKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuICAnIzAwMDBDQycsICcjMDAwMEZGJywgJyMwMDMzQ0MnLCAnIzAwMzNGRicsICcjMDA2NkNDJywgJyMwMDY2RkYnLCAnIzAwOTlDQycsXG4gICcjMDA5OUZGJywgJyMwMENDMDAnLCAnIzAwQ0MzMycsICcjMDBDQzY2JywgJyMwMENDOTknLCAnIzAwQ0NDQycsICcjMDBDQ0ZGJyxcbiAgJyMzMzAwQ0MnLCAnIzMzMDBGRicsICcjMzMzM0NDJywgJyMzMzMzRkYnLCAnIzMzNjZDQycsICcjMzM2NkZGJywgJyMzMzk5Q0MnLFxuICAnIzMzOTlGRicsICcjMzNDQzAwJywgJyMzM0NDMzMnLCAnIzMzQ0M2NicsICcjMzNDQzk5JywgJyMzM0NDQ0MnLCAnIzMzQ0NGRicsXG4gICcjNjYwMENDJywgJyM2NjAwRkYnLCAnIzY2MzNDQycsICcjNjYzM0ZGJywgJyM2NkNDMDAnLCAnIzY2Q0MzMycsICcjOTkwMENDJyxcbiAgJyM5OTAwRkYnLCAnIzk5MzNDQycsICcjOTkzM0ZGJywgJyM5OUNDMDAnLCAnIzk5Q0MzMycsICcjQ0MwMDAwJywgJyNDQzAwMzMnLFxuICAnI0NDMDA2NicsICcjQ0MwMDk5JywgJyNDQzAwQ0MnLCAnI0NDMDBGRicsICcjQ0MzMzAwJywgJyNDQzMzMzMnLCAnI0NDMzM2NicsXG4gICcjQ0MzMzk5JywgJyNDQzMzQ0MnLCAnI0NDMzNGRicsICcjQ0M2NjAwJywgJyNDQzY2MzMnLCAnI0NDOTkwMCcsICcjQ0M5OTMzJyxcbiAgJyNDQ0NDMDAnLCAnI0NDQ0MzMycsICcjRkYwMDAwJywgJyNGRjAwMzMnLCAnI0ZGMDA2NicsICcjRkYwMDk5JywgJyNGRjAwQ0MnLFxuICAnI0ZGMDBGRicsICcjRkYzMzAwJywgJyNGRjMzMzMnLCAnI0ZGMzM2NicsICcjRkYzMzk5JywgJyNGRjMzQ0MnLCAnI0ZGMzNGRicsXG4gICcjRkY2NjAwJywgJyNGRjY2MzMnLCAnI0ZGOTkwMCcsICcjRkY5OTMzJywgJyNGRkNDMDAnLCAnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC8oZWRnZXx0cmlkZW50KVxcLyhcXGQrKS8pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcbiAqIEhlbHBlcnMuXG4gKi9cblxudmFyIHMgPSAxMDAwO1xudmFyIG0gPSBzICogNjA7XG52YXIgaCA9IG0gKiA2MDtcbnZhciBkID0gaCAqIDI0O1xudmFyIHkgPSBkICogMzY1LjI1O1xuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZhbCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsO1xuICBpZiAodHlwZSA9PT0gJ3N0cmluZycgJiYgdmFsLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gcGFyc2UodmFsKTtcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJyAmJiBpc05hTih2YWwpID09PSBmYWxzZSkge1xuICAgIHJldHVybiBvcHRpb25zLmxvbmcgPyBmbXRMb25nKHZhbCkgOiBmbXRTaG9ydCh2YWwpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAndmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSB2YWxpZCBudW1iZXIuIHZhbD0nICtcbiAgICAgIEpTT04uc3RyaW5naWZ5KHZhbClcbiAgKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHN0ci5sZW5ndGggPiAxMDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1hdGNoID0gL14oKD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhcbiAgICBzdHJcbiAgKTtcbiAgaWYgKCFtYXRjaCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd5ZWFycyc6XG4gICAgY2FzZSAneWVhcic6XG4gICAgY2FzZSAneXJzJzpcbiAgICBjYXNlICd5cic6XG4gICAgY2FzZSAneSc6XG4gICAgICByZXR1cm4gbiAqIHk7XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkJzpcbiAgICAgIHJldHVybiBuICogZDtcbiAgICBjYXNlICdob3Vycyc6XG4gICAgY2FzZSAnaG91cic6XG4gICAgY2FzZSAnaHJzJzpcbiAgICBjYXNlICdocic6XG4gICAgY2FzZSAnaCc6XG4gICAgICByZXR1cm4gbiAqIGg7XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW5zJzpcbiAgICBjYXNlICdtaW4nOlxuICAgIGNhc2UgJ20nOlxuICAgICAgcmV0dXJuIG4gKiBtO1xuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjcyc6XG4gICAgY2FzZSAnc2VjJzpcbiAgICBjYXNlICdzJzpcbiAgICAgIHJldHVybiBuICogcztcbiAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgIGNhc2UgJ21pbGxpc2Vjb25kJzpcbiAgICBjYXNlICdtc2Vjcyc6XG4gICAgY2FzZSAnbXNlYyc6XG4gICAgY2FzZSAnbXMnOlxuICAgICAgcmV0dXJuIG47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG9ydCBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRTaG9ydChtcykge1xuICBpZiAobXMgPj0gZCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gIH1cbiAgaWYgKG1zID49IGgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICB9XG4gIGlmIChtcyA+PSBtKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBtKSArICdtJztcbiAgfVxuICBpZiAobXMgPj0gcykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gIH1cbiAgcmV0dXJuIG1zICsgJ21zJztcbn1cblxuLyoqXG4gKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGZtdExvbmcobXMpIHtcbiAgcmV0dXJuIHBsdXJhbChtcywgZCwgJ2RheScpIHx8XG4gICAgcGx1cmFsKG1zLCBoLCAnaG91cicpIHx8XG4gICAgcGx1cmFsKG1zLCBtLCAnbWludXRlJykgfHxcbiAgICBwbHVyYWwobXMsIHMsICdzZWNvbmQnKSB8fFxuICAgIG1zICsgJyBtcyc7XG59XG5cbi8qKlxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXG4gKi9cblxuZnVuY3Rpb24gcGx1cmFsKG1zLCBuLCBuYW1lKSB7XG4gIGlmIChtcyA8IG4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKG1zIDwgbiAqIDEuNSkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG1zIC8gbikgKyAnICcgKyBuYW1lO1xuICB9XG4gIHJldHVybiBNYXRoLmNlaWwobXMgLyBuKSArICcgJyArIG5hbWUgKyAncyc7XG59XG4iLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG52YXIgYmluYXJ5ID0gcmVxdWlyZSgnLi9iaW5hcnknKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpO1xudmFyIGlzQnVmID0gcmVxdWlyZSgnLi9pcy1idWZmZXInKTtcblxuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5wcm90b2NvbCA9IDQ7XG5cbi8qKlxuICogUGFja2V0IHR5cGVzLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy50eXBlcyA9IFtcbiAgJ0NPTk5FQ1QnLFxuICAnRElTQ09OTkVDVCcsXG4gICdFVkVOVCcsXG4gICdBQ0snLFxuICAnRVJST1InLFxuICAnQklOQVJZX0VWRU5UJyxcbiAgJ0JJTkFSWV9BQ0snXG5dO1xuXG4vKipcbiAqIFBhY2tldCB0eXBlIGBjb25uZWN0YC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuQ09OTkVDVCA9IDA7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGRpc2Nvbm5lY3RgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5ESVNDT05ORUNUID0gMTtcblxuLyoqXG4gKiBQYWNrZXQgdHlwZSBgZXZlbnRgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5FVkVOVCA9IDI7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGFja2AuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkFDSyA9IDM7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGVycm9yYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuRVJST1IgPSA0O1xuXG4vKipcbiAqIFBhY2tldCB0eXBlICdiaW5hcnkgZXZlbnQnXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkJJTkFSWV9FVkVOVCA9IDU7XG5cbi8qKlxuICogUGFja2V0IHR5cGUgYGJpbmFyeSBhY2tgLiBGb3IgYWNrcyB3aXRoIGJpbmFyeSBhcmd1bWVudHMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkJJTkFSWV9BQ0sgPSA2O1xuXG4vKipcbiAqIEVuY29kZXIgY29uc3RydWN0b3IuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkVuY29kZXIgPSBFbmNvZGVyO1xuXG4vKipcbiAqIERlY29kZXIgY29uc3RydWN0b3IuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLkRlY29kZXIgPSBEZWNvZGVyO1xuXG4vKipcbiAqIEEgc29ja2V0LmlvIEVuY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIEVuY29kZXIoKSB7fVxuXG52YXIgRVJST1JfUEFDS0VUID0gZXhwb3J0cy5FUlJPUiArICdcImVuY29kZSBlcnJvclwiJztcblxuLyoqXG4gKiBFbmNvZGUgYSBwYWNrZXQgYXMgYSBzaW5nbGUgc3RyaW5nIGlmIG5vbi1iaW5hcnksIG9yIGFzIGFcbiAqIGJ1ZmZlciBzZXF1ZW5jZSwgZGVwZW5kaW5nIG9uIHBhY2tldCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBwYWNrZXQgb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIGZ1bmN0aW9uIHRvIGhhbmRsZSBlbmNvZGluZ3MgKGxpa2VseSBlbmdpbmUud3JpdGUpXG4gKiBAcmV0dXJuIENhbGxzIGNhbGxiYWNrIHdpdGggQXJyYXkgb2YgZW5jb2RpbmdzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVuY29kZXIucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uKG9iaiwgY2FsbGJhY2spe1xuICBkZWJ1ZygnZW5jb2RpbmcgcGFja2V0ICVqJywgb2JqKTtcblxuICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT09IG9iai50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PT0gb2JqLnR5cGUpIHtcbiAgICBlbmNvZGVBc0JpbmFyeShvYmosIGNhbGxiYWNrKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgZW5jb2RpbmcgPSBlbmNvZGVBc1N0cmluZyhvYmopO1xuICAgIGNhbGxiYWNrKFtlbmNvZGluZ10pO1xuICB9XG59O1xuXG4vKipcbiAqIEVuY29kZSBwYWNrZXQgYXMgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge1N0cmluZ30gZW5jb2RlZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZW5jb2RlQXNTdHJpbmcob2JqKSB7XG5cbiAgLy8gZmlyc3QgaXMgdHlwZVxuICB2YXIgc3RyID0gJycgKyBvYmoudHlwZTtcblxuICAvLyBhdHRhY2htZW50cyBpZiB3ZSBoYXZlIHRoZW1cbiAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09PSBvYmoudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT09IG9iai50eXBlKSB7XG4gICAgc3RyICs9IG9iai5hdHRhY2htZW50cyArICctJztcbiAgfVxuXG4gIC8vIGlmIHdlIGhhdmUgYSBuYW1lc3BhY2Ugb3RoZXIgdGhhbiBgL2BcbiAgLy8gd2UgYXBwZW5kIGl0IGZvbGxvd2VkIGJ5IGEgY29tbWEgYCxgXG4gIGlmIChvYmoubnNwICYmICcvJyAhPT0gb2JqLm5zcCkge1xuICAgIHN0ciArPSBvYmoubnNwICsgJywnO1xuICB9XG5cbiAgLy8gaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgdGhlIGlkXG4gIGlmIChudWxsICE9IG9iai5pZCkge1xuICAgIHN0ciArPSBvYmouaWQ7XG4gIH1cblxuICAvLyBqc29uIGRhdGFcbiAgaWYgKG51bGwgIT0gb2JqLmRhdGEpIHtcbiAgICB2YXIgcGF5bG9hZCA9IHRyeVN0cmluZ2lmeShvYmouZGF0YSk7XG4gICAgaWYgKHBheWxvYWQgIT09IGZhbHNlKSB7XG4gICAgICBzdHIgKz0gcGF5bG9hZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEVSUk9SX1BBQ0tFVDtcbiAgICB9XG4gIH1cblxuICBkZWJ1ZygnZW5jb2RlZCAlaiBhcyAlcycsIG9iaiwgc3RyKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuZnVuY3Rpb24gdHJ5U3RyaW5naWZ5KHN0cikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShzdHIpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEVuY29kZSBwYWNrZXQgYXMgJ2J1ZmZlciBzZXF1ZW5jZScgYnkgcmVtb3ZpbmcgYmxvYnMsIGFuZFxuICogZGVjb25zdHJ1Y3RpbmcgcGFja2V0IGludG8gb2JqZWN0IHdpdGggcGxhY2Vob2xkZXJzIGFuZFxuICogYSBsaXN0IG9mIGJ1ZmZlcnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7QnVmZmVyfSBlbmNvZGVkXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBlbmNvZGVBc0JpbmFyeShvYmosIGNhbGxiYWNrKSB7XG5cbiAgZnVuY3Rpb24gd3JpdGVFbmNvZGluZyhibG9ibGVzc0RhdGEpIHtcbiAgICB2YXIgZGVjb25zdHJ1Y3Rpb24gPSBiaW5hcnkuZGVjb25zdHJ1Y3RQYWNrZXQoYmxvYmxlc3NEYXRhKTtcbiAgICB2YXIgcGFjayA9IGVuY29kZUFzU3RyaW5nKGRlY29uc3RydWN0aW9uLnBhY2tldCk7XG4gICAgdmFyIGJ1ZmZlcnMgPSBkZWNvbnN0cnVjdGlvbi5idWZmZXJzO1xuXG4gICAgYnVmZmVycy51bnNoaWZ0KHBhY2spOyAvLyBhZGQgcGFja2V0IGluZm8gdG8gYmVnaW5uaW5nIG9mIGRhdGEgbGlzdFxuICAgIGNhbGxiYWNrKGJ1ZmZlcnMpOyAvLyB3cml0ZSBhbGwgdGhlIGJ1ZmZlcnNcbiAgfVxuXG4gIGJpbmFyeS5yZW1vdmVCbG9icyhvYmosIHdyaXRlRW5jb2RpbmcpO1xufVxuXG4vKipcbiAqIEEgc29ja2V0LmlvIERlY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlY29kZXJcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRGVjb2RlcigpIHtcbiAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbn1cblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgIHdpdGggRGVjb2Rlci5cbiAqL1xuXG5FbWl0dGVyKERlY29kZXIucHJvdG90eXBlKTtcblxuLyoqXG4gKiBEZWNvZGVzIGFuIGVuY29kZWQgcGFja2V0IHN0cmluZyBpbnRvIHBhY2tldCBKU09OLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmogLSBlbmNvZGVkIHBhY2tldFxuICogQHJldHVybiB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRGVjb2Rlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24ob2JqKSB7XG4gIHZhciBwYWNrZXQ7XG4gIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgIHBhY2tldCA9IGRlY29kZVN0cmluZyhvYmopO1xuICAgIGlmIChleHBvcnRzLkJJTkFSWV9FVkVOVCA9PT0gcGFja2V0LnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09PSBwYWNrZXQudHlwZSkgeyAvLyBiaW5hcnkgcGFja2V0J3MganNvblxuICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbmV3IEJpbmFyeVJlY29uc3RydWN0b3IocGFja2V0KTtcblxuICAgICAgLy8gbm8gYXR0YWNobWVudHMsIGxhYmVsZWQgYmluYXJ5IGJ1dCBubyBiaW5hcnkgZGF0YSB0byBmb2xsb3dcbiAgICAgIGlmICh0aGlzLnJlY29uc3RydWN0b3IucmVjb25QYWNrLmF0dGFjaG1lbnRzID09PSAwKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVjb2RlZCcsIHBhY2tldCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHsgLy8gbm9uLWJpbmFyeSBmdWxsIHBhY2tldFxuICAgICAgdGhpcy5lbWl0KCdkZWNvZGVkJywgcGFja2V0KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNCdWYob2JqKSB8fCBvYmouYmFzZTY0KSB7IC8vIHJhdyBiaW5hcnkgZGF0YVxuICAgIGlmICghdGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dvdCBiaW5hcnkgZGF0YSB3aGVuIG5vdCByZWNvbnN0cnVjdGluZyBhIHBhY2tldCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYWNrZXQgPSB0aGlzLnJlY29uc3RydWN0b3IudGFrZUJpbmFyeURhdGEob2JqKTtcbiAgICAgIGlmIChwYWNrZXQpIHsgLy8gcmVjZWl2ZWQgZmluYWwgYnVmZmVyXG4gICAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVjb2RlZCcsIHBhY2tldCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlOiAnICsgb2JqKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZWNvZGUgYSBwYWNrZXQgU3RyaW5nIChKU09OIGRhdGEpXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGRlY29kZVN0cmluZyhzdHIpIHtcbiAgdmFyIGkgPSAwO1xuICAvLyBsb29rIHVwIHR5cGVcbiAgdmFyIHAgPSB7XG4gICAgdHlwZTogTnVtYmVyKHN0ci5jaGFyQXQoMCkpXG4gIH07XG5cbiAgaWYgKG51bGwgPT0gZXhwb3J0cy50eXBlc1twLnR5cGVdKSB7XG4gICAgcmV0dXJuIGVycm9yKCd1bmtub3duIHBhY2tldCB0eXBlICcgKyBwLnR5cGUpO1xuICB9XG5cbiAgLy8gbG9vayB1cCBhdHRhY2htZW50cyBpZiB0eXBlIGJpbmFyeVxuICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT09IHAudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT09IHAudHlwZSkge1xuICAgIHZhciBidWYgPSAnJztcbiAgICB3aGlsZSAoc3RyLmNoYXJBdCgrK2kpICE9PSAnLScpIHtcbiAgICAgIGJ1ZiArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgaWYgKGkgPT0gc3RyLmxlbmd0aCkgYnJlYWs7XG4gICAgfVxuICAgIGlmIChidWYgIT0gTnVtYmVyKGJ1ZikgfHwgc3RyLmNoYXJBdChpKSAhPT0gJy0nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgYXR0YWNobWVudHMnKTtcbiAgICB9XG4gICAgcC5hdHRhY2htZW50cyA9IE51bWJlcihidWYpO1xuICB9XG5cbiAgLy8gbG9vayB1cCBuYW1lc3BhY2UgKGlmIGFueSlcbiAgaWYgKCcvJyA9PT0gc3RyLmNoYXJBdChpICsgMSkpIHtcbiAgICBwLm5zcCA9ICcnO1xuICAgIHdoaWxlICgrK2kpIHtcbiAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgIGlmICgnLCcgPT09IGMpIGJyZWFrO1xuICAgICAgcC5uc3AgKz0gYztcbiAgICAgIGlmIChpID09PSBzdHIubGVuZ3RoKSBicmVhaztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcC5uc3AgPSAnLyc7XG4gIH1cblxuICAvLyBsb29rIHVwIGlkXG4gIHZhciBuZXh0ID0gc3RyLmNoYXJBdChpICsgMSk7XG4gIGlmICgnJyAhPT0gbmV4dCAmJiBOdW1iZXIobmV4dCkgPT0gbmV4dCkge1xuICAgIHAuaWQgPSAnJztcbiAgICB3aGlsZSAoKytpKSB7XG4gICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICBpZiAobnVsbCA9PSBjIHx8IE51bWJlcihjKSAhPSBjKSB7XG4gICAgICAgIC0taTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBwLmlkICs9IHN0ci5jaGFyQXQoaSk7XG4gICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aCkgYnJlYWs7XG4gICAgfVxuICAgIHAuaWQgPSBOdW1iZXIocC5pZCk7XG4gIH1cblxuICAvLyBsb29rIHVwIGpzb24gZGF0YVxuICBpZiAoc3RyLmNoYXJBdCgrK2kpKSB7XG4gICAgdmFyIHBheWxvYWQgPSB0cnlQYXJzZShzdHIuc3Vic3RyKGkpKTtcbiAgICB2YXIgaXNQYXlsb2FkVmFsaWQgPSBwYXlsb2FkICE9PSBmYWxzZSAmJiAocC50eXBlID09PSBleHBvcnRzLkVSUk9SIHx8IGlzQXJyYXkocGF5bG9hZCkpO1xuICAgIGlmIChpc1BheWxvYWRWYWxpZCkge1xuICAgICAgcC5kYXRhID0gcGF5bG9hZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVycm9yKCdpbnZhbGlkIHBheWxvYWQnKTtcbiAgICB9XG4gIH1cblxuICBkZWJ1ZygnZGVjb2RlZCAlcyBhcyAlaicsIHN0ciwgcCk7XG4gIHJldHVybiBwO1xufVxuXG5mdW5jdGlvbiB0cnlQYXJzZShzdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShzdHIpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIERlYWxsb2NhdGVzIGEgcGFyc2VyJ3MgcmVzb3VyY2VzXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5EZWNvZGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICB0aGlzLnJlY29uc3RydWN0b3IuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO1xuICB9XG59O1xuXG4vKipcbiAqIEEgbWFuYWdlciBvZiBhIGJpbmFyeSBldmVudCdzICdidWZmZXIgc2VxdWVuY2UnLiBTaG91bGRcbiAqIGJlIGNvbnN0cnVjdGVkIHdoZW5ldmVyIGEgcGFja2V0IG9mIHR5cGUgQklOQVJZX0VWRU5UIGlzXG4gKiBkZWNvZGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge0JpbmFyeVJlY29uc3RydWN0b3J9IGluaXRpYWxpemVkIHJlY29uc3RydWN0b3JcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIEJpbmFyeVJlY29uc3RydWN0b3IocGFja2V0KSB7XG4gIHRoaXMucmVjb25QYWNrID0gcGFja2V0O1xuICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gYmluYXJ5IGRhdGEgcmVjZWl2ZWQgZnJvbSBjb25uZWN0aW9uXG4gKiBhZnRlciBhIEJJTkFSWV9FVkVOVCBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtCdWZmZXIgfCBBcnJheUJ1ZmZlcn0gYmluRGF0YSAtIHRoZSByYXcgYmluYXJ5IGRhdGEgcmVjZWl2ZWRcbiAqIEByZXR1cm4ge251bGwgfCBPYmplY3R9IHJldHVybnMgbnVsbCBpZiBtb3JlIGJpbmFyeSBkYXRhIGlzIGV4cGVjdGVkIG9yXG4gKiAgIGEgcmVjb25zdHJ1Y3RlZCBwYWNrZXQgb2JqZWN0IGlmIGFsbCBidWZmZXJzIGhhdmUgYmVlbiByZWNlaXZlZC5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkJpbmFyeVJlY29uc3RydWN0b3IucHJvdG90eXBlLnRha2VCaW5hcnlEYXRhID0gZnVuY3Rpb24oYmluRGF0YSkge1xuICB0aGlzLmJ1ZmZlcnMucHVzaChiaW5EYXRhKTtcbiAgaWYgKHRoaXMuYnVmZmVycy5sZW5ndGggPT09IHRoaXMucmVjb25QYWNrLmF0dGFjaG1lbnRzKSB7IC8vIGRvbmUgd2l0aCBidWZmZXIgbGlzdFxuICAgIHZhciBwYWNrZXQgPSBiaW5hcnkucmVjb25zdHJ1Y3RQYWNrZXQodGhpcy5yZWNvblBhY2ssIHRoaXMuYnVmZmVycyk7XG4gICAgdGhpcy5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7XG4gICAgcmV0dXJuIHBhY2tldDtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogQ2xlYW5zIHVwIGJpbmFyeSBwYWNrZXQgcmVjb25zdHJ1Y3Rpb24gdmFyaWFibGVzLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbkJpbmFyeVJlY29uc3RydWN0b3IucHJvdG90eXBlLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZWNvblBhY2sgPSBudWxsO1xuICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbn07XG5cbmZ1bmN0aW9uIGVycm9yKG1zZykge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IGV4cG9ydHMuRVJST1IsXG4gICAgZGF0YTogJ3BhcnNlciBlcnJvcjogJyArIG1zZ1xuICB9O1xufVxuIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogRHVlIHRvIHZhcmlvdXMgYnJvd3NlciBidWdzLCBzb21ldGltZXMgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIHVzZWQgZXZlblxuICogd2hlbiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMuXG4gKlxuICogTm90ZTpcbiAqXG4gKiAgIC0gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLFxuICogICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4LlxuICpcbiAqICAgLSBDaHJvbWUgOS0xMCBpcyBtaXNzaW5nIHRoZSBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uLlxuICpcbiAqICAgLSBJRTEwIGhhcyBhIGJyb2tlbiBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYXJyYXlzIG9mXG4gKiAgICAgaW5jb3JyZWN0IGxlbmd0aCBpbiBzb21lIHNpdHVhdGlvbnMuXG5cbiAqIFdlIGRldGVjdCB0aGVzZSBidWdneSBicm93c2VycyBhbmQgc2V0IGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGAgdG8gYGZhbHNlYCBzbyB0aGV5XG4gKiBnZXQgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaXMgc2xvd2VyIGJ1dCBiZWhhdmVzIGNvcnJlY3RseS5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVCAhPT0gdW5kZWZpbmVkXG4gID8gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgOiB0eXBlZEFycmF5U3VwcG9ydCgpXG5cbi8qXG4gKiBFeHBvcnQga01heExlbmd0aCBhZnRlciB0eXBlZCBhcnJheSBzdXBwb3J0IGlzIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydHMua01heExlbmd0aCA9IGtNYXhMZW5ndGgoKVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgYXJyLl9fcHJvdG9fXyA9IHtfX3Byb3RvX186IFVpbnQ4QXJyYXkucHJvdG90eXBlLCBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH19XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDIgJiYgLy8gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWRcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAmJiAvLyBjaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgICAgICAgYXJyLnN1YmFycmF5KDEsIDEpLmJ5dGVMZW5ndGggPT09IDAgLy8gaWUxMCBoYXMgYnJva2VuIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGtNYXhMZW5ndGggKCkge1xuICByZXR1cm4gQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgICA/IDB4N2ZmZmZmZmZcbiAgICA6IDB4M2ZmZmZmZmZcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyICh0aGF0LCBsZW5ndGgpIHtcbiAgaWYgKGtNYXhMZW5ndGgoKSA8IGxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHR5cGVkIGFycmF5IGxlbmd0aCcpXG4gIH1cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgaWYgKHRoYXQgPT09IG51bGwpIHtcbiAgICAgIHRoYXQgPSBuZXcgQnVmZmVyKGxlbmd0aClcbiAgICB9XG4gICAgdGhhdC5sZW5ndGggPSBsZW5ndGhcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmICEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKHRoaXMsIGFyZylcbiAgfVxuICByZXR1cm4gZnJvbSh0aGlzLCBhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbi8vIFRPRE86IExlZ2FjeSwgbm90IG5lZWRlZCBhbnltb3JlLiBSZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uLlxuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIGZyb20gKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICByZXR1cm4gZnJvbU9iamVjdCh0aGF0LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbShudWxsLCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5pZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuICBCdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICAgIC8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHRoYXQsIHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKG51bGwsIHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAodGhhdCwgc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nICh0aGF0LCBzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gdGhhdC53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgdGhhdCA9IHRoYXQuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoYXRbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAodGhhdCwgYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBhcnJheS5ieXRlTGVuZ3RoIC8vIHRoaXMgdGhyb3dzIGlmIGBhcnJheWAgaXMgbm90IGEgdmFsaWQgQXJyYXlCdWZmZXJcblxuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IGFycmF5XG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQgPSBmcm9tQXJyYXlMaWtlKHRoYXQsIGFycmF5KVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKHRoYXQsIG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbilcblxuICAgIGlmICh0aGF0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoYXRcbiAgICB9XG5cbiAgICBvYmouY29weSh0aGF0LCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIHRoYXRcbiAgfVxuXG4gIGlmIChvYmopIHtcbiAgICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fCAnbGVuZ3RoJyBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgaXNuYW4ob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCAwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqKVxuICAgIH1cblxuICAgIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iai5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwga01heExlbmd0aCgpYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IGtNYXhMZW5ndGgoKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBrTWF4TGVuZ3RoKCkudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFpc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH1cbiAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChBcnJheUJ1ZmZlci5pc1ZpZXcoc3RyaW5nKSB8fCBzdHJpbmcgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICB9XG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2Vyc2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCBhbmQgYGlzLWJ1ZmZlcmAgKGluIFNhZmFyaSA1LTcpIHRvIGRldGVjdFxuLy8gQnVmZmVyIGluc3RhbmNlcy5cbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIHZhciBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggfCAwXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5tYXRjaCgvLnsyfS9nKS5qb2luKCcgJylcbiAgICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgdmFyIHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIHZhciB5ID0gZW5kIC0gc3RhcnRcbiAgdmFyIGxlbiA9IE1hdGgubWluKHgsIHkpXG5cbiAgdmFyIHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIHZhciB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKGlzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiZcbiAgICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgWyB2YWwgXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgdmFyIGluZGV4U2l6ZSA9IDFcbiAgdmFyIGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgdmFyIHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGRpcikge1xuICAgIHZhciBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChpc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gbGF0aW4xV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggfCAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgLy8gbGVnYWN5IHdyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKSAtIHJlbW92ZSBpbiB2MC4xM1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gICAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyArK2kpIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoXG4gIHZhciBtdWwgPSAxXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCAyKTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgNCk7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gMFxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG4gIHZhciBpXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZyBjb3B5IGZyb20gZW5kXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlbiA8IDEwMDAgfHwgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gYXNjZW5kaW5nIGNvcHkgZnJvbSBzdGFydFxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICB2YXIgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoY29kZSA8IDI1Nikge1xuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYnl0ZXMgPSBCdWZmZXIuaXNCdWZmZXIodmFsKVxuICAgICAgPyB2YWxcbiAgICAgIDogdXRmOFRvQnl0ZXMobmV3IEJ1ZmZlcih2YWwsIGVuY29kaW5nKS50b1N0cmluZygpKVxuICAgIHZhciBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbnZhciBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXitcXC8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHJpbmd0cmltKHN0cikucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBpc25hbiAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZhbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuIiwiLy8gYnJvd3NlciBzaGltIGZvciB4bWxodHRwcmVxdWVzdCBtb2R1bGVcblxudmFyIGhhc0NPUlMgPSByZXF1aXJlKCdoYXMtY29ycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gIHZhciB4ZG9tYWluID0gb3B0cy54ZG9tYWluO1xuXG4gIC8vIHNjaGVtZSBtdXN0IGJlIHNhbWUgd2hlbiB1c2lnbiBYRG9tYWluUmVxdWVzdFxuICAvLyBodHRwOi8vYmxvZ3MubXNkbi5jb20vYi9pZWludGVybmFscy9hcmNoaXZlLzIwMTAvMDUvMTMveGRvbWFpbnJlcXVlc3QtcmVzdHJpY3Rpb25zLWxpbWl0YXRpb25zLWFuZC13b3JrYXJvdW5kcy5hc3B4XG4gIHZhciB4c2NoZW1lID0gb3B0cy54c2NoZW1lO1xuXG4gIC8vIFhEb21haW5SZXF1ZXN0IGhhcyBhIGZsb3cgb2Ygbm90IHNlbmRpbmcgY29va2llLCB0aGVyZWZvcmUgaXQgc2hvdWxkIGJlIGRpc2FibGVkIGFzIGEgZGVmYXVsdC5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0F1dG9tYXR0aWMvZW5naW5lLmlvLWNsaWVudC9wdWxsLzIxN1xuICB2YXIgZW5hYmxlc1hEUiA9IG9wdHMuZW5hYmxlc1hEUjtcblxuICAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbiAgdHJ5IHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAmJiAoIXhkb21haW4gfHwgaGFzQ09SUykpIHtcbiAgICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHsgfVxuXG4gIC8vIFVzZSBYRG9tYWluUmVxdWVzdCBmb3IgSUU4IGlmIGVuYWJsZXNYRFIgaXMgdHJ1ZVxuICAvLyBiZWNhdXNlIGxvYWRpbmcgYmFyIGtlZXBzIGZsYXNoaW5nIHdoZW4gdXNpbmcganNvbnAtcG9sbGluZ1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20veXVqaW9zYWthL3NvY2tlLmlvLWllOC1sb2FkaW5nLWV4YW1wbGVcbiAgdHJ5IHtcbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBYRG9tYWluUmVxdWVzdCAmJiAheHNjaGVtZSAmJiBlbmFibGVzWERSKSB7XG4gICAgICByZXR1cm4gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7IH1cblxuICBpZiAoIXhkb21haW4pIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIG5ldyBzZWxmW1snQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJyldKCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9XG59O1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBwYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBUcmFuc3BvcnQ7XG5cbi8qKlxuICogVHJhbnNwb3J0IGFic3RyYWN0IGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gVHJhbnNwb3J0IChvcHRzKSB7XG4gIHRoaXMucGF0aCA9IG9wdHMucGF0aDtcbiAgdGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWU7XG4gIHRoaXMucG9ydCA9IG9wdHMucG9ydDtcbiAgdGhpcy5zZWN1cmUgPSBvcHRzLnNlY3VyZTtcbiAgdGhpcy5xdWVyeSA9IG9wdHMucXVlcnk7XG4gIHRoaXMudGltZXN0YW1wUGFyYW0gPSBvcHRzLnRpbWVzdGFtcFBhcmFtO1xuICB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzID0gb3B0cy50aW1lc3RhbXBSZXF1ZXN0cztcbiAgdGhpcy5yZWFkeVN0YXRlID0gJyc7XG4gIHRoaXMuYWdlbnQgPSBvcHRzLmFnZW50IHx8IGZhbHNlO1xuICB0aGlzLnNvY2tldCA9IG9wdHMuc29ja2V0O1xuICB0aGlzLmVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIHRoaXMucGZ4ID0gb3B0cy5wZng7XG4gIHRoaXMua2V5ID0gb3B0cy5rZXk7XG4gIHRoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZTtcbiAgdGhpcy5jZXJ0ID0gb3B0cy5jZXJ0O1xuICB0aGlzLmNhID0gb3B0cy5jYTtcbiAgdGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzO1xuICB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCA9IG9wdHMucmVqZWN0VW5hdXRob3JpemVkO1xuICB0aGlzLmZvcmNlTm9kZSA9IG9wdHMuZm9yY2VOb2RlO1xuXG4gIC8vIHJlc3VsdHMgb2YgUmVhY3ROYXRpdmUgZW52aXJvbm1lbnQgZGV0ZWN0aW9uXG4gIHRoaXMuaXNSZWFjdE5hdGl2ZSA9IG9wdHMuaXNSZWFjdE5hdGl2ZTtcblxuICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO1xuICB0aGlzLmxvY2FsQWRkcmVzcyA9IG9wdHMubG9jYWxBZGRyZXNzO1xufVxuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihUcmFuc3BvcnQucHJvdG90eXBlKTtcblxuLyoqXG4gKiBFbWl0cyBhbiBlcnJvci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtUcmFuc3BvcnR9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAobXNnLCBkZXNjKSB7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnR5cGUgPSAnVHJhbnNwb3J0RXJyb3InO1xuICBlcnIuZGVzY3JpcHRpb24gPSBkZXNjO1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE9wZW5zIHRoZSB0cmFuc3BvcnQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGlmICgnY2xvc2VkJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICcnID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7XG4gICAgdGhpcy5kb09wZW4oKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDbG9zZXMgdGhlIHRyYW5zcG9ydC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAoJ29wZW5pbmcnID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICB0aGlzLmRvQ2xvc2UoKTtcbiAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZW5kcyBtdWx0aXBsZSBwYWNrZXRzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblRyYW5zcG9ydC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChwYWNrZXRzKSB7XG4gIGlmICgnb3BlbicgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgIHRoaXMud3JpdGUocGFja2V0cyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgbm90IG9wZW4nKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBvcGVuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vbk9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuJztcbiAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gIHRoaXMuZW1pdCgnb3BlbicpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgd2l0aCBkYXRhLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHZhciBwYWNrZXQgPSBwYXJzZXIuZGVjb2RlUGFja2V0KGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpO1xuICB0aGlzLm9uUGFja2V0KHBhY2tldCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aXRoIGEgZGVjb2RlZCBwYWNrZXQuXG4gKi9cblxuVHJhbnNwb3J0LnByb3RvdHlwZS5vblBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgdGhpcy5lbWl0KCdwYWNrZXQnLCBwYWNrZXQpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBjbG9zZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5UcmFuc3BvcnQucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG59O1xuIiwiLyoqXHJcbiAqIFBhcnNlcyBhbiBVUklcclxuICpcclxuICogQGF1dGhvciBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT4gKE1JVCBsaWNlbnNlKVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG52YXIgcmUgPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShodHRwfGh0dHBzfHdzfHdzcyk6XFwvXFwvKT8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPygoPzpbYS1mMC05XXswLDR9Oil7Miw3fVthLWYwLTldezAsNH18W146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcclxuXHJcbnZhciBwYXJ0cyA9IFtcclxuICAgICdzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLCAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLCAnYW5jaG9yJ1xyXG5dO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZXVyaShzdHIpIHtcclxuICAgIHZhciBzcmMgPSBzdHIsXHJcbiAgICAgICAgYiA9IHN0ci5pbmRleE9mKCdbJyksXHJcbiAgICAgICAgZSA9IHN0ci5pbmRleE9mKCddJyk7XHJcblxyXG4gICAgaWYgKGIgIT0gLTEgJiYgZSAhPSAtMSkge1xyXG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgYikgKyBzdHIuc3Vic3RyaW5nKGIsIGUpLnJlcGxhY2UoLzovZywgJzsnKSArIHN0ci5zdWJzdHJpbmcoZSwgc3RyLmxlbmd0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG0gPSByZS5leGVjKHN0ciB8fCAnJyksXHJcbiAgICAgICAgdXJpID0ge30sXHJcbiAgICAgICAgaSA9IDE0O1xyXG5cclxuICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICB1cmlbcGFydHNbaV1dID0gbVtpXSB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XHJcbiAgICAgICAgdXJpLnNvdXJjZSA9IHNyYztcclxuICAgICAgICB1cmkuaG9zdCA9IHVyaS5ob3N0LnN1YnN0cmluZygxLCB1cmkuaG9zdC5sZW5ndGggLSAxKS5yZXBsYWNlKC87L2csICc6Jyk7XHJcbiAgICAgICAgdXJpLmF1dGhvcml0eSA9IHVyaS5hdXRob3JpdHkucmVwbGFjZSgnWycsICcnKS5yZXBsYWNlKCddJywgJycpLnJlcGxhY2UoLzsvZywgJzonKTtcclxuICAgICAgICB1cmkuaXB2NnVyaSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHVyaTtcclxufTtcclxuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0gaXNCdWY7XG5cbnZhciB3aXRoTmF0aXZlQnVmZmVyID0gdHlwZW9mIEJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgQnVmZmVyLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nO1xudmFyIHdpdGhOYXRpdmVBcnJheUJ1ZmZlciA9IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJztcblxudmFyIGlzVmlldyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicgPyBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKSA6IChvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgb2JqIGlzIGEgYnVmZmVyIG9yIGFuIGFycmF5YnVmZmVyLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzQnVmKG9iaikge1xuICByZXR1cm4gKHdpdGhOYXRpdmVCdWZmZXIgJiYgQnVmZmVyLmlzQnVmZmVyKG9iaikpIHx8XG4gICAgICAgICAgKHdpdGhOYXRpdmVBcnJheUJ1ZmZlciAmJiAob2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgaXNWaWV3KG9iaikpKTtcbn1cbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsIlxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBlaW8gPSByZXF1aXJlKCdlbmdpbmUuaW8tY2xpZW50Jyk7XG52YXIgU29ja2V0ID0gcmVxdWlyZSgnLi9zb2NrZXQnKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG52YXIgb24gPSByZXF1aXJlKCcuL29uJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJ2NvbXBvbmVudC1iaW5kJyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50Om1hbmFnZXInKTtcbnZhciBpbmRleE9mID0gcmVxdWlyZSgnaW5kZXhvZicpO1xudmFyIEJhY2tvZmYgPSByZXF1aXJlKCdiYWNrbzInKTtcblxuLyoqXG4gKiBJRTYrIGhhc093blByb3BlcnR5XG4gKi9cblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1hbmFnZXI7XG5cbi8qKlxuICogYE1hbmFnZXJgIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbmdpbmUgaW5zdGFuY2Ugb3IgZW5naW5lIHVyaS9vcHRzXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBNYW5hZ2VyICh1cmksIG9wdHMpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1hbmFnZXIpKSByZXR1cm4gbmV3IE1hbmFnZXIodXJpLCBvcHRzKTtcbiAgaWYgKHVyaSAmJiAoJ29iamVjdCcgPT09IHR5cGVvZiB1cmkpKSB7XG4gICAgb3B0cyA9IHVyaTtcbiAgICB1cmkgPSB1bmRlZmluZWQ7XG4gIH1cbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgb3B0cy5wYXRoID0gb3B0cy5wYXRoIHx8ICcvc29ja2V0LmlvJztcbiAgdGhpcy5uc3BzID0ge307XG4gIHRoaXMuc3VicyA9IFtdO1xuICB0aGlzLm9wdHMgPSBvcHRzO1xuICB0aGlzLnJlY29ubmVjdGlvbihvcHRzLnJlY29ubmVjdGlvbiAhPT0gZmFsc2UpO1xuICB0aGlzLnJlY29ubmVjdGlvbkF0dGVtcHRzKG9wdHMucmVjb25uZWN0aW9uQXR0ZW1wdHMgfHwgSW5maW5pdHkpO1xuICB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KG9wdHMucmVjb25uZWN0aW9uRGVsYXkgfHwgMTAwMCk7XG4gIHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgob3B0cy5yZWNvbm5lY3Rpb25EZWxheU1heCB8fCA1MDAwKTtcbiAgdGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKG9wdHMucmFuZG9taXphdGlvbkZhY3RvciB8fCAwLjUpO1xuICB0aGlzLmJhY2tvZmYgPSBuZXcgQmFja29mZih7XG4gICAgbWluOiB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KCksXG4gICAgbWF4OiB0aGlzLnJlY29ubmVjdGlvbkRlbGF5TWF4KCksXG4gICAgaml0dGVyOiB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKVxuICB9KTtcbiAgdGhpcy50aW1lb3V0KG51bGwgPT0gb3B0cy50aW1lb3V0ID8gMjAwMDAgOiBvcHRzLnRpbWVvdXQpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgdGhpcy51cmkgPSB1cmk7XG4gIHRoaXMuY29ubmVjdGluZyA9IFtdO1xuICB0aGlzLmxhc3RQaW5nID0gbnVsbDtcbiAgdGhpcy5lbmNvZGluZyA9IGZhbHNlO1xuICB0aGlzLnBhY2tldEJ1ZmZlciA9IFtdO1xuICB2YXIgX3BhcnNlciA9IG9wdHMucGFyc2VyIHx8IHBhcnNlcjtcbiAgdGhpcy5lbmNvZGVyID0gbmV3IF9wYXJzZXIuRW5jb2RlcigpO1xuICB0aGlzLmRlY29kZXIgPSBuZXcgX3BhcnNlci5EZWNvZGVyKCk7XG4gIHRoaXMuYXV0b0Nvbm5lY3QgPSBvcHRzLmF1dG9Db25uZWN0ICE9PSBmYWxzZTtcbiAgaWYgKHRoaXMuYXV0b0Nvbm5lY3QpIHRoaXMub3BlbigpO1xufVxuXG4vKipcbiAqIFByb3BhZ2F0ZSBnaXZlbiBldmVudCB0byBzb2NrZXRzIGFuZCBlbWl0IG9uIGB0aGlzYFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmVtaXRBbGwgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICBmb3IgKHZhciBuc3AgaW4gdGhpcy5uc3BzKSB7XG4gICAgaWYgKGhhcy5jYWxsKHRoaXMubnNwcywgbnNwKSkge1xuICAgICAgdGhpcy5uc3BzW25zcF0uZW1pdC5hcHBseSh0aGlzLm5zcHNbbnNwXSwgYXJndW1lbnRzKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogVXBkYXRlIGBzb2NrZXQuaWRgIG9mIGFsbCBzb2NrZXRzXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUudXBkYXRlU29ja2V0SWRzID0gZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBuc3AgaW4gdGhpcy5uc3BzKSB7XG4gICAgaWYgKGhhcy5jYWxsKHRoaXMubnNwcywgbnNwKSkge1xuICAgICAgdGhpcy5uc3BzW25zcF0uaWQgPSB0aGlzLmdlbmVyYXRlSWQobnNwKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogZ2VuZXJhdGUgYHNvY2tldC5pZGAgZm9yIHRoZSBnaXZlbiBgbnNwYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuc3BcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmdlbmVyYXRlSWQgPSBmdW5jdGlvbiAobnNwKSB7XG4gIHJldHVybiAobnNwID09PSAnLycgPyAnJyA6IChuc3AgKyAnIycpKSArIHRoaXMuZW5naW5lLmlkO1xufTtcblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoTWFuYWdlci5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFNldHMgdGhlIGByZWNvbm5lY3Rpb25gIGNvbmZpZy5cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHRydWUvZmFsc2UgaWYgaXQgc2hvdWxkIGF1dG9tYXRpY2FsbHkgcmVjb25uZWN0XG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbiA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbjtcbiAgdGhpcy5fcmVjb25uZWN0aW9uID0gISF2O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgcmVjb25uZWN0aW9uIGF0dGVtcHRzIGNvbmZpZy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4IHJlY29ubmVjdGlvbiBhdHRlbXB0cyBiZWZvcmUgZ2l2aW5nIHVwXG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbkF0dGVtcHRzID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHM7XG4gIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzID0gdjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGRlbGF5IGJldHdlZW4gcmVjb25uZWN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gZGVsYXlcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uRGVsYXkgPSBmdW5jdGlvbiAodikge1xuICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheTtcbiAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXkgPSB2O1xuICB0aGlzLmJhY2tvZmYgJiYgdGhpcy5iYWNrb2ZmLnNldE1pbih2KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5yYW5kb21pemF0aW9uRmFjdG9yID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmFuZG9taXphdGlvbkZhY3RvcjtcbiAgdGhpcy5fcmFuZG9taXphdGlvbkZhY3RvciA9IHY7XG4gIHRoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0Sml0dGVyKHYpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgbWF4aW11bSBkZWxheSBiZXR3ZWVuIHJlY29ubmVjdGlvbnMuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGRlbGF5XG4gKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbkRlbGF5TWF4ID0gZnVuY3Rpb24gKHYpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXg7XG4gIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5TWF4ID0gdjtcbiAgdGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRNYXgodik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjb25uZWN0aW9uIHRpbWVvdXQuIGBmYWxzZWAgdG8gZGlzYWJsZVxuICpcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uICh2KSB7XG4gIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3RpbWVvdXQ7XG4gIHRoaXMuX3RpbWVvdXQgPSB2O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3RhcnRzIHRyeWluZyB0byByZWNvbm5lY3QgaWYgcmVjb25uZWN0aW9uIGlzIGVuYWJsZWQgYW5kIHdlIGhhdmUgbm90XG4gKiBzdGFydGVkIHJlY29ubmVjdGluZyB5ZXRcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5tYXliZVJlY29ubmVjdE9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gT25seSB0cnkgdG8gcmVjb25uZWN0IGlmIGl0J3MgdGhlIGZpcnN0IHRpbWUgd2UncmUgY29ubmVjdGluZ1xuICBpZiAoIXRoaXMucmVjb25uZWN0aW5nICYmIHRoaXMuX3JlY29ubmVjdGlvbiAmJiB0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPT09IDApIHtcbiAgICAvLyBrZWVwcyByZWNvbm5lY3Rpb24gZnJvbSBmaXJpbmcgdHdpY2UgZm9yIHRoZSBzYW1lIHJlY29ubmVjdGlvbiBsb29wXG4gICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydCBgc29ja2V0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25hbCwgY2FsbGJhY2tcbiAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub3BlbiA9XG5NYW5hZ2VyLnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKGZuLCBvcHRzKSB7XG4gIGRlYnVnKCdyZWFkeVN0YXRlICVzJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgaWYgKH50aGlzLnJlYWR5U3RhdGUuaW5kZXhPZignb3BlbicpKSByZXR1cm4gdGhpcztcblxuICBkZWJ1Zygnb3BlbmluZyAlcycsIHRoaXMudXJpKTtcbiAgdGhpcy5lbmdpbmUgPSBlaW8odGhpcy51cmksIHRoaXMub3B0cyk7XG4gIHZhciBzb2NrZXQgPSB0aGlzLmVuZ2luZTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7XG4gIHRoaXMuc2tpcFJlY29ubmVjdCA9IGZhbHNlO1xuXG4gIC8vIGVtaXQgYG9wZW5gXG4gIHZhciBvcGVuU3ViID0gb24oc29ja2V0LCAnb3BlbicsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9ub3BlbigpO1xuICAgIGZuICYmIGZuKCk7XG4gIH0pO1xuXG4gIC8vIGVtaXQgYGNvbm5lY3RfZXJyb3JgXG4gIHZhciBlcnJvclN1YiA9IG9uKHNvY2tldCwgJ2Vycm9yJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkZWJ1ZygnY29ubmVjdF9lcnJvcicpO1xuICAgIHNlbGYuY2xlYW51cCgpO1xuICAgIHNlbGYucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICAgIHNlbGYuZW1pdEFsbCgnY29ubmVjdF9lcnJvcicsIGRhdGEpO1xuICAgIGlmIChmbikge1xuICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignQ29ubmVjdGlvbiBlcnJvcicpO1xuICAgICAgZXJyLmRhdGEgPSBkYXRhO1xuICAgICAgZm4oZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIG5vIGZuIHRvIGhhbmRsZSB0aGUgZXJyb3JcbiAgICAgIHNlbGYubWF5YmVSZWNvbm5lY3RPbk9wZW4oKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGVtaXQgYGNvbm5lY3RfdGltZW91dGBcbiAgaWYgKGZhbHNlICE9PSB0aGlzLl90aW1lb3V0KSB7XG4gICAgdmFyIHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICAgIGRlYnVnKCdjb25uZWN0IGF0dGVtcHQgd2lsbCB0aW1lb3V0IGFmdGVyICVkJywgdGltZW91dCk7XG5cbiAgICAvLyBzZXQgdGltZXJcbiAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGRlYnVnKCdjb25uZWN0IGF0dGVtcHQgdGltZWQgb3V0IGFmdGVyICVkJywgdGltZW91dCk7XG4gICAgICBvcGVuU3ViLmRlc3Ryb3koKTtcbiAgICAgIHNvY2tldC5jbG9zZSgpO1xuICAgICAgc29ja2V0LmVtaXQoJ2Vycm9yJywgJ3RpbWVvdXQnKTtcbiAgICAgIHNlbGYuZW1pdEFsbCgnY29ubmVjdF90aW1lb3V0JywgdGltZW91dCk7XG4gICAgfSwgdGltZW91dCk7XG5cbiAgICB0aGlzLnN1YnMucHVzaCh7XG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB0aGlzLnN1YnMucHVzaChvcGVuU3ViKTtcbiAgdGhpcy5zdWJzLnB1c2goZXJyb3JTdWIpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgb3Blbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdvcGVuJyk7XG5cbiAgLy8gY2xlYXIgb2xkIHN1YnNcbiAgdGhpcy5jbGVhbnVwKCk7XG5cbiAgLy8gbWFyayBhcyBvcGVuXG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuJztcbiAgdGhpcy5lbWl0KCdvcGVuJyk7XG5cbiAgLy8gYWRkIG5ldyBzdWJzXG4gIHZhciBzb2NrZXQgPSB0aGlzLmVuZ2luZTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAnZGF0YScsIGJpbmQodGhpcywgJ29uZGF0YScpKSk7XG4gIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ3BpbmcnLCBiaW5kKHRoaXMsICdvbnBpbmcnKSkpO1xuICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdwb25nJywgYmluZCh0aGlzLCAnb25wb25nJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAnZXJyb3InLCBiaW5kKHRoaXMsICdvbmVycm9yJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAnY2xvc2UnLCBiaW5kKHRoaXMsICdvbmNsb3NlJykpKTtcbiAgdGhpcy5zdWJzLnB1c2gob24odGhpcy5kZWNvZGVyLCAnZGVjb2RlZCcsIGJpbmQodGhpcywgJ29uZGVjb2RlZCcpKSk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGEgcGluZy5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbnBpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMubGFzdFBpbmcgPSBuZXcgRGF0ZSgpO1xuICB0aGlzLmVtaXRBbGwoJ3BpbmcnKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gYSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25wb25nID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmVtaXRBbGwoJ3BvbmcnLCBuZXcgRGF0ZSgpIC0gdGhpcy5sYXN0UGluZyk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aXRoIGRhdGEuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25kYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgdGhpcy5kZWNvZGVyLmFkZChkYXRhKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdoZW4gcGFyc2VyIGZ1bGx5IGRlY29kZXMgYSBwYWNrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25kZWNvZGVkID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICB0aGlzLmVtaXQoJ3BhY2tldCcsIHBhY2tldCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHNvY2tldCBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICBkZWJ1ZygnZXJyb3InLCBlcnIpO1xuICB0aGlzLmVtaXRBbGwoJ2Vycm9yJywgZXJyKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBzb2NrZXQgZm9yIHRoZSBnaXZlbiBgbnNwYC5cbiAqXG4gKiBAcmV0dXJuIHtTb2NrZXR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnNvY2tldCA9IGZ1bmN0aW9uIChuc3AsIG9wdHMpIHtcbiAgdmFyIHNvY2tldCA9IHRoaXMubnNwc1tuc3BdO1xuICBpZiAoIXNvY2tldCkge1xuICAgIHNvY2tldCA9IG5ldyBTb2NrZXQodGhpcywgbnNwLCBvcHRzKTtcbiAgICB0aGlzLm5zcHNbbnNwXSA9IHNvY2tldDtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc29ja2V0Lm9uKCdjb25uZWN0aW5nJywgb25Db25uZWN0aW5nKTtcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzb2NrZXQuaWQgPSBzZWxmLmdlbmVyYXRlSWQobnNwKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmF1dG9Db25uZWN0KSB7XG4gICAgICAvLyBtYW51YWxseSBjYWxsIGhlcmUgc2luY2UgY29ubmVjdGluZyBldmVudCBpcyBmaXJlZCBiZWZvcmUgbGlzdGVuaW5nXG4gICAgICBvbkNvbm5lY3RpbmcoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkNvbm5lY3RpbmcgKCkge1xuICAgIGlmICghfmluZGV4T2Yoc2VsZi5jb25uZWN0aW5nLCBzb2NrZXQpKSB7XG4gICAgICBzZWxmLmNvbm5lY3RpbmcucHVzaChzb2NrZXQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzb2NrZXQ7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGEgc29ja2V0IGNsb3NlLlxuICpcbiAqIEBwYXJhbSB7U29ja2V0fSBzb2NrZXRcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKHNvY2tldCkge1xuICB2YXIgaW5kZXggPSBpbmRleE9mKHRoaXMuY29ubmVjdGluZywgc29ja2V0KTtcbiAgaWYgKH5pbmRleCkgdGhpcy5jb25uZWN0aW5nLnNwbGljZShpbmRleCwgMSk7XG4gIGlmICh0aGlzLmNvbm5lY3RpbmcubGVuZ3RoKSByZXR1cm47XG5cbiAgdGhpcy5jbG9zZSgpO1xufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICBkZWJ1Zygnd3JpdGluZyBwYWNrZXQgJWonLCBwYWNrZXQpO1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGlmIChwYWNrZXQucXVlcnkgJiYgcGFja2V0LnR5cGUgPT09IDApIHBhY2tldC5uc3AgKz0gJz8nICsgcGFja2V0LnF1ZXJ5O1xuXG4gIGlmICghc2VsZi5lbmNvZGluZykge1xuICAgIC8vIGVuY29kZSwgdGhlbiB3cml0ZSB0byBlbmdpbmUgd2l0aCByZXN1bHRcbiAgICBzZWxmLmVuY29kaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmVuY29kZXIuZW5jb2RlKHBhY2tldCwgZnVuY3Rpb24gKGVuY29kZWRQYWNrZXRzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuY29kZWRQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNlbGYuZW5naW5lLndyaXRlKGVuY29kZWRQYWNrZXRzW2ldLCBwYWNrZXQub3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBzZWxmLmVuY29kaW5nID0gZmFsc2U7XG4gICAgICBzZWxmLnByb2Nlc3NQYWNrZXRRdWV1ZSgpO1xuICAgIH0pO1xuICB9IGVsc2UgeyAvLyBhZGQgcGFja2V0IHRvIHRoZSBxdWV1ZVxuICAgIHNlbGYucGFja2V0QnVmZmVyLnB1c2gocGFja2V0KTtcbiAgfVxufTtcblxuLyoqXG4gKiBJZiBwYWNrZXQgYnVmZmVyIGlzIG5vbi1lbXB0eSwgYmVnaW5zIGVuY29kaW5nIHRoZVxuICogbmV4dCBwYWNrZXQgaW4gbGluZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5NYW5hZ2VyLnByb3RvdHlwZS5wcm9jZXNzUGFja2V0UXVldWUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnBhY2tldEJ1ZmZlci5sZW5ndGggPiAwICYmICF0aGlzLmVuY29kaW5nKSB7XG4gICAgdmFyIHBhY2sgPSB0aGlzLnBhY2tldEJ1ZmZlci5zaGlmdCgpO1xuICAgIHRoaXMucGFja2V0KHBhY2spO1xuICB9XG59O1xuXG4vKipcbiAqIENsZWFuIHVwIHRyYW5zcG9ydCBzdWJzY3JpcHRpb25zIGFuZCBwYWNrZXQgYnVmZmVyLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdjbGVhbnVwJyk7XG5cbiAgdmFyIHN1YnNMZW5ndGggPSB0aGlzLnN1YnMubGVuZ3RoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN1YnNMZW5ndGg7IGkrKykge1xuICAgIHZhciBzdWIgPSB0aGlzLnN1YnMuc2hpZnQoKTtcbiAgICBzdWIuZGVzdHJveSgpO1xuICB9XG5cbiAgdGhpcy5wYWNrZXRCdWZmZXIgPSBbXTtcbiAgdGhpcy5lbmNvZGluZyA9IGZhbHNlO1xuICB0aGlzLmxhc3RQaW5nID0gbnVsbDtcblxuICB0aGlzLmRlY29kZXIuZGVzdHJveSgpO1xufTtcblxuLyoqXG4gKiBDbG9zZSB0aGUgY3VycmVudCBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUuY2xvc2UgPVxuTWFuYWdlci5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ2Rpc2Nvbm5lY3QnKTtcbiAgdGhpcy5za2lwUmVjb25uZWN0ID0gdHJ1ZTtcbiAgdGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgLy8gYG9uY2xvc2VgIHdpbGwgbm90IGZpcmUgYmVjYXVzZVxuICAgIC8vIGFuIG9wZW4gZXZlbnQgbmV2ZXIgaGFwcGVuZWRcbiAgICB0aGlzLmNsZWFudXAoKTtcbiAgfVxuICB0aGlzLmJhY2tvZmYucmVzZXQoKTtcbiAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gIGlmICh0aGlzLmVuZ2luZSkgdGhpcy5lbmdpbmUuY2xvc2UoKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gZW5naW5lIGNsb3NlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gIGRlYnVnKCdvbmNsb3NlJyk7XG5cbiAgdGhpcy5jbGVhbnVwKCk7XG4gIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgdGhpcy5lbWl0KCdjbG9zZScsIHJlYXNvbik7XG5cbiAgaWYgKHRoaXMuX3JlY29ubmVjdGlvbiAmJiAhdGhpcy5za2lwUmVjb25uZWN0KSB7XG4gICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBBdHRlbXB0IGEgcmVjb25uZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbk1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMucmVjb25uZWN0aW5nIHx8IHRoaXMuc2tpcFJlY29ubmVjdCkgcmV0dXJuIHRoaXM7XG5cbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIGlmICh0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPj0gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMpIHtcbiAgICBkZWJ1ZygncmVjb25uZWN0IGZhaWxlZCcpO1xuICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgIHRoaXMuZW1pdEFsbCgncmVjb25uZWN0X2ZhaWxlZCcpO1xuICAgIHRoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGRlbGF5ID0gdGhpcy5iYWNrb2ZmLmR1cmF0aW9uKCk7XG4gICAgZGVidWcoJ3dpbGwgd2FpdCAlZG1zIGJlZm9yZSByZWNvbm5lY3QgYXR0ZW1wdCcsIGRlbGF5KTtcblxuICAgIHRoaXMucmVjb25uZWN0aW5nID0gdHJ1ZTtcbiAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpIHJldHVybjtcblxuICAgICAgZGVidWcoJ2F0dGVtcHRpbmcgcmVjb25uZWN0Jyk7XG4gICAgICBzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdF9hdHRlbXB0Jywgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcbiAgICAgIHNlbGYuZW1pdEFsbCgncmVjb25uZWN0aW5nJywgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcblxuICAgICAgLy8gY2hlY2sgYWdhaW4gZm9yIHRoZSBjYXNlIHNvY2tldCBjbG9zZWQgaW4gYWJvdmUgZXZlbnRzXG4gICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KSByZXR1cm47XG5cbiAgICAgIHNlbGYub3BlbihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBkZWJ1ZygncmVjb25uZWN0IGF0dGVtcHQgZXJyb3InKTtcbiAgICAgICAgICBzZWxmLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICAgIHNlbGYucmVjb25uZWN0KCk7XG4gICAgICAgICAgc2VsZi5lbWl0QWxsKCdyZWNvbm5lY3RfZXJyb3InLCBlcnIuZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVidWcoJ3JlY29ubmVjdCBzdWNjZXNzJyk7XG4gICAgICAgICAgc2VsZi5vbnJlY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCBkZWxheSk7XG5cbiAgICB0aGlzLnN1YnMucHVzaCh7XG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZWNvbm5lY3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuTWFuYWdlci5wcm90b3R5cGUub25yZWNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBhdHRlbXB0ID0gdGhpcy5iYWNrb2ZmLmF0dGVtcHRzO1xuICB0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICB0aGlzLmJhY2tvZmYucmVzZXQoKTtcbiAgdGhpcy51cGRhdGVTb2NrZXRJZHMoKTtcbiAgdGhpcy5lbWl0QWxsKCdyZWNvbm5lY3QnLCBhdHRlbXB0KTtcbn07XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcbiAqL1xuXG52YXIgWE1MSHR0cFJlcXVlc3QgPSByZXF1aXJlKCd4bWxodHRwcmVxdWVzdC1zc2wnKTtcbnZhciBYSFIgPSByZXF1aXJlKCcuL3BvbGxpbmcteGhyJyk7XG52YXIgSlNPTlAgPSByZXF1aXJlKCcuL3BvbGxpbmctanNvbnAnKTtcbnZhciB3ZWJzb2NrZXQgPSByZXF1aXJlKCcuL3dlYnNvY2tldCcpO1xuXG4vKipcbiAqIEV4cG9ydCB0cmFuc3BvcnRzLlxuICovXG5cbmV4cG9ydHMucG9sbGluZyA9IHBvbGxpbmc7XG5leHBvcnRzLndlYnNvY2tldCA9IHdlYnNvY2tldDtcblxuLyoqXG4gKiBQb2xsaW5nIHRyYW5zcG9ydCBwb2x5bW9ycGhpYyBjb25zdHJ1Y3Rvci5cbiAqIERlY2lkZXMgb24geGhyIHZzIGpzb25wIGJhc2VkIG9uIGZlYXR1cmUgZGV0ZWN0aW9uLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBvbGxpbmcgKG9wdHMpIHtcbiAgdmFyIHhocjtcbiAgdmFyIHhkID0gZmFsc2U7XG4gIHZhciB4cyA9IGZhbHNlO1xuICB2YXIganNvbnAgPSBmYWxzZSAhPT0gb3B0cy5qc29ucDtcblxuICBpZiAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJykge1xuICAgIHZhciBpc1NTTCA9ICdodHRwczonID09PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICB2YXIgcG9ydCA9IGxvY2F0aW9uLnBvcnQ7XG5cbiAgICAvLyBzb21lIHVzZXIgYWdlbnRzIGhhdmUgZW1wdHkgYGxvY2F0aW9uLnBvcnRgXG4gICAgaWYgKCFwb3J0KSB7XG4gICAgICBwb3J0ID0gaXNTU0wgPyA0NDMgOiA4MDtcbiAgICB9XG5cbiAgICB4ZCA9IG9wdHMuaG9zdG5hbWUgIT09IGxvY2F0aW9uLmhvc3RuYW1lIHx8IHBvcnQgIT09IG9wdHMucG9ydDtcbiAgICB4cyA9IG9wdHMuc2VjdXJlICE9PSBpc1NTTDtcbiAgfVxuXG4gIG9wdHMueGRvbWFpbiA9IHhkO1xuICBvcHRzLnhzY2hlbWUgPSB4cztcbiAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpO1xuXG4gIGlmICgnb3BlbicgaW4geGhyICYmICFvcHRzLmZvcmNlSlNPTlApIHtcbiAgICByZXR1cm4gbmV3IFhIUihvcHRzKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWpzb25wKSB0aHJvdyBuZXcgRXJyb3IoJ0pTT05QIGRpc2FibGVkJyk7XG4gICAgcmV0dXJuIG5ldyBKU09OUChvcHRzKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBUcmFuc3BvcnQgPSByZXF1aXJlKCcuLi90cmFuc3BvcnQnKTtcbnZhciBwYXJzZXFzID0gcmVxdWlyZSgncGFyc2VxcycpO1xudmFyIHBhcnNlciA9IHJlcXVpcmUoJ2VuZ2luZS5pby1wYXJzZXInKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnY29tcG9uZW50LWluaGVyaXQnKTtcbnZhciB5ZWFzdCA9IHJlcXVpcmUoJ3llYXN0Jyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnBvbGxpbmcnKTtcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvbGxpbmc7XG5cbi8qKlxuICogSXMgWEhSMiBzdXBwb3J0ZWQ/XG4gKi9cblxudmFyIGhhc1hIUjIgPSAoZnVuY3Rpb24gKCkge1xuICB2YXIgWE1MSHR0cFJlcXVlc3QgPSByZXF1aXJlKCd4bWxodHRwcmVxdWVzdC1zc2wnKTtcbiAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCh7IHhkb21haW46IGZhbHNlIH0pO1xuICByZXR1cm4gbnVsbCAhPSB4aHIucmVzcG9uc2VUeXBlO1xufSkoKTtcblxuLyoqXG4gKiBQb2xsaW5nIGludGVyZmFjZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gUG9sbGluZyAob3B0cykge1xuICB2YXIgZm9yY2VCYXNlNjQgPSAob3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0KTtcbiAgaWYgKCFoYXNYSFIyIHx8IGZvcmNlQmFzZTY0KSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG4gIFRyYW5zcG9ydC5jYWxsKHRoaXMsIG9wdHMpO1xufVxuXG4vKipcbiAqIEluaGVyaXRzIGZyb20gVHJhbnNwb3J0LlxuICovXG5cbmluaGVyaXQoUG9sbGluZywgVHJhbnNwb3J0KTtcblxuLyoqXG4gKiBUcmFuc3BvcnQgbmFtZS5cbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5uYW1lID0gJ3BvbGxpbmcnO1xuXG4vKipcbiAqIE9wZW5zIHRoZSBzb2NrZXQgKHRyaWdnZXJzIHBvbGxpbmcpLiBXZSB3cml0ZSBhIFBJTkcgbWVzc2FnZSB0byBkZXRlcm1pbmVcbiAqIHdoZW4gdGhlIHRyYW5zcG9ydCBpcyBvcGVuLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblBvbGxpbmcucHJvdG90eXBlLmRvT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5wb2xsKCk7XG59O1xuXG4vKipcbiAqIFBhdXNlcyBwb2xsaW5nLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIHVwb24gYnVmZmVycyBhcmUgZmx1c2hlZCBhbmQgdHJhbnNwb3J0IGlzIHBhdXNlZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAob25QYXVzZSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgdGhpcy5yZWFkeVN0YXRlID0gJ3BhdXNpbmcnO1xuXG4gIGZ1bmN0aW9uIHBhdXNlICgpIHtcbiAgICBkZWJ1ZygncGF1c2VkJyk7XG4gICAgc2VsZi5yZWFkeVN0YXRlID0gJ3BhdXNlZCc7XG4gICAgb25QYXVzZSgpO1xuICB9XG5cbiAgaWYgKHRoaXMucG9sbGluZyB8fCAhdGhpcy53cml0YWJsZSkge1xuICAgIHZhciB0b3RhbCA9IDA7XG5cbiAgICBpZiAodGhpcy5wb2xsaW5nKSB7XG4gICAgICBkZWJ1Zygnd2UgYXJlIGN1cnJlbnRseSBwb2xsaW5nIC0gd2FpdGluZyB0byBwYXVzZScpO1xuICAgICAgdG90YWwrKztcbiAgICAgIHRoaXMub25jZSgncG9sbENvbXBsZXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBkZWJ1ZygncHJlLXBhdXNlIHBvbGxpbmcgY29tcGxldGUnKTtcbiAgICAgICAgLS10b3RhbCB8fCBwYXVzZSgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLndyaXRhYmxlKSB7XG4gICAgICBkZWJ1Zygnd2UgYXJlIGN1cnJlbnRseSB3cml0aW5nIC0gd2FpdGluZyB0byBwYXVzZScpO1xuICAgICAgdG90YWwrKztcbiAgICAgIHRoaXMub25jZSgnZHJhaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRlYnVnKCdwcmUtcGF1c2Ugd3JpdGluZyBjb21wbGV0ZScpO1xuICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcGF1c2UoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTdGFydHMgcG9sbGluZyBjeWNsZS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblBvbGxpbmcucHJvdG90eXBlLnBvbGwgPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCdwb2xsaW5nJyk7XG4gIHRoaXMucG9sbGluZyA9IHRydWU7XG4gIHRoaXMuZG9Qb2xsKCk7XG4gIHRoaXMuZW1pdCgncG9sbCcpO1xufTtcblxuLyoqXG4gKiBPdmVybG9hZHMgb25EYXRhIHRvIGRldGVjdCBwYXlsb2Fkcy5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIGRlYnVnKCdwb2xsaW5nIGdvdCBkYXRhICVzJywgZGF0YSk7XG4gIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uIChwYWNrZXQsIGluZGV4LCB0b3RhbCkge1xuICAgIC8vIGlmIGl0cyB0aGUgZmlyc3QgbWVzc2FnZSB3ZSBjb25zaWRlciB0aGUgdHJhbnNwb3J0IG9wZW5cbiAgICBpZiAoJ29wZW5pbmcnID09PSBzZWxmLnJlYWR5U3RhdGUpIHtcbiAgICAgIHNlbGYub25PcGVuKCk7XG4gICAgfVxuXG4gICAgLy8gaWYgaXRzIGEgY2xvc2UgcGFja2V0LCB3ZSBjbG9zZSB0aGUgb25nb2luZyByZXF1ZXN0c1xuICAgIGlmICgnY2xvc2UnID09PSBwYWNrZXQudHlwZSkge1xuICAgICAgc2VsZi5vbkNsb3NlKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gb3RoZXJ3aXNlIGJ5cGFzcyBvbkRhdGEgYW5kIGhhbmRsZSB0aGUgbWVzc2FnZVxuICAgIHNlbGYub25QYWNrZXQocGFja2V0KTtcbiAgfTtcblxuICAvLyBkZWNvZGUgcGF5bG9hZFxuICBwYXJzZXIuZGVjb2RlUGF5bG9hZChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlLCBjYWxsYmFjayk7XG5cbiAgLy8gaWYgYW4gZXZlbnQgZGlkIG5vdCB0cmlnZ2VyIGNsb3NpbmdcbiAgaWYgKCdjbG9zZWQnICE9PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAvLyBpZiB3ZSBnb3QgZGF0YSB3ZSdyZSBub3QgcG9sbGluZ1xuICAgIHRoaXMucG9sbGluZyA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdCgncG9sbENvbXBsZXRlJyk7XG5cbiAgICBpZiAoJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgIHRoaXMucG9sbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1ZygnaWdub3JpbmcgcG9sbCAtIHRyYW5zcG9ydCBzdGF0ZSBcIiVzXCInLCB0aGlzLnJlYWR5U3RhdGUpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBGb3IgcG9sbGluZywgc2VuZCBhIGNsb3NlIHBhY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgZnVuY3Rpb24gY2xvc2UgKCkge1xuICAgIGRlYnVnKCd3cml0aW5nIGNsb3NlIHBhY2tldCcpO1xuICAgIHNlbGYud3JpdGUoW3sgdHlwZTogJ2Nsb3NlJyB9XSk7XG4gIH1cblxuICBpZiAoJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICBkZWJ1ZygndHJhbnNwb3J0IG9wZW4gLSBjbG9zaW5nJyk7XG4gICAgY2xvc2UoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBpbiBjYXNlIHdlJ3JlIHRyeWluZyB0byBjbG9zZSB3aGlsZVxuICAgIC8vIGhhbmRzaGFraW5nIGlzIGluIHByb2dyZXNzIChHSC0xNjQpXG4gICAgZGVidWcoJ3RyYW5zcG9ydCBub3Qgb3BlbiAtIGRlZmVycmluZyBjbG9zZScpO1xuICAgIHRoaXMub25jZSgnb3BlbicsIGNsb3NlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBXcml0ZXMgYSBwYWNrZXRzIHBheWxvYWQuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gZGF0YSBwYWNrZXRzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkcmFpbiBjYWxsYmFja1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUG9sbGluZy5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAocGFja2V0cykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgdmFyIGNhbGxiYWNrZm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi53cml0YWJsZSA9IHRydWU7XG4gICAgc2VsZi5lbWl0KCdkcmFpbicpO1xuICB9O1xuXG4gIHBhcnNlci5lbmNvZGVQYXlsb2FkKHBhY2tldHMsIHRoaXMuc3VwcG9ydHNCaW5hcnksIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgc2VsZi5kb1dyaXRlKGRhdGEsIGNhbGxiYWNrZm4pO1xuICB9KTtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Qb2xsaW5nLnByb3RvdHlwZS51cmkgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gIHZhciBzY2hlbWEgPSB0aGlzLnNlY3VyZSA/ICdodHRwcycgOiAnaHR0cCc7XG4gIHZhciBwb3J0ID0gJyc7XG5cbiAgLy8gY2FjaGUgYnVzdGluZyBpcyBmb3JjZWRcbiAgaWYgKGZhbHNlICE9PSB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgcXVlcnlbdGhpcy50aW1lc3RhbXBQYXJhbV0gPSB5ZWFzdCgpO1xuICB9XG5cbiAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5ICYmICFxdWVyeS5zaWQpIHtcbiAgICBxdWVyeS5iNjQgPSAxO1xuICB9XG5cbiAgcXVlcnkgPSBwYXJzZXFzLmVuY29kZShxdWVyeSk7XG5cbiAgLy8gYXZvaWQgcG9ydCBpZiBkZWZhdWx0IGZvciBzY2hlbWFcbiAgaWYgKHRoaXMucG9ydCAmJiAoKCdodHRwcycgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICAoJ2h0dHAnID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMucG9ydCkgIT09IDgwKSkpIHtcbiAgICBwb3J0ID0gJzonICsgdGhpcy5wb3J0O1xuICB9XG5cbiAgLy8gcHJlcGVuZCA/IHRvIHF1ZXJ5XG4gIGlmIChxdWVyeS5sZW5ndGgpIHtcbiAgICBxdWVyeSA9ICc/JyArIHF1ZXJ5O1xuICB9XG5cbiAgdmFyIGlwdjYgPSB0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSAhPT0gLTE7XG4gIHJldHVybiBzY2hlbWEgKyAnOi8vJyArIChpcHY2ID8gJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyA6IHRoaXMuaG9zdG5hbWUpICsgcG9ydCArIHRoaXMucGF0aCArIHF1ZXJ5O1xufTtcbiIsIi8qIGdsb2JhbCBCbG9iIEZpbGUgKi9cblxuLypcbiAqIE1vZHVsZSByZXF1aXJlbWVudHMuXG4gKi9cblxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgd2l0aE5hdGl2ZUJsb2IgPSB0eXBlb2YgQmxvYiA9PT0gJ2Z1bmN0aW9uJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIEJsb2IgIT09ICd1bmRlZmluZWQnICYmIHRvU3RyaW5nLmNhbGwoQmxvYikgPT09ICdbb2JqZWN0IEJsb2JDb25zdHJ1Y3Rvcl0nO1xudmFyIHdpdGhOYXRpdmVGaWxlID0gdHlwZW9mIEZpbGUgPT09ICdmdW5jdGlvbicgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBGaWxlICE9PSAndW5kZWZpbmVkJyAmJiB0b1N0cmluZy5jYWxsKEZpbGUpID09PSAnW29iamVjdCBGaWxlQ29uc3RydWN0b3JdJztcblxuLyoqXG4gKiBNb2R1bGUgZXhwb3J0cy5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc0JpbmFyeTtcblxuLyoqXG4gKiBDaGVja3MgZm9yIGJpbmFyeSBkYXRhLlxuICpcbiAqIFN1cHBvcnRzIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEJsb2IgYW5kIEZpbGUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGFueXRoaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGhhc0JpbmFyeSAob2JqKSB7XG4gIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKGhhc0JpbmFyeShvYmpbaV0pKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoKHR5cGVvZiBCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgQnVmZmVyLmlzQnVmZmVyICYmIEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB8fFxuICAgICh0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8XG4gICAgKHdpdGhOYXRpdmVCbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpIHx8XG4gICAgKHdpdGhOYXRpdmVGaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vQXV0b21hdHRpYy9oYXMtYmluYXJ5L3B1bGwvNFxuICBpZiAob2JqLnRvSlNPTiAmJiB0eXBlb2Ygb2JqLnRvSlNPTiA9PT0gJ2Z1bmN0aW9uJyAmJiBhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGhhc0JpbmFyeShvYmoudG9KU09OKCksIHRydWUpO1xuICB9XG5cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpICYmIGhhc0JpbmFyeShvYmpba2V5XSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGFscGhhYmV0ID0gJzAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6LV8nLnNwbGl0KCcnKVxuICAsIGxlbmd0aCA9IDY0XG4gICwgbWFwID0ge31cbiAgLCBzZWVkID0gMFxuICAsIGkgPSAwXG4gICwgcHJldjtcblxuLyoqXG4gKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzcGVjaWZpZWQgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBudW0gVGhlIG51bWJlciB0byBjb252ZXJ0LlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbnVtYmVyLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gZW5jb2RlKG51bSkge1xuICB2YXIgZW5jb2RlZCA9ICcnO1xuXG4gIGRvIHtcbiAgICBlbmNvZGVkID0gYWxwaGFiZXRbbnVtICUgbGVuZ3RoXSArIGVuY29kZWQ7XG4gICAgbnVtID0gTWF0aC5mbG9vcihudW0gLyBsZW5ndGgpO1xuICB9IHdoaWxlIChudW0gPiAwKTtcblxuICByZXR1cm4gZW5jb2RlZDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGludGVnZXIgdmFsdWUgc3BlY2lmaWVkIGJ5IHRoZSBnaXZlbiBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgaW50ZWdlciB2YWx1ZSByZXByZXNlbnRlZCBieSB0aGUgc3RyaW5nLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gZGVjb2RlKHN0cikge1xuICB2YXIgZGVjb2RlZCA9IDA7XG5cbiAgZm9yIChpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGRlY29kZWQgPSBkZWNvZGVkICogbGVuZ3RoICsgbWFwW3N0ci5jaGFyQXQoaSldO1xuICB9XG5cbiAgcmV0dXJuIGRlY29kZWQ7XG59XG5cbi8qKlxuICogWWVhc3Q6IEEgdGlueSBncm93aW5nIGlkIGdlbmVyYXRvci5cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBBIHVuaXF1ZSBpZC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHllYXN0KCkge1xuICB2YXIgbm93ID0gZW5jb2RlKCtuZXcgRGF0ZSgpKTtcblxuICBpZiAobm93ICE9PSBwcmV2KSByZXR1cm4gc2VlZCA9IDAsIHByZXYgPSBub3c7XG4gIHJldHVybiBub3cgKycuJysgZW5jb2RlKHNlZWQrKyk7XG59XG5cbi8vXG4vLyBNYXAgZWFjaCBjaGFyYWN0ZXIgdG8gaXRzIGluZGV4LlxuLy9cbmZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIG1hcFthbHBoYWJldFtpXV0gPSBpO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBgeWVhc3RgLCBgZW5jb2RlYCBhbmQgYGRlY29kZWAgZnVuY3Rpb25zLlxuLy9cbnllYXN0LmVuY29kZSA9IGVuY29kZTtcbnllYXN0LmRlY29kZSA9IGRlY29kZTtcbm1vZHVsZS5leHBvcnRzID0geWVhc3Q7XG4iLCJcbnZhciBpbmRleE9mID0gW10uaW5kZXhPZjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnIsIG9iail7XG4gIGlmIChpbmRleE9mKSByZXR1cm4gYXJyLmluZGV4T2Yob2JqKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoYXJyW2ldID09PSBvYmopIHJldHVybiBpO1xuICB9XG4gIHJldHVybiAtMTtcbn07IiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHBhcnNlciA9IHJlcXVpcmUoJ3NvY2tldC5pby1wYXJzZXInKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciB0b0FycmF5ID0gcmVxdWlyZSgndG8tYXJyYXknKTtcbnZhciBvbiA9IHJlcXVpcmUoJy4vb24nKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnY29tcG9uZW50LWJpbmQnKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6c29ja2V0Jyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcbnZhciBoYXNCaW4gPSByZXF1aXJlKCdoYXMtYmluYXJ5MicpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IFNvY2tldDtcblxuLyoqXG4gKiBJbnRlcm5hbCBldmVudHMgKGJsYWNrbGlzdGVkKS5cbiAqIFRoZXNlIGV2ZW50cyBjYW4ndCBiZSBlbWl0dGVkIGJ5IHRoZSB1c2VyLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbnZhciBldmVudHMgPSB7XG4gIGNvbm5lY3Q6IDEsXG4gIGNvbm5lY3RfZXJyb3I6IDEsXG4gIGNvbm5lY3RfdGltZW91dDogMSxcbiAgY29ubmVjdGluZzogMSxcbiAgZGlzY29ubmVjdDogMSxcbiAgZXJyb3I6IDEsXG4gIHJlY29ubmVjdDogMSxcbiAgcmVjb25uZWN0X2F0dGVtcHQ6IDEsXG4gIHJlY29ubmVjdF9mYWlsZWQ6IDEsXG4gIHJlY29ubmVjdF9lcnJvcjogMSxcbiAgcmVjb25uZWN0aW5nOiAxLFxuICBwaW5nOiAxLFxuICBwb25nOiAxXG59O1xuXG4vKipcbiAqIFNob3J0Y3V0IHRvIGBFbWl0dGVyI2VtaXRgLlxuICovXG5cbnZhciBlbWl0ID0gRW1pdHRlci5wcm90b3R5cGUuZW1pdDtcblxuLyoqXG4gKiBgU29ja2V0YCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFNvY2tldCAoaW8sIG5zcCwgb3B0cykge1xuICB0aGlzLmlvID0gaW87XG4gIHRoaXMubnNwID0gbnNwO1xuICB0aGlzLmpzb24gPSB0aGlzOyAvLyBjb21wYXRcbiAgdGhpcy5pZHMgPSAwO1xuICB0aGlzLmFja3MgPSB7fTtcbiAgdGhpcy5yZWNlaXZlQnVmZmVyID0gW107XG4gIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICB0aGlzLmRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gIHRoaXMuZmxhZ3MgPSB7fTtcbiAgaWYgKG9wdHMgJiYgb3B0cy5xdWVyeSkge1xuICAgIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5O1xuICB9XG4gIGlmICh0aGlzLmlvLmF1dG9Db25uZWN0KSB0aGlzLm9wZW4oKTtcbn1cblxuLyoqXG4gKiBNaXggaW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoU29ja2V0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogU3Vic2NyaWJlIHRvIG9wZW4sIGNsb3NlIGFuZCBwYWNrZXQgZXZlbnRzXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5zdWJFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLnN1YnMpIHJldHVybjtcblxuICB2YXIgaW8gPSB0aGlzLmlvO1xuICB0aGlzLnN1YnMgPSBbXG4gICAgb24oaW8sICdvcGVuJywgYmluZCh0aGlzLCAnb25vcGVuJykpLFxuICAgIG9uKGlvLCAncGFja2V0JywgYmluZCh0aGlzLCAnb25wYWNrZXQnKSksXG4gICAgb24oaW8sICdjbG9zZScsIGJpbmQodGhpcywgJ29uY2xvc2UnKSlcbiAgXTtcbn07XG5cbi8qKlxuICogXCJPcGVuc1wiIHRoZSBzb2NrZXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9wZW4gPVxuU29ja2V0LnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5jb25uZWN0ZWQpIHJldHVybiB0aGlzO1xuXG4gIHRoaXMuc3ViRXZlbnRzKCk7XG4gIHRoaXMuaW8ub3BlbigpOyAvLyBlbnN1cmUgb3BlblxuICBpZiAoJ29wZW4nID09PSB0aGlzLmlvLnJlYWR5U3RhdGUpIHRoaXMub25vcGVuKCk7XG4gIHRoaXMuZW1pdCgnY29ubmVjdGluZycpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2VuZHMgYSBgbWVzc2FnZWAgZXZlbnQuXG4gKlxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gIGFyZ3MudW5zaGlmdCgnbWVzc2FnZScpO1xuICB0aGlzLmVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBgZW1pdGAuXG4gKiBJZiB0aGUgZXZlbnQgaXMgaW4gYGV2ZW50c2AsIGl0J3MgZW1pdHRlZCBub3JtYWxseS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldikge1xuICBpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGV2KSkge1xuICAgIGVtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICB2YXIgcGFja2V0ID0ge1xuICAgIHR5cGU6ICh0aGlzLmZsYWdzLmJpbmFyeSAhPT0gdW5kZWZpbmVkID8gdGhpcy5mbGFncy5iaW5hcnkgOiBoYXNCaW4oYXJncykpID8gcGFyc2VyLkJJTkFSWV9FVkVOVCA6IHBhcnNlci5FVkVOVCxcbiAgICBkYXRhOiBhcmdzXG4gIH07XG5cbiAgcGFja2V0Lm9wdGlvbnMgPSB7fTtcbiAgcGFja2V0Lm9wdGlvbnMuY29tcHJlc3MgPSAhdGhpcy5mbGFncyB8fCBmYWxzZSAhPT0gdGhpcy5mbGFncy5jb21wcmVzcztcblxuICAvLyBldmVudCBhY2sgY2FsbGJhY2tcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pIHtcbiAgICBkZWJ1ZygnZW1pdHRpbmcgcGFja2V0IHdpdGggYWNrIGlkICVkJywgdGhpcy5pZHMpO1xuICAgIHRoaXMuYWNrc1t0aGlzLmlkc10gPSBhcmdzLnBvcCgpO1xuICAgIHBhY2tldC5pZCA9IHRoaXMuaWRzKys7XG4gIH1cblxuICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICB0aGlzLnBhY2tldChwYWNrZXQpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gIH1cblxuICB0aGlzLmZsYWdzID0ge307XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNlbmRzIGEgcGFja2V0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICBwYWNrZXQubnNwID0gdGhpcy5uc3A7XG4gIHRoaXMuaW8ucGFja2V0KHBhY2tldCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGVuZ2luZSBgb3BlbmAuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCd0cmFuc3BvcnQgaXMgb3BlbiAtIGNvbm5lY3RpbmcnKTtcblxuICAvLyB3cml0ZSBjb25uZWN0IHBhY2tldCBpZiBuZWNlc3NhcnlcbiAgaWYgKCcvJyAhPT0gdGhpcy5uc3ApIHtcbiAgICBpZiAodGhpcy5xdWVyeSkge1xuICAgICAgdmFyIHF1ZXJ5ID0gdHlwZW9mIHRoaXMucXVlcnkgPT09ICdvYmplY3QnID8gcGFyc2Vxcy5lbmNvZGUodGhpcy5xdWVyeSkgOiB0aGlzLnF1ZXJ5O1xuICAgICAgZGVidWcoJ3NlbmRpbmcgY29ubmVjdCBwYWNrZXQgd2l0aCBxdWVyeSAlcycsIHF1ZXJ5KTtcbiAgICAgIHRoaXMucGFja2V0KHt0eXBlOiBwYXJzZXIuQ09OTkVDVCwgcXVlcnk6IHF1ZXJ5fSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFja2V0KHt0eXBlOiBwYXJzZXIuQ09OTkVDVH0pO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlbmdpbmUgYGNsb3NlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVhc29uXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gIGRlYnVnKCdjbG9zZSAoJXMpJywgcmVhc29uKTtcbiAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgdGhpcy5kaXNjb25uZWN0ZWQgPSB0cnVlO1xuICBkZWxldGUgdGhpcy5pZDtcbiAgdGhpcy5lbWl0KCdkaXNjb25uZWN0JywgcmVhc29uKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHdpdGggc29ja2V0IHBhY2tldC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9ucGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICB2YXIgc2FtZU5hbWVzcGFjZSA9IHBhY2tldC5uc3AgPT09IHRoaXMubnNwO1xuICB2YXIgcm9vdE5hbWVzcGFjZUVycm9yID0gcGFja2V0LnR5cGUgPT09IHBhcnNlci5FUlJPUiAmJiBwYWNrZXQubnNwID09PSAnLyc7XG5cbiAgaWYgKCFzYW1lTmFtZXNwYWNlICYmICFyb290TmFtZXNwYWNlRXJyb3IpIHJldHVybjtcblxuICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgY2FzZSBwYXJzZXIuQ09OTkVDVDpcbiAgICAgIHRoaXMub25jb25uZWN0KCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkVWRU5UOlxuICAgICAgdGhpcy5vbmV2ZW50KHBhY2tldCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkJJTkFSWV9FVkVOVDpcbiAgICAgIHRoaXMub25ldmVudChwYWNrZXQpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5BQ0s6XG4gICAgICB0aGlzLm9uYWNrKHBhY2tldCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkJJTkFSWV9BQ0s6XG4gICAgICB0aGlzLm9uYWNrKHBhY2tldCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgcGFyc2VyLkRJU0NPTk5FQ1Q6XG4gICAgICB0aGlzLm9uZGlzY29ubmVjdCgpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlIHBhcnNlci5FUlJPUjpcbiAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBwYWNrZXQuZGF0YSk7XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBldmVudC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uZXZlbnQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gIHZhciBhcmdzID0gcGFja2V0LmRhdGEgfHwgW107XG4gIGRlYnVnKCdlbWl0dGluZyBldmVudCAlaicsIGFyZ3MpO1xuXG4gIGlmIChudWxsICE9IHBhY2tldC5pZCkge1xuICAgIGRlYnVnKCdhdHRhY2hpbmcgYWNrIGNhbGxiYWNrIHRvIGV2ZW50Jyk7XG4gICAgYXJncy5wdXNoKHRoaXMuYWNrKHBhY2tldC5pZCkpO1xuICB9XG5cbiAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnJlY2VpdmVCdWZmZXIucHVzaChhcmdzKTtcbiAgfVxufTtcblxuLyoqXG4gKiBQcm9kdWNlcyBhbiBhY2sgY2FsbGJhY2sgdG8gZW1pdCB3aXRoIGFuIGV2ZW50LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuYWNrID0gZnVuY3Rpb24gKGlkKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHNlbnQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBwcmV2ZW50IGRvdWJsZSBjYWxsYmFja3NcbiAgICBpZiAoc2VudCkgcmV0dXJuO1xuICAgIHNlbnQgPSB0cnVlO1xuICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICAgIGRlYnVnKCdzZW5kaW5nIGFjayAlaicsIGFyZ3MpO1xuXG4gICAgc2VsZi5wYWNrZXQoe1xuICAgICAgdHlwZTogaGFzQmluKGFyZ3MpID8gcGFyc2VyLkJJTkFSWV9BQ0sgOiBwYXJzZXIuQUNLLFxuICAgICAgaWQ6IGlkLFxuICAgICAgZGF0YTogYXJnc1xuICAgIH0pO1xuICB9O1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBhY2tub3dsZWdlbWVudC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uYWNrID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICB2YXIgYWNrID0gdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgYWNrKSB7XG4gICAgZGVidWcoJ2NhbGxpbmcgYWNrICVzIHdpdGggJWonLCBwYWNrZXQuaWQsIHBhY2tldC5kYXRhKTtcbiAgICBhY2suYXBwbHkodGhpcywgcGFja2V0LmRhdGEpO1xuICAgIGRlbGV0ZSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgfSBlbHNlIHtcbiAgICBkZWJ1ZygnYmFkIGFjayAlcycsIHBhY2tldC5pZCk7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gc2VydmVyIGNvbm5lY3QuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgdGhpcy5kaXNjb25uZWN0ZWQgPSBmYWxzZTtcbiAgdGhpcy5lbWl0KCdjb25uZWN0Jyk7XG4gIHRoaXMuZW1pdEJ1ZmZlcmVkKCk7XG59O1xuXG4vKipcbiAqIEVtaXQgYnVmZmVyZWQgZXZlbnRzIChyZWNlaXZlZCBhbmQgZW1pdHRlZCkuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5lbWl0QnVmZmVyZWQgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpO1xuICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5yZWNlaXZlQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgZW1pdC5hcHBseSh0aGlzLCB0aGlzLnJlY2VpdmVCdWZmZXJbaV0pO1xuICB9XG4gIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuXG4gIGZvciAoaSA9IDA7IGkgPCB0aGlzLnNlbmRCdWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICB0aGlzLnBhY2tldCh0aGlzLnNlbmRCdWZmZXJbaV0pO1xuICB9XG4gIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgZGlzY29ubmVjdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ3NlcnZlciBkaXNjb25uZWN0ICglcyknLCB0aGlzLm5zcCk7XG4gIHRoaXMuZGVzdHJveSgpO1xuICB0aGlzLm9uY2xvc2UoJ2lvIHNlcnZlciBkaXNjb25uZWN0Jyk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGZvcmNlZCBjbGllbnQvc2VydmVyIHNpZGUgZGlzY29ubmVjdGlvbnMsXG4gKiB0aGlzIG1ldGhvZCBlbnN1cmVzIHRoZSBtYW5hZ2VyIHN0b3BzIHRyYWNraW5nIHVzIGFuZFxuICogdGhhdCByZWNvbm5lY3Rpb25zIGRvbid0IGdldCB0cmlnZ2VyZWQgZm9yIHRoaXMuXG4gKlxuICogQGFwaSBwcml2YXRlLlxuICovXG5cblNvY2tldC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuc3Vicykge1xuICAgIC8vIGNsZWFuIHN1YnNjcmlwdGlvbnMgdG8gYXZvaWQgcmVjb25uZWN0aW9uc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnN1YnNbaV0uZGVzdHJveSgpO1xuICAgIH1cbiAgICB0aGlzLnN1YnMgPSBudWxsO1xuICB9XG5cbiAgdGhpcy5pby5kZXN0cm95KHRoaXMpO1xufTtcblxuLyoqXG4gKiBEaXNjb25uZWN0cyB0aGUgc29ja2V0IG1hbnVhbGx5LlxuICpcbiAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmNsb3NlID1cblNvY2tldC5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgZGVidWcoJ3BlcmZvcm1pbmcgZGlzY29ubmVjdCAoJXMpJywgdGhpcy5uc3ApO1xuICAgIHRoaXMucGFja2V0KHsgdHlwZTogcGFyc2VyLkRJU0NPTk5FQ1QgfSk7XG4gIH1cblxuICAvLyByZW1vdmUgc29ja2V0IGZyb20gcG9vbFxuICB0aGlzLmRlc3Ryb3koKTtcblxuICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAvLyBmaXJlIGV2ZW50c1xuICAgIHRoaXMub25jbG9zZSgnaW8gY2xpZW50IGRpc2Nvbm5lY3QnKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgY29tcHJlc3MgZmxhZy5cbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlmIGB0cnVlYCwgY29tcHJlc3NlcyB0aGUgc2VuZGluZyBkYXRhXG4gKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5jb21wcmVzcyA9IGZ1bmN0aW9uIChjb21wcmVzcykge1xuICB0aGlzLmZsYWdzLmNvbXByZXNzID0gY29tcHJlc3M7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBiaW5hcnkgZmxhZ1xuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gd2hldGhlciB0aGUgZW1pdHRlZCBkYXRhIGNvbnRhaW5zIGJpbmFyeVxuICogQHJldHVybiB7U29ja2V0fSBzZWxmXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblNvY2tldC5wcm90b3R5cGUuYmluYXJ5ID0gZnVuY3Rpb24gKGJpbmFyeSkge1xuICB0aGlzLmZsYWdzLmJpbmFyeSA9IGJpbmFyeTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuIiwiXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gb247XG5cbi8qKlxuICogSGVscGVyIGZvciBzdWJzY3JpcHRpb25zLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEV2ZW50RW1pdHRlcn0gb2JqIHdpdGggYEVtaXR0ZXJgIG1peGluIG9yIGBFdmVudEVtaXR0ZXJgXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gb24gKG9iaiwgZXYsIGZuKSB7XG4gIG9iai5vbihldiwgZm4pO1xuICByZXR1cm4ge1xuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgIG9iai5yZW1vdmVMaXN0ZW5lcihldiwgZm4pO1xuICAgIH1cbiAgfTtcbn1cbiIsIi8qKlxuICogU2xpY2UgcmVmZXJlbmNlLlxuICovXG5cbnZhciBzbGljZSA9IFtdLnNsaWNlO1xuXG4vKipcbiAqIEJpbmQgYG9iamAgdG8gYGZuYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gZm4gb3Igc3RyaW5nXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmosIGZuKXtcbiAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiBmbikgZm4gPSBvYmpbZm5dO1xuICBpZiAoJ2Z1bmN0aW9uJyAhPSB0eXBlb2YgZm4pIHRocm93IG5ldyBFcnJvcignYmluZCgpIHJlcXVpcmVzIGEgZnVuY3Rpb24nKTtcbiAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gIHJldHVybiBmdW5jdGlvbigpe1xuICAgIHJldHVybiBmbi5hcHBseShvYmosIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICB9XG59O1xuIiwiaW1wb3J0ICogYXMgaW8gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbnZhciBzb2NrZXQgPSBpbygnaHR0cDovL2xvY2FsaG9zdDo1MDAwLycpO1xuc29ja2V0Lm9uKCdtZXNzYWdlJywgZnVuY3Rpb24oZGF0YTogYW55KSB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG59KTtcblxudmFyIG1vdmVtZW50ID0ge1xuICAgIHVwOiBmYWxzZSxcbiAgICBkb3duOiBmYWxzZSxcbiAgICBsZWZ0OiBmYWxzZSxcbiAgICByaWdodDogZmFsc2Vcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihldmVudDogYW55KSB7XG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICAgIGNhc2UgNjU6IC8vIEFcbiAgICAgICAgICAgIG1vdmVtZW50LmxlZnQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODc6IC8vIFdcbiAgICAgICAgICAgIG1vdmVtZW50LnVwID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDY4OiAvLyBEXG4gICAgICAgICAgICBtb3ZlbWVudC5yaWdodCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA4MzogLy8gU1xuICAgICAgICAgICAgbW92ZW1lbnQuZG93biA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59KTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQ6IGFueSkge1xuICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICBjYXNlIDY1OiAvLyBBXG4gICAgICAgICAgICBtb3ZlbWVudC5sZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA4NzogLy8gV1xuICAgICAgICAgICAgbW92ZW1lbnQudXAgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDY4OiAvLyBEXG4gICAgICAgICAgICBtb3ZlbWVudC5yaWdodCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODM6IC8vIFNcbiAgICAgICAgICAgIG1vdmVtZW50LmRvd24gPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn0pO1xuXG5zb2NrZXQuZW1pdCgnbmV3IHBsYXllcicpO1xuc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgc29ja2V0LmVtaXQoJ21vdmVtZW50JywgbW92ZW1lbnQpO1xufSwgMTAwMCAvIDYwKTtcblxuXG5cblxuXG5jb25zdCBjYW52YXM6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbmNhbnZhcy53aWR0aCA9IDgwMDtcbmNhbnZhcy5oZWlnaHQgPSA2MDA7XG5jb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5jb250ZXh0LmZvbnQgPSBcIjIwcHggR2VvcmdpYVwiO1xuc29ja2V0Lm9uKCdzdGF0ZScsIGZ1bmN0aW9uKHBsYXllcnM6IEFycmF5PGFueT4pIHtcbiAgICBjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCA4MDAsIDYwMCk7XG4gICAgZm9yICh2YXIgaWQgaW4gcGxheWVycykge1xuICAgICAgICB2YXIgcGxheWVyID0gcGxheWVyc1tpZF07XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gcGxheWVyLmNvbG9yO1xuICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjb250ZXh0LmFyYyhwbGF5ZXIueCwgcGxheWVyLnksIDEwLCAwLCAyICogTWF0aC5QSSk7XG4gICAgICAgIGNvbnRleHQuZmlsbCgpO1xuXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQoYHg6ICR7cGxheWVyLnh9LCB5OiAke3BsYXllci55fWAsIHBsYXllci54LCBwbGF5ZXIueSk7XG4gICAgfVxufSk7XG4iLCJcbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgdXJsID0gcmVxdWlyZSgnLi91cmwnKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG52YXIgTWFuYWdlciA9IHJlcXVpcmUoJy4vbWFuYWdlcicpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudCcpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGxvb2t1cDtcblxuLyoqXG4gKiBNYW5hZ2VycyBjYWNoZS5cbiAqL1xuXG52YXIgY2FjaGUgPSBleHBvcnRzLm1hbmFnZXJzID0ge307XG5cbi8qKlxuICogTG9va3MgdXAgYW4gZXhpc3RpbmcgYE1hbmFnZXJgIGZvciBtdWx0aXBsZXhpbmcuXG4gKiBJZiB0aGUgdXNlciBzdW1tb25zOlxuICpcbiAqICAgYGlvKCdodHRwOi8vbG9jYWxob3N0L2EnKTtgXG4gKiAgIGBpbygnaHR0cDovL2xvY2FsaG9zdC9iJyk7YFxuICpcbiAqIFdlIHJldXNlIHRoZSBleGlzdGluZyBpbnN0YW5jZSBiYXNlZCBvbiBzYW1lIHNjaGVtZS9wb3J0L2hvc3QsXG4gKiBhbmQgd2UgaW5pdGlhbGl6ZSBzb2NrZXRzIGZvciBlYWNoIG5hbWVzcGFjZS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGxvb2t1cCAodXJpLCBvcHRzKSB7XG4gIGlmICh0eXBlb2YgdXJpID09PSAnb2JqZWN0Jykge1xuICAgIG9wdHMgPSB1cmk7XG4gICAgdXJpID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgdmFyIHBhcnNlZCA9IHVybCh1cmkpO1xuICB2YXIgc291cmNlID0gcGFyc2VkLnNvdXJjZTtcbiAgdmFyIGlkID0gcGFyc2VkLmlkO1xuICB2YXIgcGF0aCA9IHBhcnNlZC5wYXRoO1xuICB2YXIgc2FtZU5hbWVzcGFjZSA9IGNhY2hlW2lkXSAmJiBwYXRoIGluIGNhY2hlW2lkXS5uc3BzO1xuICB2YXIgbmV3Q29ubmVjdGlvbiA9IG9wdHMuZm9yY2VOZXcgfHwgb3B0c1snZm9yY2UgbmV3IGNvbm5lY3Rpb24nXSB8fFxuICAgICAgICAgICAgICAgICAgICAgIGZhbHNlID09PSBvcHRzLm11bHRpcGxleCB8fCBzYW1lTmFtZXNwYWNlO1xuXG4gIHZhciBpbztcblxuICBpZiAobmV3Q29ubmVjdGlvbikge1xuICAgIGRlYnVnKCdpZ25vcmluZyBzb2NrZXQgY2FjaGUgZm9yICVzJywgc291cmNlKTtcbiAgICBpbyA9IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWNhY2hlW2lkXSkge1xuICAgICAgZGVidWcoJ25ldyBpbyBpbnN0YW5jZSBmb3IgJXMnLCBzb3VyY2UpO1xuICAgICAgY2FjaGVbaWRdID0gTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICAgIH1cbiAgICBpbyA9IGNhY2hlW2lkXTtcbiAgfVxuICBpZiAocGFyc2VkLnF1ZXJ5ICYmICFvcHRzLnF1ZXJ5KSB7XG4gICAgb3B0cy5xdWVyeSA9IHBhcnNlZC5xdWVyeTtcbiAgfVxuICByZXR1cm4gaW8uc29ja2V0KHBhcnNlZC5wYXRoLCBvcHRzKTtcbn1cblxuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy5wcm90b2NvbCA9IHBhcnNlci5wcm90b2NvbDtcblxuLyoqXG4gKiBgY29ubmVjdGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVyaVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnRzLmNvbm5lY3QgPSBsb29rdXA7XG5cbi8qKlxuICogRXhwb3NlIGNvbnN0cnVjdG9ycyBmb3Igc3RhbmRhbG9uZSBidWlsZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuTWFuYWdlciA9IHJlcXVpcmUoJy4vbWFuYWdlcicpO1xuZXhwb3J0cy5Tb2NrZXQgPSByZXF1aXJlKCcuL3NvY2tldCcpO1xuIiwiXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHBhcnNldXJpID0gcmVxdWlyZSgncGFyc2V1cmknKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6dXJsJyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB1cmw7XG5cbi8qKlxuICogVVJMIHBhcnNlci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge09iamVjdH0gQW4gb2JqZWN0IG1lYW50IHRvIG1pbWljIHdpbmRvdy5sb2NhdGlvbi5cbiAqICAgICAgICAgICAgICAgICBEZWZhdWx0cyB0byB3aW5kb3cubG9jYXRpb24uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHVybCAodXJpLCBsb2MpIHtcbiAgdmFyIG9iaiA9IHVyaTtcblxuICAvLyBkZWZhdWx0IHRvIHdpbmRvdy5sb2NhdGlvblxuICBsb2MgPSBsb2MgfHwgKHR5cGVvZiBsb2NhdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9jYXRpb24pO1xuICBpZiAobnVsbCA9PSB1cmkpIHVyaSA9IGxvYy5wcm90b2NvbCArICcvLycgKyBsb2MuaG9zdDtcblxuICAvLyByZWxhdGl2ZSBwYXRoIHN1cHBvcnRcbiAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgdXJpKSB7XG4gICAgaWYgKCcvJyA9PT0gdXJpLmNoYXJBdCgwKSkge1xuICAgICAgaWYgKCcvJyA9PT0gdXJpLmNoYXJBdCgxKSkge1xuICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyB1cmk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmkgPSBsb2MuaG9zdCArIHVyaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIS9eKGh0dHBzP3x3c3M/KTpcXC9cXC8vLnRlc3QodXJpKSkge1xuICAgICAgZGVidWcoJ3Byb3RvY29sLWxlc3MgdXJsICVzJywgdXJpKTtcbiAgICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGxvYykge1xuICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyAnLy8nICsgdXJpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJpID0gJ2h0dHBzOi8vJyArIHVyaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwYXJzZVxuICAgIGRlYnVnKCdwYXJzZSAlcycsIHVyaSk7XG4gICAgb2JqID0gcGFyc2V1cmkodXJpKTtcbiAgfVxuXG4gIC8vIG1ha2Ugc3VyZSB3ZSB0cmVhdCBgbG9jYWxob3N0OjgwYCBhbmQgYGxvY2FsaG9zdGAgZXF1YWxseVxuICBpZiAoIW9iai5wb3J0KSB7XG4gICAgaWYgKC9eKGh0dHB8d3MpJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICBvYmoucG9ydCA9ICc4MCc7XG4gICAgfSBlbHNlIGlmICgvXihodHRwfHdzKXMkLy50ZXN0KG9iai5wcm90b2NvbCkpIHtcbiAgICAgIG9iai5wb3J0ID0gJzQ0Myc7XG4gICAgfVxuICB9XG5cbiAgb2JqLnBhdGggPSBvYmoucGF0aCB8fCAnLyc7XG5cbiAgdmFyIGlwdjYgPSBvYmouaG9zdC5pbmRleE9mKCc6JykgIT09IC0xO1xuICB2YXIgaG9zdCA9IGlwdjYgPyAnWycgKyBvYmouaG9zdCArICddJyA6IG9iai5ob3N0O1xuXG4gIC8vIGRlZmluZSB1bmlxdWUgaWRcbiAgb2JqLmlkID0gb2JqLnByb3RvY29sICsgJzovLycgKyBob3N0ICsgJzonICsgb2JqLnBvcnQ7XG4gIC8vIGRlZmluZSBocmVmXG4gIG9iai5ocmVmID0gb2JqLnByb3RvY29sICsgJzovLycgKyBob3N0ICsgKGxvYyAmJiBsb2MucG9ydCA9PT0gb2JqLnBvcnQgPyAnJyA6ICgnOicgKyBvYmoucG9ydCkpO1xuXG4gIHJldHVybiBvYmo7XG59XG4iLCJcbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gY3JlYXRlRGVidWcuZGVidWcgPSBjcmVhdGVEZWJ1Z1snZGVmYXVsdCddID0gY3JlYXRlRGVidWc7XG5leHBvcnRzLmNvZXJjZSA9IGNvZXJjZTtcbmV4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7XG5leHBvcnRzLmVuYWJsZSA9IGVuYWJsZTtcbmV4cG9ydHMuZW5hYmxlZCA9IGVuYWJsZWQ7XG5leHBvcnRzLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblxuLyoqXG4gKiBBY3RpdmUgYGRlYnVnYCBpbnN0YW5jZXMuXG4gKi9cbmV4cG9ydHMuaW5zdGFuY2VzID0gW107XG5cbi8qKlxuICogVGhlIGN1cnJlbnRseSBhY3RpdmUgZGVidWcgbW9kZSBuYW1lcywgYW5kIG5hbWVzIHRvIHNraXAuXG4gKi9cblxuZXhwb3J0cy5uYW1lcyA9IFtdO1xuZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4vKipcbiAqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cbiAqXG4gKiBWYWxpZCBrZXkgbmFtZXMgYXJlIGEgc2luZ2xlLCBsb3dlciBvciB1cHBlci1jYXNlIGxldHRlciwgaS5lLiBcIm5cIiBhbmQgXCJOXCIuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzID0ge307XG5cbi8qKlxuICogU2VsZWN0IGEgY29sb3IuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZWxlY3RDb2xvcihuYW1lc3BhY2UpIHtcbiAgdmFyIGhhc2ggPSAwLCBpO1xuXG4gIGZvciAoaSBpbiBuYW1lc3BhY2UpIHtcbiAgICBoYXNoICA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgbmFtZXNwYWNlLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcbiAgfVxuXG4gIHJldHVybiBleHBvcnRzLmNvbG9yc1tNYXRoLmFicyhoYXNoKSAlIGV4cG9ydHMuY29sb3JzLmxlbmd0aF07XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZGVidWdnZXIgd2l0aCB0aGUgZ2l2ZW4gYG5hbWVzcGFjZWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGNyZWF0ZURlYnVnKG5hbWVzcGFjZSkge1xuXG4gIHZhciBwcmV2VGltZTtcblxuICBmdW5jdGlvbiBkZWJ1ZygpIHtcbiAgICAvLyBkaXNhYmxlZD9cbiAgICBpZiAoIWRlYnVnLmVuYWJsZWQpIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gZGVidWc7XG5cbiAgICAvLyBzZXQgYGRpZmZgIHRpbWVzdGFtcFxuICAgIHZhciBjdXJyID0gK25ldyBEYXRlKCk7XG4gICAgdmFyIG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcbiAgICBzZWxmLmRpZmYgPSBtcztcbiAgICBzZWxmLnByZXYgPSBwcmV2VGltZTtcbiAgICBzZWxmLmN1cnIgPSBjdXJyO1xuICAgIHByZXZUaW1lID0gY3VycjtcblxuICAgIC8vIHR1cm4gdGhlIGBhcmd1bWVudHNgIGludG8gYSBwcm9wZXIgQXJyYXlcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgYXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgYXJnc1swXSkge1xuICAgICAgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJU9cbiAgICAgIGFyZ3MudW5zaGlmdCgnJU8nKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgYXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIGZ1bmN0aW9uKG1hdGNoLCBmb3JtYXQpIHtcbiAgICAgIC8vIGlmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbiAgICAgIGlmIChtYXRjaCA9PT0gJyUlJykgcmV0dXJuIG1hdGNoO1xuICAgICAgaW5kZXgrKztcbiAgICAgIHZhciBmb3JtYXR0ZXIgPSBleHBvcnRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZm9ybWF0dGVyKSB7XG4gICAgICAgIHZhciB2YWwgPSBhcmdzW2luZGV4XTtcbiAgICAgICAgbWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG4gICAgICAgIC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbiAgICAgICAgYXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpbmRleC0tO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoO1xuICAgIH0pO1xuXG4gICAgLy8gYXBwbHkgZW52LXNwZWNpZmljIGZvcm1hdHRpbmcgKGNvbG9ycywgZXRjLilcbiAgICBleHBvcnRzLmZvcm1hdEFyZ3MuY2FsbChzZWxmLCBhcmdzKTtcblxuICAgIHZhciBsb2dGbiA9IGRlYnVnLmxvZyB8fCBleHBvcnRzLmxvZyB8fCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpO1xuICAgIGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG5cbiAgZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuICBkZWJ1Zy5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKG5hbWVzcGFjZSk7XG4gIGRlYnVnLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7XG4gIGRlYnVnLmNvbG9yID0gc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcbiAgZGVidWcuZGVzdHJveSA9IGRlc3Ryb3k7XG5cbiAgLy8gZW52LXNwZWNpZmljIGluaXRpYWxpemF0aW9uIGxvZ2ljIGZvciBkZWJ1ZyBpbnN0YW5jZXNcbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBleHBvcnRzLmluaXQpIHtcbiAgICBleHBvcnRzLmluaXQoZGVidWcpO1xuICB9XG5cbiAgZXhwb3J0cy5pbnN0YW5jZXMucHVzaChkZWJ1Zyk7XG5cbiAgcmV0dXJuIGRlYnVnO1xufVxuXG5mdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgdmFyIGluZGV4ID0gZXhwb3J0cy5pbnN0YW5jZXMuaW5kZXhPZih0aGlzKTtcbiAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgIGV4cG9ydHMuaW5zdGFuY2VzLnNwbGljZShpbmRleCwgMSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICBleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7XG5cbiAgZXhwb3J0cy5uYW1lcyA9IFtdO1xuICBleHBvcnRzLnNraXBzID0gW107XG5cbiAgdmFyIGk7XG4gIHZhciBzcGxpdCA9ICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycgPyBuYW1lc3BhY2VzIDogJycpLnNwbGl0KC9bXFxzLF0rLyk7XG4gIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cbiAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKCFzcGxpdFtpXSkgY29udGludWU7IC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG4gICAgbmFtZXNwYWNlcyA9IHNwbGl0W2ldLnJlcGxhY2UoL1xcKi9nLCAnLio/Jyk7XG4gICAgaWYgKG5hbWVzcGFjZXNbMF0gPT09ICctJykge1xuICAgICAgZXhwb3J0cy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zdWJzdHIoMSkgKyAnJCcpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuICAgIH1cbiAgfVxuXG4gIGZvciAoaSA9IDA7IGkgPCBleHBvcnRzLmluc3RhbmNlcy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpbnN0YW5jZSA9IGV4cG9ydHMuaW5zdGFuY2VzW2ldO1xuICAgIGluc3RhbmNlLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQoaW5zdGFuY2UubmFtZXNwYWNlKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgZXhwb3J0cy5lbmFibGUoJycpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlZChuYW1lKSB7XG4gIGlmIChuYW1lW25hbWUubGVuZ3RoIC0gMV0gPT09ICcqJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMuc2tpcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoZXhwb3J0cy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENvZXJjZSBgdmFsYC5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG4gIHJldHVybiB2YWw7XG59XG4iLCIvKipcbiAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5sb2cgPSBsb2c7XG5leHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuZXhwb3J0cy5zYXZlID0gc2F2ZTtcbmV4cG9ydHMubG9hZCA9IGxvYWQ7XG5leHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbmV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWVcbiAgICAgICAgICAgICAgICYmICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUuc3RvcmFnZVxuICAgICAgICAgICAgICAgICAgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbFxuICAgICAgICAgICAgICAgICAgOiBsb2NhbHN0b3JhZ2UoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG4gICcjMDAwMENDJywgJyMwMDAwRkYnLCAnIzAwMzNDQycsICcjMDAzM0ZGJywgJyMwMDY2Q0MnLCAnIzAwNjZGRicsICcjMDA5OUNDJyxcbiAgJyMwMDk5RkYnLCAnIzAwQ0MwMCcsICcjMDBDQzMzJywgJyMwMENDNjYnLCAnIzAwQ0M5OScsICcjMDBDQ0NDJywgJyMwMENDRkYnLFxuICAnIzMzMDBDQycsICcjMzMwMEZGJywgJyMzMzMzQ0MnLCAnIzMzMzNGRicsICcjMzM2NkNDJywgJyMzMzY2RkYnLCAnIzMzOTlDQycsXG4gICcjMzM5OUZGJywgJyMzM0NDMDAnLCAnIzMzQ0MzMycsICcjMzNDQzY2JywgJyMzM0NDOTknLCAnIzMzQ0NDQycsICcjMzNDQ0ZGJyxcbiAgJyM2NjAwQ0MnLCAnIzY2MDBGRicsICcjNjYzM0NDJywgJyM2NjMzRkYnLCAnIzY2Q0MwMCcsICcjNjZDQzMzJywgJyM5OTAwQ0MnLFxuICAnIzk5MDBGRicsICcjOTkzM0NDJywgJyM5OTMzRkYnLCAnIzk5Q0MwMCcsICcjOTlDQzMzJywgJyNDQzAwMDAnLCAnI0NDMDAzMycsXG4gICcjQ0MwMDY2JywgJyNDQzAwOTknLCAnI0NDMDBDQycsICcjQ0MwMEZGJywgJyNDQzMzMDAnLCAnI0NDMzMzMycsICcjQ0MzMzY2JyxcbiAgJyNDQzMzOTknLCAnI0NDMzNDQycsICcjQ0MzM0ZGJywgJyNDQzY2MDAnLCAnI0NDNjYzMycsICcjQ0M5OTAwJywgJyNDQzk5MzMnLFxuICAnI0NDQ0MwMCcsICcjQ0NDQzMzJywgJyNGRjAwMDAnLCAnI0ZGMDAzMycsICcjRkYwMDY2JywgJyNGRjAwOTknLCAnI0ZGMDBDQycsXG4gICcjRkYwMEZGJywgJyNGRjMzMDAnLCAnI0ZGMzMzMycsICcjRkYzMzY2JywgJyNGRjMzOTknLCAnI0ZGMzNDQycsICcjRkYzM0ZGJyxcbiAgJyNGRjY2MDAnLCAnI0ZGNjYzMycsICcjRkY5OTAwJywgJyNGRjk5MzMnLCAnI0ZGQ0MwMCcsICcjRkZDQzMzJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG5mdW5jdGlvbiB1c2VDb2xvcnMoKSB7XG4gIC8vIE5COiBJbiBhbiBFbGVjdHJvbiBwcmVsb2FkIHNjcmlwdCwgZG9jdW1lbnQgd2lsbCBiZSBkZWZpbmVkIGJ1dCBub3QgZnVsbHlcbiAgLy8gaW5pdGlhbGl6ZWQuIFNpbmNlIHdlIGtub3cgd2UncmUgaW4gQ2hyb21lLCB3ZSdsbCBqdXN0IGRldGVjdCB0aGlzIGNhc2VcbiAgLy8gZXhwbGljaXRseVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LnByb2Nlc3MgJiYgd2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgYW5kIEVkZ2UgZG8gbm90IHN1cHBvcnQgY29sb3JzLlxuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goLyhlZGdlfHRyaWRlbnQpXFwvKFxcZCspLykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBpcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICAvLyBkb2N1bWVudCBpcyB1bmRlZmluZWQgaW4gcmVhY3QtbmF0aXZlOiBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QtbmF0aXZlL3B1bGwvMTYzMlxuICByZXR1cm4gKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuV2Via2l0QXBwZWFyYW5jZSkgfHxcbiAgICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5jb25zb2xlICYmICh3aW5kb3cuY29uc29sZS5maXJlYnVnIHx8ICh3aW5kb3cuY29uc29sZS5leGNlcHRpb24gJiYgd2luZG93LmNvbnNvbGUudGFibGUpKSkgfHxcbiAgICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcbiAgICAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMSkgfHxcbiAgICAvLyBkb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbih2KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyLm1lc3NhZ2U7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcbiAgdmFyIHVzZUNvbG9ycyA9IHRoaXMudXNlQ29sb3JzO1xuXG4gIGFyZ3NbMF0gPSAodXNlQ29sb3JzID8gJyVjJyA6ICcnKVxuICAgICsgdGhpcy5uYW1lc3BhY2VcbiAgICArICh1c2VDb2xvcnMgPyAnICVjJyA6ICcgJylcbiAgICArIGFyZ3NbMF1cbiAgICArICh1c2VDb2xvcnMgPyAnJWMgJyA6ICcgJylcbiAgICArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICBpZiAoIXVzZUNvbG9ycykgcmV0dXJuO1xuXG4gIHZhciBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcbiAgYXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0JylcblxuICAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuICAvLyBhcmd1bWVudHMgcGFzc2VkIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlICVjLCBzbyB3ZSBuZWVkIHRvXG4gIC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGFzdEMgPSAwO1xuICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16QS1aJV0vZywgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICBpZiAoJyUlJyA9PT0gbWF0Y2gpIHJldHVybjtcbiAgICBpbmRleCsrO1xuICAgIGlmICgnJWMnID09PSBtYXRjaCkge1xuICAgICAgLy8gd2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgbGFzdEMgPSBpbmRleDtcbiAgICB9XG4gIH0pO1xuXG4gIGFyZ3Muc3BsaWNlKGxhc3RDLCAwLCBjKTtcbn1cblxuLyoqXG4gKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUubG9nYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBsb2coKSB7XG4gIC8vIHRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG4gIC8vIHRoZSBgY29uc29sZS5sb2dgIGZ1bmN0aW9uIGRvZXNuJ3QgaGF2ZSAnYXBwbHknXG4gIHJldHVybiAnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbnNvbGVcbiAgICAmJiBjb25zb2xlLmxvZ1xuICAgICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUubG9nLCBjb25zb2xlLCBhcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobnVsbCA9PSBuYW1lc3BhY2VzKSB7XG4gICAgICBleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLmRlYnVnID0gbmFtZXNwYWNlcztcbiAgICB9XG4gIH0gY2F0Y2goZSkge31cbn1cblxuLyoqXG4gKiBMb2FkIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2FkKCkge1xuICB2YXIgcjtcbiAgdHJ5IHtcbiAgICByID0gZXhwb3J0cy5zdG9yYWdlLmRlYnVnO1xuICB9IGNhdGNoKGUpIHt9XG5cbiAgLy8gSWYgZGVidWcgaXNuJ3Qgc2V0IGluIExTLCBhbmQgd2UncmUgaW4gRWxlY3Ryb24sIHRyeSB0byBsb2FkICRERUJVR1xuICBpZiAoIXIgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICdlbnYnIGluIHByb2Nlc3MpIHtcbiAgICByID0gcHJvY2Vzcy5lbnYuREVCVUc7XG4gIH1cblxuICByZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYGxvY2FsU3RvcmFnZS5kZWJ1Z2AgaW5pdGlhbGx5LlxuICovXG5cbmV4cG9ydHMuZW5hYmxlKGxvYWQoKSk7XG5cbi8qKlxuICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxuICpcbiAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xuICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcbiAqIGFuZCB5b3UgYXR0ZW1wdCB0byBhY2Nlc3MgaXQuXG4gKlxuICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9jYWxzdG9yYWdlKCkge1xuICB0cnkge1xuICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9IGNhdGNoIChlKSB7fVxufVxuIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWdbJ2RlZmF1bHQnXSA9IGNyZWF0ZURlYnVnO1xuZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2U7XG5leHBvcnRzLmRpc2FibGUgPSBkaXNhYmxlO1xuZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7XG5leHBvcnRzLmVuYWJsZWQgPSBlbmFibGVkO1xuZXhwb3J0cy5odW1hbml6ZSA9IHJlcXVpcmUoJ21zJyk7XG5cbi8qKlxuICogQWN0aXZlIGBkZWJ1Z2AgaW5zdGFuY2VzLlxuICovXG5leHBvcnRzLmluc3RhbmNlcyA9IFtdO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICB2YXIgcHJldlRpbWU7XG5cbiAgZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgLy8gZGlzYWJsZWQ/XG4gICAgaWYgKCFkZWJ1Zy5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IGRlYnVnO1xuXG4gICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICB2YXIgY3VyciA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgc2VsZi5kaWZmID0gbXM7XG4gICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAvLyB0dXJuIHRoZSBgYXJndW1lbnRzYCBpbnRvIGEgcHJvcGVyIEFycmF5XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbihtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICBpZiAobWF0Y2ggPT09ICclJScpIHJldHVybiBtYXRjaDtcbiAgICAgIGluZGV4Kys7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG4gICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIC8vIGFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG4gICAgZXhwb3J0cy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cbiAgICB2YXIgbG9nRm4gPSBkZWJ1Zy5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuXG4gIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgZGVidWcuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpO1xuICBkZWJ1Zy51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG4gIGRlYnVnLmRlc3Ryb3kgPSBkZXN0cm95O1xuXG4gIC8vIGVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZXhwb3J0cy5pbml0KSB7XG4gICAgZXhwb3J0cy5pbml0KGRlYnVnKTtcbiAgfVxuXG4gIGV4cG9ydHMuaW5zdGFuY2VzLnB1c2goZGVidWcpO1xuXG4gIHJldHVybiBkZWJ1Zztcbn1cblxuZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIHZhciBpbmRleCA9IGV4cG9ydHMuaW5zdGFuY2VzLmluZGV4T2YodGhpcyk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBleHBvcnRzLmluc3RhbmNlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gIHZhciBpO1xuICB2YXIgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICB2YXIgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgZXhwb3J0cy5pbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBleHBvcnRzLmluc3RhbmNlc1tpXTtcbiAgICBpbnN0YW5jZS5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKGluc3RhbmNlLm5hbWVzcGFjZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICBpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnKicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuIiwiLypnbG9iYWwgQmxvYixGaWxlKi9cblxuLyoqXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzXG4gKi9cblxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5Jyk7XG52YXIgaXNCdWYgPSByZXF1aXJlKCcuL2lzLWJ1ZmZlcicpO1xudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnZhciB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nIHx8ICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcgJiYgdG9TdHJpbmcuY2FsbChCbG9iKSA9PT0gJ1tvYmplY3QgQmxvYkNvbnN0cnVjdG9yXScpO1xudmFyIHdpdGhOYXRpdmVGaWxlID0gdHlwZW9mIEZpbGUgPT09ICdmdW5jdGlvbicgfHwgKHR5cGVvZiBGaWxlICE9PSAndW5kZWZpbmVkJyAmJiB0b1N0cmluZy5jYWxsKEZpbGUpID09PSAnW29iamVjdCBGaWxlQ29uc3RydWN0b3JdJyk7XG5cbi8qKlxuICogUmVwbGFjZXMgZXZlcnkgQnVmZmVyIHwgQXJyYXlCdWZmZXIgaW4gcGFja2V0IHdpdGggYSBudW1iZXJlZCBwbGFjZWhvbGRlci5cbiAqIEFueXRoaW5nIHdpdGggYmxvYnMgb3IgZmlsZXMgc2hvdWxkIGJlIGZlZCB0aHJvdWdoIHJlbW92ZUJsb2JzIGJlZm9yZSBjb21pbmdcbiAqIGhlcmUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIHNvY2tldC5pbyBldmVudCBwYWNrZXRcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBkZWNvbnN0cnVjdGVkIHBhY2tldCBhbmQgbGlzdCBvZiBidWZmZXJzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuZGVjb25zdHJ1Y3RQYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQpIHtcbiAgdmFyIGJ1ZmZlcnMgPSBbXTtcbiAgdmFyIHBhY2tldERhdGEgPSBwYWNrZXQuZGF0YTtcbiAgdmFyIHBhY2sgPSBwYWNrZXQ7XG4gIHBhY2suZGF0YSA9IF9kZWNvbnN0cnVjdFBhY2tldChwYWNrZXREYXRhLCBidWZmZXJzKTtcbiAgcGFjay5hdHRhY2htZW50cyA9IGJ1ZmZlcnMubGVuZ3RoOyAvLyBudW1iZXIgb2YgYmluYXJ5ICdhdHRhY2htZW50cydcbiAgcmV0dXJuIHtwYWNrZXQ6IHBhY2ssIGJ1ZmZlcnM6IGJ1ZmZlcnN9O1xufTtcblxuZnVuY3Rpb24gX2RlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgaWYgKCFkYXRhKSByZXR1cm4gZGF0YTtcblxuICBpZiAoaXNCdWYoZGF0YSkpIHtcbiAgICB2YXIgcGxhY2Vob2xkZXIgPSB7IF9wbGFjZWhvbGRlcjogdHJ1ZSwgbnVtOiBidWZmZXJzLmxlbmd0aCB9O1xuICAgIGJ1ZmZlcnMucHVzaChkYXRhKTtcbiAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gIH0gZWxzZSBpZiAoaXNBcnJheShkYXRhKSkge1xuICAgIHZhciBuZXdEYXRhID0gbmV3IEFycmF5KGRhdGEubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIG5ld0RhdGFbaV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgfVxuICAgIHJldHVybiBuZXdEYXRhO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0JyAmJiAhKGRhdGEgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgIHZhciBuZXdEYXRhID0ge307XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIG5ld0RhdGFba2V5XSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0sIGJ1ZmZlcnMpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3RGF0YTtcbiAgfVxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBSZWNvbnN0cnVjdHMgYSBiaW5hcnkgcGFja2V0IGZyb20gaXRzIHBsYWNlaG9sZGVyIHBhY2tldCBhbmQgYnVmZmVyc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgLSBldmVudCBwYWNrZXQgd2l0aCBwbGFjZWhvbGRlcnNcbiAqIEBwYXJhbSB7QXJyYXl9IGJ1ZmZlcnMgLSBiaW5hcnkgYnVmZmVycyB0byBwdXQgaW4gcGxhY2Vob2xkZXIgcG9zaXRpb25zXG4gKiBAcmV0dXJuIHtPYmplY3R9IHJlY29uc3RydWN0ZWQgcGFja2V0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMucmVjb25zdHJ1Y3RQYWNrZXQgPSBmdW5jdGlvbihwYWNrZXQsIGJ1ZmZlcnMpIHtcbiAgcGFja2V0LmRhdGEgPSBfcmVjb25zdHJ1Y3RQYWNrZXQocGFja2V0LmRhdGEsIGJ1ZmZlcnMpO1xuICBwYWNrZXQuYXR0YWNobWVudHMgPSB1bmRlZmluZWQ7IC8vIG5vIGxvbmdlciB1c2VmdWxcbiAgcmV0dXJuIHBhY2tldDtcbn07XG5cbmZ1bmN0aW9uIF9yZWNvbnN0cnVjdFBhY2tldChkYXRhLCBidWZmZXJzKSB7XG4gIGlmICghZGF0YSkgcmV0dXJuIGRhdGE7XG5cbiAgaWYgKGRhdGEgJiYgZGF0YS5fcGxhY2Vob2xkZXIpIHtcbiAgICByZXR1cm4gYnVmZmVyc1tkYXRhLm51bV07IC8vIGFwcHJvcHJpYXRlIGJ1ZmZlciAoc2hvdWxkIGJlIG5hdHVyYWwgb3JkZXIgYW55d2F5KVxuICB9IGVsc2UgaWYgKGlzQXJyYXkoZGF0YSkpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSAnb2JqZWN0Jykge1xuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICBkYXRhW2tleV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldLCBidWZmZXJzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBBc3luY2hyb25vdXNseSByZW1vdmVzIEJsb2JzIG9yIEZpbGVzIGZyb20gZGF0YSB2aWFcbiAqIEZpbGVSZWFkZXIncyByZWFkQXNBcnJheUJ1ZmZlciBtZXRob2QuIFVzZWQgYmVmb3JlIGVuY29kaW5nXG4gKiBkYXRhIGFzIG1zZ3BhY2suIENhbGxzIGNhbGxiYWNrIHdpdGggdGhlIGJsb2JsZXNzIGRhdGEuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnJlbW92ZUJsb2JzID0gZnVuY3Rpb24oZGF0YSwgY2FsbGJhY2spIHtcbiAgZnVuY3Rpb24gX3JlbW92ZUJsb2JzKG9iaiwgY3VyS2V5LCBjb250YWluaW5nT2JqZWN0KSB7XG4gICAgaWYgKCFvYmopIHJldHVybiBvYmo7XG5cbiAgICAvLyBjb252ZXJ0IGFueSBibG9iXG4gICAgaWYgKCh3aXRoTmF0aXZlQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iKSB8fFxuICAgICAgICAod2l0aE5hdGl2ZUZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSkpIHtcbiAgICAgIHBlbmRpbmdCbG9icysrO1xuXG4gICAgICAvLyBhc3luYyBmaWxlcmVhZGVyXG4gICAgICB2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkgeyAvLyB0aGlzLnJlc3VsdCA9PSBhcnJheWJ1ZmZlclxuICAgICAgICBpZiAoY29udGFpbmluZ09iamVjdCkge1xuICAgICAgICAgIGNvbnRhaW5pbmdPYmplY3RbY3VyS2V5XSA9IHRoaXMucmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGJsb2JsZXNzRGF0YSA9IHRoaXMucmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgbm90aGluZyBwZW5kaW5nIGl0cyBjYWxsYmFjayB0aW1lXG4gICAgICAgIGlmKCEgLS1wZW5kaW5nQmxvYnMpIHtcbiAgICAgICAgICBjYWxsYmFjayhibG9ibGVzc0RhdGEpO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKG9iaik7IC8vIGJsb2IgLT4gYXJyYXlidWZmZXJcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqKSkgeyAvLyBoYW5kbGUgYXJyYXlcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIF9yZW1vdmVCbG9icyhvYmpbaV0sIGksIG9iaik7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAhaXNCdWYob2JqKSkgeyAvLyBhbmQgb2JqZWN0XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIF9yZW1vdmVCbG9icyhvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBwZW5kaW5nQmxvYnMgPSAwO1xuICB2YXIgYmxvYmxlc3NEYXRhID0gZGF0YTtcbiAgX3JlbW92ZUJsb2JzKGJsb2JsZXNzRGF0YSk7XG4gIGlmICghcGVuZGluZ0Jsb2JzKSB7XG4gICAgY2FsbGJhY2soYmxvYmxlc3NEYXRhKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbi8vIFN1cHBvcnQgZGVjb2RpbmcgVVJMLXNhZmUgYmFzZTY0IHN0cmluZ3MsIGFzIE5vZGUuanMgZG9lcy5cbi8vIFNlZTogaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQmFzZTY0I1VSTF9hcHBsaWNhdGlvbnNcbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIGdldExlbnMgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyBUcmltIG9mZiBleHRyYSBieXRlcyBhZnRlciBwbGFjZWhvbGRlciBieXRlcyBhcmUgZm91bmRcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYmVhdGdhbW1pdC9iYXNlNjQtanMvaXNzdWVzLzQyXG4gIHZhciB2YWxpZExlbiA9IGI2NC5pbmRleE9mKCc9JylcbiAgaWYgKHZhbGlkTGVuID09PSAtMSkgdmFsaWRMZW4gPSBsZW5cblxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gdmFsaWRMZW4gPT09IGxlblxuICAgID8gMFxuICAgIDogNCAtICh2YWxpZExlbiAlIDQpXG5cbiAgcmV0dXJuIFt2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuXVxufVxuXG4vLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICB2YXIgbGVucyA9IGdldExlbnMoYjY0KVxuICB2YXIgdmFsaWRMZW4gPSBsZW5zWzBdXG4gIHZhciBwbGFjZUhvbGRlcnNMZW4gPSBsZW5zWzFdXG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiBfYnl0ZUxlbmd0aCAoYjY0LCB2YWxpZExlbiwgcGxhY2VIb2xkZXJzTGVuKSB7XG4gIHJldHVybiAoKHZhbGlkTGVuICsgcGxhY2VIb2xkZXJzTGVuKSAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0xlblxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuXG4gIHZhciBhcnIgPSBuZXcgQXJyKF9ieXRlTGVuZ3RoKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikpXG5cbiAgdmFyIGN1ckJ5dGUgPSAwXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICB2YXIgbGVuID0gcGxhY2VIb2xkZXJzTGVuID4gMFxuICAgID8gdmFsaWRMZW4gLSA0XG4gICAgOiB2YWxpZExlblxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsoXG4gICAgICB1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpXG4gICAgKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIHBhcnRzLnB1c2goXG4gICAgICBsb29rdXBbdG1wID4+IDJdICtcbiAgICAgIGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl0gK1xuICAgICAgJz09J1xuICAgIClcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAxMF0gK1xuICAgICAgbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdICtcbiAgICAgICc9J1xuICAgIClcbiAgfVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCJcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zb2NrZXQnKTtcblxuLyoqXG4gKiBFeHBvcnRzIHBhcnNlclxuICpcbiAqIEBhcGkgcHVibGljXG4gKlxuICovXG5tb2R1bGUuZXhwb3J0cy5wYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG4iLCIvKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxudmFyIHRyYW5zcG9ydHMgPSByZXF1aXJlKCcuL3RyYW5zcG9ydHMvaW5kZXgnKTtcbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnY29tcG9uZW50LWVtaXR0ZXInKTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6c29ja2V0Jyk7XG52YXIgaW5kZXggPSByZXF1aXJlKCdpbmRleG9mJyk7XG52YXIgcGFyc2VyID0gcmVxdWlyZSgnZW5naW5lLmlvLXBhcnNlcicpO1xudmFyIHBhcnNldXJpID0gcmVxdWlyZSgncGFyc2V1cmknKTtcbnZhciBwYXJzZXFzID0gcmVxdWlyZSgncGFyc2VxcycpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gU29ja2V0O1xuXG4vKipcbiAqIFNvY2tldCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVyaSBvciBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBTb2NrZXQgKHVyaSwgb3B0cykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU29ja2V0KSkgcmV0dXJuIG5ldyBTb2NrZXQodXJpLCBvcHRzKTtcblxuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICBpZiAodXJpICYmICdvYmplY3QnID09PSB0eXBlb2YgdXJpKSB7XG4gICAgb3B0cyA9IHVyaTtcbiAgICB1cmkgPSBudWxsO1xuICB9XG5cbiAgaWYgKHVyaSkge1xuICAgIHVyaSA9IHBhcnNldXJpKHVyaSk7XG4gICAgb3B0cy5ob3N0bmFtZSA9IHVyaS5ob3N0O1xuICAgIG9wdHMuc2VjdXJlID0gdXJpLnByb3RvY29sID09PSAnaHR0cHMnIHx8IHVyaS5wcm90b2NvbCA9PT0gJ3dzcyc7XG4gICAgb3B0cy5wb3J0ID0gdXJpLnBvcnQ7XG4gICAgaWYgKHVyaS5xdWVyeSkgb3B0cy5xdWVyeSA9IHVyaS5xdWVyeTtcbiAgfSBlbHNlIGlmIChvcHRzLmhvc3QpIHtcbiAgICBvcHRzLmhvc3RuYW1lID0gcGFyc2V1cmkob3B0cy5ob3N0KS5ob3N0O1xuICB9XG5cbiAgdGhpcy5zZWN1cmUgPSBudWxsICE9IG9wdHMuc2VjdXJlID8gb3B0cy5zZWN1cmVcbiAgICA6ICh0eXBlb2YgbG9jYXRpb24gIT09ICd1bmRlZmluZWQnICYmICdodHRwczonID09PSBsb2NhdGlvbi5wcm90b2NvbCk7XG5cbiAgaWYgKG9wdHMuaG9zdG5hbWUgJiYgIW9wdHMucG9ydCkge1xuICAgIC8vIGlmIG5vIHBvcnQgaXMgc3BlY2lmaWVkIG1hbnVhbGx5LCB1c2UgdGhlIHByb3RvY29sIGRlZmF1bHRcbiAgICBvcHRzLnBvcnQgPSB0aGlzLnNlY3VyZSA/ICc0NDMnIDogJzgwJztcbiAgfVxuXG4gIHRoaXMuYWdlbnQgPSBvcHRzLmFnZW50IHx8IGZhbHNlO1xuICB0aGlzLmhvc3RuYW1lID0gb3B0cy5ob3N0bmFtZSB8fFxuICAgICh0eXBlb2YgbG9jYXRpb24gIT09ICd1bmRlZmluZWQnID8gbG9jYXRpb24uaG9zdG5hbWUgOiAnbG9jYWxob3N0Jyk7XG4gIHRoaXMucG9ydCA9IG9wdHMucG9ydCB8fCAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBsb2NhdGlvbi5wb3J0XG4gICAgICA/IGxvY2F0aW9uLnBvcnRcbiAgICAgIDogKHRoaXMuc2VjdXJlID8gNDQzIDogODApKTtcbiAgdGhpcy5xdWVyeSA9IG9wdHMucXVlcnkgfHwge307XG4gIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHRoaXMucXVlcnkpIHRoaXMucXVlcnkgPSBwYXJzZXFzLmRlY29kZSh0aGlzLnF1ZXJ5KTtcbiAgdGhpcy51cGdyYWRlID0gZmFsc2UgIT09IG9wdHMudXBncmFkZTtcbiAgdGhpcy5wYXRoID0gKG9wdHMucGF0aCB8fCAnL2VuZ2luZS5pbycpLnJlcGxhY2UoL1xcLyQvLCAnJykgKyAnLyc7XG4gIHRoaXMuZm9yY2VKU09OUCA9ICEhb3B0cy5mb3JjZUpTT05QO1xuICB0aGlzLmpzb25wID0gZmFsc2UgIT09IG9wdHMuanNvbnA7XG4gIHRoaXMuZm9yY2VCYXNlNjQgPSAhIW9wdHMuZm9yY2VCYXNlNjQ7XG4gIHRoaXMuZW5hYmxlc1hEUiA9ICEhb3B0cy5lbmFibGVzWERSO1xuICB0aGlzLnRpbWVzdGFtcFBhcmFtID0gb3B0cy50aW1lc3RhbXBQYXJhbSB8fCAndCc7XG4gIHRoaXMudGltZXN0YW1wUmVxdWVzdHMgPSBvcHRzLnRpbWVzdGFtcFJlcXVlc3RzO1xuICB0aGlzLnRyYW5zcG9ydHMgPSBvcHRzLnRyYW5zcG9ydHMgfHwgWydwb2xsaW5nJywgJ3dlYnNvY2tldCddO1xuICB0aGlzLnRyYW5zcG9ydE9wdGlvbnMgPSBvcHRzLnRyYW5zcG9ydE9wdGlvbnMgfHwge307XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICcnO1xuICB0aGlzLndyaXRlQnVmZmVyID0gW107XG4gIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gIHRoaXMucG9saWN5UG9ydCA9IG9wdHMucG9saWN5UG9ydCB8fCA4NDM7XG4gIHRoaXMucmVtZW1iZXJVcGdyYWRlID0gb3B0cy5yZW1lbWJlclVwZ3JhZGUgfHwgZmFsc2U7XG4gIHRoaXMuYmluYXJ5VHlwZSA9IG51bGw7XG4gIHRoaXMub25seUJpbmFyeVVwZ3JhZGVzID0gb3B0cy5vbmx5QmluYXJ5VXBncmFkZXM7XG4gIHRoaXMucGVyTWVzc2FnZURlZmxhdGUgPSBmYWxzZSAhPT0gb3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSA/IChvcHRzLnBlck1lc3NhZ2VEZWZsYXRlIHx8IHt9KSA6IGZhbHNlO1xuXG4gIGlmICh0cnVlID09PSB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlKSB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlID0ge307XG4gIGlmICh0aGlzLnBlck1lc3NhZ2VEZWZsYXRlICYmIG51bGwgPT0gdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQpIHtcbiAgICB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlLnRocmVzaG9sZCA9IDEwMjQ7XG4gIH1cblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgdGhpcy5wZnggPSBvcHRzLnBmeCB8fCBudWxsO1xuICB0aGlzLmtleSA9IG9wdHMua2V5IHx8IG51bGw7XG4gIHRoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZSB8fCBudWxsO1xuICB0aGlzLmNlcnQgPSBvcHRzLmNlcnQgfHwgbnVsbDtcbiAgdGhpcy5jYSA9IG9wdHMuY2EgfHwgbnVsbDtcbiAgdGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzIHx8IG51bGw7XG4gIHRoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBvcHRzLnJlamVjdFVuYXV0aG9yaXplZDtcbiAgdGhpcy5mb3JjZU5vZGUgPSAhIW9wdHMuZm9yY2VOb2RlO1xuXG4gIC8vIGRldGVjdCBSZWFjdE5hdGl2ZSBlbnZpcm9ubWVudFxuICB0aGlzLmlzUmVhY3ROYXRpdmUgPSAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnc3RyaW5nJyAmJiBuYXZpZ2F0b3IucHJvZHVjdC50b0xvd2VyQ2FzZSgpID09PSAncmVhY3RuYXRpdmUnKTtcblxuICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIG9yIFJlYWN0TmF0aXZlIGNsaWVudFxuICBpZiAodHlwZW9mIHNlbGYgPT09ICd1bmRlZmluZWQnIHx8IHRoaXMuaXNSZWFjdE5hdGl2ZSkge1xuICAgIGlmIChvcHRzLmV4dHJhSGVhZGVycyAmJiBPYmplY3Qua2V5cyhvcHRzLmV4dHJhSGVhZGVycykubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcbiAgICB9XG5cbiAgICBpZiAob3B0cy5sb2NhbEFkZHJlc3MpIHtcbiAgICAgIHRoaXMubG9jYWxBZGRyZXNzID0gb3B0cy5sb2NhbEFkZHJlc3M7XG4gICAgfVxuICB9XG5cbiAgLy8gc2V0IG9uIGhhbmRzaGFrZVxuICB0aGlzLmlkID0gbnVsbDtcbiAgdGhpcy51cGdyYWRlcyA9IG51bGw7XG4gIHRoaXMucGluZ0ludGVydmFsID0gbnVsbDtcbiAgdGhpcy5waW5nVGltZW91dCA9IG51bGw7XG5cbiAgLy8gc2V0IG9uIGhlYXJ0YmVhdFxuICB0aGlzLnBpbmdJbnRlcnZhbFRpbWVyID0gbnVsbDtcbiAgdGhpcy5waW5nVGltZW91dFRpbWVyID0gbnVsbDtcblxuICB0aGlzLm9wZW4oKTtcbn1cblxuU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuXG4vKipcbiAqIE1peCBpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihTb2NrZXQucHJvdG90eXBlKTtcblxuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuU29ja2V0LnByb3RvY29sID0gcGFyc2VyLnByb3RvY29sOyAvLyB0aGlzIGlzIGFuIGludFxuXG4vKipcbiAqIEV4cG9zZSBkZXBzIGZvciBsZWdhY3kgY29tcGF0aWJpbGl0eVxuICogYW5kIHN0YW5kYWxvbmUgYnJvd3NlciBhY2Nlc3MuXG4gKi9cblxuU29ja2V0LlNvY2tldCA9IFNvY2tldDtcblNvY2tldC5UcmFuc3BvcnQgPSByZXF1aXJlKCcuL3RyYW5zcG9ydCcpO1xuU29ja2V0LnRyYW5zcG9ydHMgPSByZXF1aXJlKCcuL3RyYW5zcG9ydHMvaW5kZXgnKTtcblNvY2tldC5wYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG5cbi8qKlxuICogQ3JlYXRlcyB0cmFuc3BvcnQgb2YgdGhlIGdpdmVuIHR5cGUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gKiBAcmV0dXJuIHtUcmFuc3BvcnR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmNyZWF0ZVRyYW5zcG9ydCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGRlYnVnKCdjcmVhdGluZyB0cmFuc3BvcnQgXCIlc1wiJywgbmFtZSk7XG4gIHZhciBxdWVyeSA9IGNsb25lKHRoaXMucXVlcnkpO1xuXG4gIC8vIGFwcGVuZCBlbmdpbmUuaW8gcHJvdG9jb2wgaWRlbnRpZmllclxuICBxdWVyeS5FSU8gPSBwYXJzZXIucHJvdG9jb2w7XG5cbiAgLy8gdHJhbnNwb3J0IG5hbWVcbiAgcXVlcnkudHJhbnNwb3J0ID0gbmFtZTtcblxuICAvLyBwZXItdHJhbnNwb3J0IG9wdGlvbnNcbiAgdmFyIG9wdGlvbnMgPSB0aGlzLnRyYW5zcG9ydE9wdGlvbnNbbmFtZV0gfHwge307XG5cbiAgLy8gc2Vzc2lvbiBpZCBpZiB3ZSBhbHJlYWR5IGhhdmUgb25lXG4gIGlmICh0aGlzLmlkKSBxdWVyeS5zaWQgPSB0aGlzLmlkO1xuXG4gIHZhciB0cmFuc3BvcnQgPSBuZXcgdHJhbnNwb3J0c1tuYW1lXSh7XG4gICAgcXVlcnk6IHF1ZXJ5LFxuICAgIHNvY2tldDogdGhpcyxcbiAgICBhZ2VudDogb3B0aW9ucy5hZ2VudCB8fCB0aGlzLmFnZW50LFxuICAgIGhvc3RuYW1lOiBvcHRpb25zLmhvc3RuYW1lIHx8IHRoaXMuaG9zdG5hbWUsXG4gICAgcG9ydDogb3B0aW9ucy5wb3J0IHx8IHRoaXMucG9ydCxcbiAgICBzZWN1cmU6IG9wdGlvbnMuc2VjdXJlIHx8IHRoaXMuc2VjdXJlLFxuICAgIHBhdGg6IG9wdGlvbnMucGF0aCB8fCB0aGlzLnBhdGgsXG4gICAgZm9yY2VKU09OUDogb3B0aW9ucy5mb3JjZUpTT05QIHx8IHRoaXMuZm9yY2VKU09OUCxcbiAgICBqc29ucDogb3B0aW9ucy5qc29ucCB8fCB0aGlzLmpzb25wLFxuICAgIGZvcmNlQmFzZTY0OiBvcHRpb25zLmZvcmNlQmFzZTY0IHx8IHRoaXMuZm9yY2VCYXNlNjQsXG4gICAgZW5hYmxlc1hEUjogb3B0aW9ucy5lbmFibGVzWERSIHx8IHRoaXMuZW5hYmxlc1hEUixcbiAgICB0aW1lc3RhbXBSZXF1ZXN0czogb3B0aW9ucy50aW1lc3RhbXBSZXF1ZXN0cyB8fCB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzLFxuICAgIHRpbWVzdGFtcFBhcmFtOiBvcHRpb25zLnRpbWVzdGFtcFBhcmFtIHx8IHRoaXMudGltZXN0YW1wUGFyYW0sXG4gICAgcG9saWN5UG9ydDogb3B0aW9ucy5wb2xpY3lQb3J0IHx8IHRoaXMucG9saWN5UG9ydCxcbiAgICBwZng6IG9wdGlvbnMucGZ4IHx8IHRoaXMucGZ4LFxuICAgIGtleTogb3B0aW9ucy5rZXkgfHwgdGhpcy5rZXksXG4gICAgcGFzc3BocmFzZTogb3B0aW9ucy5wYXNzcGhyYXNlIHx8IHRoaXMucGFzc3BocmFzZSxcbiAgICBjZXJ0OiBvcHRpb25zLmNlcnQgfHwgdGhpcy5jZXJ0LFxuICAgIGNhOiBvcHRpb25zLmNhIHx8IHRoaXMuY2EsXG4gICAgY2lwaGVyczogb3B0aW9ucy5jaXBoZXJzIHx8IHRoaXMuY2lwaGVycyxcbiAgICByZWplY3RVbmF1dGhvcml6ZWQ6IG9wdGlvbnMucmVqZWN0VW5hdXRob3JpemVkIHx8IHRoaXMucmVqZWN0VW5hdXRob3JpemVkLFxuICAgIHBlck1lc3NhZ2VEZWZsYXRlOiBvcHRpb25zLnBlck1lc3NhZ2VEZWZsYXRlIHx8IHRoaXMucGVyTWVzc2FnZURlZmxhdGUsXG4gICAgZXh0cmFIZWFkZXJzOiBvcHRpb25zLmV4dHJhSGVhZGVycyB8fCB0aGlzLmV4dHJhSGVhZGVycyxcbiAgICBmb3JjZU5vZGU6IG9wdGlvbnMuZm9yY2VOb2RlIHx8IHRoaXMuZm9yY2VOb2RlLFxuICAgIGxvY2FsQWRkcmVzczogb3B0aW9ucy5sb2NhbEFkZHJlc3MgfHwgdGhpcy5sb2NhbEFkZHJlc3MsXG4gICAgcmVxdWVzdFRpbWVvdXQ6IG9wdGlvbnMucmVxdWVzdFRpbWVvdXQgfHwgdGhpcy5yZXF1ZXN0VGltZW91dCxcbiAgICBwcm90b2NvbHM6IG9wdGlvbnMucHJvdG9jb2xzIHx8IHZvaWQgKDApLFxuICAgIGlzUmVhY3ROYXRpdmU6IHRoaXMuaXNSZWFjdE5hdGl2ZVxuICB9KTtcblxuICByZXR1cm4gdHJhbnNwb3J0O1xufTtcblxuZnVuY3Rpb24gY2xvbmUgKG9iaikge1xuICB2YXIgbyA9IHt9O1xuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIG9baV0gPSBvYmpbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiBvO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIHRyYW5zcG9ydCB0byB1c2UgYW5kIHN0YXJ0cyBwcm9iZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuU29ja2V0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgdHJhbnNwb3J0O1xuICBpZiAodGhpcy5yZW1lbWJlclVwZ3JhZGUgJiYgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyAmJiB0aGlzLnRyYW5zcG9ydHMuaW5kZXhPZignd2Vic29ja2V0JykgIT09IC0xKSB7XG4gICAgdHJhbnNwb3J0ID0gJ3dlYnNvY2tldCc7XG4gIH0gZWxzZSBpZiAoMCA9PT0gdGhpcy50cmFuc3BvcnRzLmxlbmd0aCkge1xuICAgIC8vIEVtaXQgZXJyb3Igb24gbmV4dCB0aWNrIHNvIGl0IGNhbiBiZSBsaXN0ZW5lZCB0b1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCAnTm8gdHJhbnNwb3J0cyBhdmFpbGFibGUnKTtcbiAgICB9LCAwKTtcbiAgICByZXR1cm47XG4gIH0gZWxzZSB7XG4gICAgdHJhbnNwb3J0ID0gdGhpcy50cmFuc3BvcnRzWzBdO1xuICB9XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJztcblxuICAvLyBSZXRyeSB3aXRoIHRoZSBuZXh0IHRyYW5zcG9ydCBpZiB0aGUgdHJhbnNwb3J0IGlzIGRpc2FibGVkIChqc29ucDogZmFsc2UpXG4gIHRyeSB7XG4gICAgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHRoaXMudHJhbnNwb3J0cy5zaGlmdCgpO1xuICAgIHRoaXMub3BlbigpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyYW5zcG9ydC5vcGVuKCk7XG4gIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0LiBEaXNhYmxlcyB0aGUgZXhpc3Rpbmcgb25lIChpZiBhbnkpLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUuc2V0VHJhbnNwb3J0ID0gZnVuY3Rpb24gKHRyYW5zcG9ydCkge1xuICBkZWJ1Zygnc2V0dGluZyB0cmFuc3BvcnQgJXMnLCB0cmFuc3BvcnQubmFtZSk7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBpZiAodGhpcy50cmFuc3BvcnQpIHtcbiAgICBkZWJ1ZygnY2xlYXJpbmcgZXhpc3RpbmcgdHJhbnNwb3J0ICVzJywgdGhpcy50cmFuc3BvcnQubmFtZSk7XG4gICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gIH1cblxuICAvLyBzZXQgdXAgdHJhbnNwb3J0XG4gIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuXG4gIC8vIHNldCB1cCB0cmFuc3BvcnQgbGlzdGVuZXJzXG4gIHRyYW5zcG9ydFxuICAub24oJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub25EcmFpbigpO1xuICB9KVxuICAub24oJ3BhY2tldCcsIGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICBzZWxmLm9uUGFja2V0KHBhY2tldCk7XG4gIH0pXG4gIC5vbignZXJyb3InLCBmdW5jdGlvbiAoZSkge1xuICAgIHNlbGYub25FcnJvcihlKTtcbiAgfSlcbiAgLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9uQ2xvc2UoJ3RyYW5zcG9ydCBjbG9zZScpO1xuICB9KTtcbn07XG5cbi8qKlxuICogUHJvYmVzIGEgdHJhbnNwb3J0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0cmFuc3BvcnQgbmFtZVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5wcm9iZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gIGRlYnVnKCdwcm9iaW5nIHRyYW5zcG9ydCBcIiVzXCInLCBuYW1lKTtcbiAgdmFyIHRyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KG5hbWUsIHsgcHJvYmU6IDEgfSk7XG4gIHZhciBmYWlsZWQgPSBmYWxzZTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBvblRyYW5zcG9ydE9wZW4gKCkge1xuICAgIGlmIChzZWxmLm9ubHlCaW5hcnlVcGdyYWRlcykge1xuICAgICAgdmFyIHVwZ3JhZGVMb3Nlc0JpbmFyeSA9ICF0aGlzLnN1cHBvcnRzQmluYXJ5ICYmIHNlbGYudHJhbnNwb3J0LnN1cHBvcnRzQmluYXJ5O1xuICAgICAgZmFpbGVkID0gZmFpbGVkIHx8IHVwZ3JhZGVMb3Nlc0JpbmFyeTtcbiAgICB9XG4gICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuXG4gICAgZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgb3BlbmVkJywgbmFtZSk7XG4gICAgdHJhbnNwb3J0LnNlbmQoW3sgdHlwZTogJ3BpbmcnLCBkYXRhOiAncHJvYmUnIH1dKTtcbiAgICB0cmFuc3BvcnQub25jZSgncGFja2V0JywgZnVuY3Rpb24gKG1zZykge1xuICAgICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuICAgICAgaWYgKCdwb25nJyA9PT0gbXNnLnR5cGUgJiYgJ3Byb2JlJyA9PT0gbXNnLmRhdGEpIHtcbiAgICAgICAgZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgcG9uZycsIG5hbWUpO1xuICAgICAgICBzZWxmLnVwZ3JhZGluZyA9IHRydWU7XG4gICAgICAgIHNlbGYuZW1pdCgndXBncmFkaW5nJywgdHJhbnNwb3J0KTtcbiAgICAgICAgaWYgKCF0cmFuc3BvcnQpIHJldHVybjtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9ICd3ZWJzb2NrZXQnID09PSB0cmFuc3BvcnQubmFtZTtcblxuICAgICAgICBkZWJ1ZygncGF1c2luZyBjdXJyZW50IHRyYW5zcG9ydCBcIiVzXCInLCBzZWxmLnRyYW5zcG9ydC5uYW1lKTtcbiAgICAgICAgc2VsZi50cmFuc3BvcnQucGF1c2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmIChmYWlsZWQpIHJldHVybjtcbiAgICAgICAgICBpZiAoJ2Nsb3NlZCcgPT09IHNlbGYucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICAgICAgICAgIGRlYnVnKCdjaGFuZ2luZyB0cmFuc3BvcnQgYW5kIHNlbmRpbmcgdXBncmFkZSBwYWNrZXQnKTtcblxuICAgICAgICAgIGNsZWFudXAoKTtcblxuICAgICAgICAgIHNlbGYuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgICAgICAgdHJhbnNwb3J0LnNlbmQoW3sgdHlwZTogJ3VwZ3JhZGUnIH1dKTtcbiAgICAgICAgICBzZWxmLmVtaXQoJ3VwZ3JhZGUnLCB0cmFuc3BvcnQpO1xuICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgc2VsZi51cGdyYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICBzZWxmLmZsdXNoKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgZmFpbGVkJywgbmFtZSk7XG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ3Byb2JlIGVycm9yJyk7XG4gICAgICAgIGVyci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgc2VsZi5lbWl0KCd1cGdyYWRlRXJyb3InLCBlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZnJlZXplVHJhbnNwb3J0ICgpIHtcbiAgICBpZiAoZmFpbGVkKSByZXR1cm47XG5cbiAgICAvLyBBbnkgY2FsbGJhY2sgY2FsbGVkIGJ5IHRyYW5zcG9ydCBzaG91bGQgYmUgaWdub3JlZCBzaW5jZSBub3dcbiAgICBmYWlsZWQgPSB0cnVlO1xuXG4gICAgY2xlYW51cCgpO1xuXG4gICAgdHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgdHJhbnNwb3J0ID0gbnVsbDtcbiAgfVxuXG4gIC8vIEhhbmRsZSBhbnkgZXJyb3IgdGhhdCBoYXBwZW5zIHdoaWxlIHByb2JpbmdcbiAgZnVuY3Rpb24gb25lcnJvciAoZXJyKSB7XG4gICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCdwcm9iZSBlcnJvcjogJyArIGVycik7XG4gICAgZXJyb3IudHJhbnNwb3J0ID0gdHJhbnNwb3J0Lm5hbWU7XG5cbiAgICBmcmVlemVUcmFuc3BvcnQoKTtcblxuICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCBiZWNhdXNlIG9mIGVycm9yOiAlcycsIG5hbWUsIGVycik7XG5cbiAgICBzZWxmLmVtaXQoJ3VwZ3JhZGVFcnJvcicsIGVycm9yKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uVHJhbnNwb3J0Q2xvc2UgKCkge1xuICAgIG9uZXJyb3IoJ3RyYW5zcG9ydCBjbG9zZWQnKTtcbiAgfVxuXG4gIC8vIFdoZW4gdGhlIHNvY2tldCBpcyBjbG9zZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICBmdW5jdGlvbiBvbmNsb3NlICgpIHtcbiAgICBvbmVycm9yKCdzb2NrZXQgY2xvc2VkJyk7XG4gIH1cblxuICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgdXBncmFkZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICBmdW5jdGlvbiBvbnVwZ3JhZGUgKHRvKSB7XG4gICAgaWYgKHRyYW5zcG9ydCAmJiB0by5uYW1lICE9PSB0cmFuc3BvcnQubmFtZSkge1xuICAgICAgZGVidWcoJ1wiJXNcIiB3b3JrcyAtIGFib3J0aW5nIFwiJXNcIicsIHRvLm5hbWUsIHRyYW5zcG9ydC5uYW1lKTtcbiAgICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIG9uIHRoZSB0cmFuc3BvcnQgYW5kIG9uIHNlbGZcbiAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdvcGVuJywgb25UcmFuc3BvcnRPcGVuKTtcbiAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG4gICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdjbG9zZScsIG9uVHJhbnNwb3J0Q2xvc2UpO1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG4gICAgc2VsZi5yZW1vdmVMaXN0ZW5lcigndXBncmFkaW5nJywgb251cGdyYWRlKTtcbiAgfVxuXG4gIHRyYW5zcG9ydC5vbmNlKCdvcGVuJywgb25UcmFuc3BvcnRPcGVuKTtcbiAgdHJhbnNwb3J0Lm9uY2UoJ2Vycm9yJywgb25lcnJvcik7XG4gIHRyYW5zcG9ydC5vbmNlKCdjbG9zZScsIG9uVHJhbnNwb3J0Q2xvc2UpO1xuXG4gIHRoaXMub25jZSgnY2xvc2UnLCBvbmNsb3NlKTtcbiAgdGhpcy5vbmNlKCd1cGdyYWRpbmcnLCBvbnVwZ3JhZGUpO1xuXG4gIHRyYW5zcG9ydC5vcGVuKCk7XG59O1xuXG4vKipcbiAqIENhbGxlZCB3aGVuIGNvbm5lY3Rpb24gaXMgZGVlbWVkIG9wZW4uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgZGVidWcoJ3NvY2tldCBvcGVuJyk7XG4gIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuJztcbiAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9ICd3ZWJzb2NrZXQnID09PSB0aGlzLnRyYW5zcG9ydC5uYW1lO1xuICB0aGlzLmVtaXQoJ29wZW4nKTtcbiAgdGhpcy5mbHVzaCgpO1xuXG4gIC8vIHdlIGNoZWNrIGZvciBgcmVhZHlTdGF0ZWAgaW4gY2FzZSBhbiBgb3BlbmBcbiAgLy8gbGlzdGVuZXIgYWxyZWFkeSBjbG9zZWQgdGhlIHNvY2tldFxuICBpZiAoJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUgJiYgdGhpcy51cGdyYWRlICYmIHRoaXMudHJhbnNwb3J0LnBhdXNlKSB7XG4gICAgZGVidWcoJ3N0YXJ0aW5nIHVwZ3JhZGUgcHJvYmVzJyk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLnVwZ3JhZGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdGhpcy5wcm9iZSh0aGlzLnVwZ3JhZGVzW2ldKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogSGFuZGxlcyBhIHBhY2tldC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICBpZiAoJ29wZW5pbmcnID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUgfHxcbiAgICAgICdjbG9zaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgZGVidWcoJ3NvY2tldCByZWNlaXZlOiB0eXBlIFwiJXNcIiwgZGF0YSBcIiVzXCInLCBwYWNrZXQudHlwZSwgcGFja2V0LmRhdGEpO1xuXG4gICAgdGhpcy5lbWl0KCdwYWNrZXQnLCBwYWNrZXQpO1xuXG4gICAgLy8gU29ja2V0IGlzIGxpdmUgLSBhbnkgcGFja2V0IGNvdW50c1xuICAgIHRoaXMuZW1pdCgnaGVhcnRiZWF0Jyk7XG5cbiAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICBjYXNlICdvcGVuJzpcbiAgICAgICAgdGhpcy5vbkhhbmRzaGFrZShKU09OLnBhcnNlKHBhY2tldC5kYXRhKSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdwb25nJzpcbiAgICAgICAgdGhpcy5zZXRQaW5nKCk7XG4gICAgICAgIHRoaXMuZW1pdCgncG9uZycpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdzZXJ2ZXIgZXJyb3InKTtcbiAgICAgICAgZXJyLmNvZGUgPSBwYWNrZXQuZGF0YTtcbiAgICAgICAgdGhpcy5vbkVycm9yKGVycik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgICAgdGhpcy5lbWl0KCdkYXRhJywgcGFja2V0LmRhdGEpO1xuICAgICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBkZWJ1ZygncGFja2V0IHJlY2VpdmVkIHdpdGggc29ja2V0IHJlYWR5U3RhdGUgXCIlc1wiJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBoYW5kc2hha2UgY29tcGxldGlvbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGFuZHNoYWtlIG9ialxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5vbkhhbmRzaGFrZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHRoaXMuZW1pdCgnaGFuZHNoYWtlJywgZGF0YSk7XG4gIHRoaXMuaWQgPSBkYXRhLnNpZDtcbiAgdGhpcy50cmFuc3BvcnQucXVlcnkuc2lkID0gZGF0YS5zaWQ7XG4gIHRoaXMudXBncmFkZXMgPSB0aGlzLmZpbHRlclVwZ3JhZGVzKGRhdGEudXBncmFkZXMpO1xuICB0aGlzLnBpbmdJbnRlcnZhbCA9IGRhdGEucGluZ0ludGVydmFsO1xuICB0aGlzLnBpbmdUaW1lb3V0ID0gZGF0YS5waW5nVGltZW91dDtcbiAgdGhpcy5vbk9wZW4oKTtcbiAgLy8gSW4gY2FzZSBvcGVuIGhhbmRsZXIgY2xvc2VzIHNvY2tldFxuICBpZiAoJ2Nsb3NlZCcgPT09IHRoaXMucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICB0aGlzLnNldFBpbmcoKTtcblxuICAvLyBQcm9sb25nIGxpdmVuZXNzIG9mIHNvY2tldCBvbiBoZWFydGJlYXRcbiAgdGhpcy5yZW1vdmVMaXN0ZW5lcignaGVhcnRiZWF0JywgdGhpcy5vbkhlYXJ0YmVhdCk7XG4gIHRoaXMub24oJ2hlYXJ0YmVhdCcsIHRoaXMub25IZWFydGJlYXQpO1xufTtcblxuLyoqXG4gKiBSZXNldHMgcGluZyB0aW1lb3V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25IZWFydGJlYXQgPSBmdW5jdGlvbiAodGltZW91dCkge1xuICBjbGVhclRpbWVvdXQodGhpcy5waW5nVGltZW91dFRpbWVyKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBzZWxmLnBpbmdUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoJ2Nsb3NlZCcgPT09IHNlbGYucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICAgIHNlbGYub25DbG9zZSgncGluZyB0aW1lb3V0Jyk7XG4gIH0sIHRpbWVvdXQgfHwgKHNlbGYucGluZ0ludGVydmFsICsgc2VsZi5waW5nVGltZW91dCkpO1xufTtcblxuLyoqXG4gKiBQaW5ncyBzZXJ2ZXIgZXZlcnkgYHRoaXMucGluZ0ludGVydmFsYCBhbmQgZXhwZWN0cyByZXNwb25zZVxuICogd2l0aGluIGB0aGlzLnBpbmdUaW1lb3V0YCBvciBjbG9zZXMgY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLnNldFBpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgY2xlYXJUaW1lb3V0KHNlbGYucGluZ0ludGVydmFsVGltZXIpO1xuICBzZWxmLnBpbmdJbnRlcnZhbFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgZGVidWcoJ3dyaXRpbmcgcGluZyBwYWNrZXQgLSBleHBlY3RpbmcgcG9uZyB3aXRoaW4gJXNtcycsIHNlbGYucGluZ1RpbWVvdXQpO1xuICAgIHNlbGYucGluZygpO1xuICAgIHNlbGYub25IZWFydGJlYXQoc2VsZi5waW5nVGltZW91dCk7XG4gIH0sIHNlbGYucGluZ0ludGVydmFsKTtcbn07XG5cbi8qKlxuKiBTZW5kcyBhIHBpbmcgcGFja2V0LlxuKlxuKiBAYXBpIHByaXZhdGVcbiovXG5cblNvY2tldC5wcm90b3R5cGUucGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLnNlbmRQYWNrZXQoJ3BpbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2VsZi5lbWl0KCdwaW5nJyk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgb24gYGRyYWluYCBldmVudFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25EcmFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy53cml0ZUJ1ZmZlci5zcGxpY2UoMCwgdGhpcy5wcmV2QnVmZmVyTGVuKTtcblxuICAvLyBzZXR0aW5nIHByZXZCdWZmZXJMZW4gPSAwIGlzIHZlcnkgaW1wb3J0YW50XG4gIC8vIGZvciBleGFtcGxlLCB3aGVuIHVwZ3JhZGluZywgdXBncmFkZSBwYWNrZXQgaXMgc2VudCBvdmVyLFxuICAvLyBhbmQgYSBub256ZXJvIHByZXZCdWZmZXJMZW4gY291bGQgY2F1c2UgcHJvYmxlbXMgb24gYGRyYWluYFxuICB0aGlzLnByZXZCdWZmZXJMZW4gPSAwO1xuXG4gIGlmICgwID09PSB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgIHRoaXMuZW1pdCgnZHJhaW4nKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmZsdXNoKCk7XG4gIH1cbn07XG5cbi8qKlxuICogRmx1c2ggd3JpdGUgYnVmZmVycy5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKCkge1xuICBpZiAoJ2Nsb3NlZCcgIT09IHRoaXMucmVhZHlTdGF0ZSAmJiB0aGlzLnRyYW5zcG9ydC53cml0YWJsZSAmJlxuICAgICF0aGlzLnVwZ3JhZGluZyAmJiB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgIGRlYnVnKCdmbHVzaGluZyAlZCBwYWNrZXRzIGluIHNvY2tldCcsIHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKTtcbiAgICB0aGlzLnRyYW5zcG9ydC5zZW5kKHRoaXMud3JpdGVCdWZmZXIpO1xuICAgIC8vIGtlZXAgdHJhY2sgb2YgY3VycmVudCBsZW5ndGggb2Ygd3JpdGVCdWZmZXJcbiAgICAvLyBzcGxpY2Ugd3JpdGVCdWZmZXIgYW5kIGNhbGxiYWNrQnVmZmVyIG9uIGBkcmFpbmBcbiAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aDtcbiAgICB0aGlzLmVtaXQoJ2ZsdXNoJyk7XG4gIH1cbn07XG5cbi8qKlxuICogU2VuZHMgYSBtZXNzYWdlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAqIEByZXR1cm4ge1NvY2tldH0gZm9yIGNoYWluaW5nLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLndyaXRlID1cblNvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChtc2csIG9wdGlvbnMsIGZuKSB7XG4gIHRoaXMuc2VuZFBhY2tldCgnbWVzc2FnZScsIG1zZywgb3B0aW9ucywgZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2VuZHMgYSBwYWNrZXQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhY2tldCB0eXBlLlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuU29ja2V0LnByb3RvdHlwZS5zZW5kUGFja2V0ID0gZnVuY3Rpb24gKHR5cGUsIGRhdGEsIG9wdGlvbnMsIGZuKSB7XG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZGF0YSkge1xuICAgIGZuID0gZGF0YTtcbiAgICBkYXRhID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBvcHRpb25zKSB7XG4gICAgZm4gPSBvcHRpb25zO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG5cbiAgaWYgKCdjbG9zaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdjbG9zZWQnID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgb3B0aW9ucy5jb21wcmVzcyA9IGZhbHNlICE9PSBvcHRpb25zLmNvbXByZXNzO1xuXG4gIHZhciBwYWNrZXQgPSB7XG4gICAgdHlwZTogdHlwZSxcbiAgICBkYXRhOiBkYXRhLFxuICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgfTtcbiAgdGhpcy5lbWl0KCdwYWNrZXRDcmVhdGUnLCBwYWNrZXQpO1xuICB0aGlzLndyaXRlQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgaWYgKGZuKSB0aGlzLm9uY2UoJ2ZsdXNoJywgZm4pO1xuICB0aGlzLmZsdXNoKCk7XG59O1xuXG4vKipcbiAqIENsb3NlcyB0aGUgY29ubmVjdGlvbi5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAoJ29wZW5pbmcnID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2luZyc7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgIHRoaXMub25jZSgnZHJhaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgd2FpdEZvclVwZ3JhZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xvc2UoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZSAoKSB7XG4gICAgc2VsZi5vbkNsb3NlKCdmb3JjZWQgY2xvc2UnKTtcbiAgICBkZWJ1Zygnc29ja2V0IGNsb3NpbmcgLSB0ZWxsaW5nIHRyYW5zcG9ydCB0byBjbG9zZScpO1xuICAgIHNlbGYudHJhbnNwb3J0LmNsb3NlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhbnVwQW5kQ2xvc2UgKCkge1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGUnLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGVFcnJvcicsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgY2xvc2UoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHdhaXRGb3JVcGdyYWRlICgpIHtcbiAgICAvLyB3YWl0IGZvciB1cGdyYWRlIHRvIGZpbmlzaCBzaW5jZSB3ZSBjYW4ndCBzZW5kIHBhY2tldHMgd2hpbGUgcGF1c2luZyBhIHRyYW5zcG9ydFxuICAgIHNlbGYub25jZSgndXBncmFkZScsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgc2VsZi5vbmNlKCd1cGdyYWRlRXJyb3InLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBlcnJvclxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgZGVidWcoJ3NvY2tldCBlcnJvciAlaicsIGVycik7XG4gIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcbiAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIHRoaXMub25DbG9zZSgndHJhbnNwb3J0IGVycm9yJywgZXJyKTtcbn07XG5cbi8qKlxuICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblNvY2tldC5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uIChyZWFzb24sIGRlc2MpIHtcbiAgaWYgKCdvcGVuaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdjbG9zaW5nJyA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgZGVidWcoJ3NvY2tldCBjbG9zZSB3aXRoIHJlYXNvbjogXCIlc1wiJywgcmVhc29uKTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBjbGVhciB0aW1lcnNcbiAgICBjbGVhclRpbWVvdXQodGhpcy5waW5nSW50ZXJ2YWxUaW1lcik7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG5cbiAgICAvLyBzdG9wIGV2ZW50IGZyb20gZmlyaW5nIGFnYWluIGZvciB0cmFuc3BvcnRcbiAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2Nsb3NlJyk7XG5cbiAgICAvLyBlbnN1cmUgdHJhbnNwb3J0IHdvbid0IHN0YXkgb3BlblxuICAgIHRoaXMudHJhbnNwb3J0LmNsb3NlKCk7XG5cbiAgICAvLyBpZ25vcmUgZnVydGhlciB0cmFuc3BvcnQgY29tbXVuaWNhdGlvblxuICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuXG4gICAgLy8gc2V0IHJlYWR5IHN0YXRlXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG5cbiAgICAvLyBjbGVhciBzZXNzaW9uIGlkXG4gICAgdGhpcy5pZCA9IG51bGw7XG5cbiAgICAvLyBlbWl0IGNsb3NlIGV2ZW50XG4gICAgdGhpcy5lbWl0KCdjbG9zZScsIHJlYXNvbiwgZGVzYyk7XG5cbiAgICAvLyBjbGVhbiBidWZmZXJzIGFmdGVyLCBzbyB1c2VycyBjYW4gc3RpbGxcbiAgICAvLyBncmFiIHRoZSBidWZmZXJzIG9uIGBjbG9zZWAgZXZlbnRcbiAgICBzZWxmLndyaXRlQnVmZmVyID0gW107XG4gICAgc2VsZi5wcmV2QnVmZmVyTGVuID0gMDtcbiAgfVxufTtcblxuLyoqXG4gKiBGaWx0ZXJzIHVwZ3JhZGVzLCByZXR1cm5pbmcgb25seSB0aG9zZSBtYXRjaGluZyBjbGllbnQgdHJhbnNwb3J0cy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBzZXJ2ZXIgdXBncmFkZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICpcbiAqL1xuXG5Tb2NrZXQucHJvdG90eXBlLmZpbHRlclVwZ3JhZGVzID0gZnVuY3Rpb24gKHVwZ3JhZGVzKSB7XG4gIHZhciBmaWx0ZXJlZFVwZ3JhZGVzID0gW107XG4gIGZvciAodmFyIGkgPSAwLCBqID0gdXBncmFkZXMubGVuZ3RoOyBpIDwgajsgaSsrKSB7XG4gICAgaWYgKH5pbmRleCh0aGlzLnRyYW5zcG9ydHMsIHVwZ3JhZGVzW2ldKSkgZmlsdGVyZWRVcGdyYWRlcy5wdXNoKHVwZ3JhZGVzW2ldKTtcbiAgfVxuICByZXR1cm4gZmlsdGVyZWRVcGdyYWRlcztcbn07XG4iLCJcbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKlxuICogTG9naWMgYm9ycm93ZWQgZnJvbSBNb2Rlcm5penI6XG4gKlxuICogICAtIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy9jb3JzLmpzXG4gKi9cblxudHJ5IHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG59IGNhdGNoIChlcnIpIHtcbiAgLy8gaWYgWE1MSHR0cCBzdXBwb3J0IGlzIGRpc2FibGVkIGluIElFIHRoZW4gaXQgd2lsbCB0aHJvd1xuICAvLyB3aGVuIHRyeWluZyB0byBjcmVhdGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmYWxzZTtcbn1cbiIsIi8qIGdsb2JhbCBhdHRhY2hFdmVudCAqL1xuXG4vKipcbiAqIE1vZHVsZSByZXF1aXJlbWVudHMuXG4gKi9cblxudmFyIFhNTEh0dHBSZXF1ZXN0ID0gcmVxdWlyZSgneG1saHR0cHJlcXVlc3Qtc3NsJyk7XG52YXIgUG9sbGluZyA9IHJlcXVpcmUoJy4vcG9sbGluZycpO1xudmFyIEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xudmFyIGluaGVyaXQgPSByZXF1aXJlKCdjb21wb25lbnQtaW5oZXJpdCcpO1xudmFyIGRlYnVnID0gcmVxdWlyZSgnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDpwb2xsaW5nLXhocicpO1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gWEhSO1xubW9kdWxlLmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogRW1wdHkgZnVuY3Rpb25cbiAqL1xuXG5mdW5jdGlvbiBlbXB0eSAoKSB7fVxuXG4vKipcbiAqIFhIUiBQb2xsaW5nIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFhIUiAob3B0cykge1xuICBQb2xsaW5nLmNhbGwodGhpcywgb3B0cyk7XG4gIHRoaXMucmVxdWVzdFRpbWVvdXQgPSBvcHRzLnJlcXVlc3RUaW1lb3V0O1xuICB0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO1xuXG4gIGlmICh0eXBlb2YgbG9jYXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdmFyIGlzU1NMID0gJ2h0dHBzOicgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgIHZhciBwb3J0ID0gbG9jYXRpb24ucG9ydDtcblxuICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICBpZiAoIXBvcnQpIHtcbiAgICAgIHBvcnQgPSBpc1NTTCA/IDQ0MyA6IDgwO1xuICAgIH1cblxuICAgIHRoaXMueGQgPSAodHlwZW9mIGxvY2F0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBvcHRzLmhvc3RuYW1lICE9PSBsb2NhdGlvbi5ob3N0bmFtZSkgfHxcbiAgICAgIHBvcnQgIT09IG9wdHMucG9ydDtcbiAgICB0aGlzLnhzID0gb3B0cy5zZWN1cmUgIT09IGlzU1NMO1xuICB9XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBQb2xsaW5nLlxuICovXG5cbmluaGVyaXQoWEhSLCBQb2xsaW5nKTtcblxuLyoqXG4gKiBYSFIgc3VwcG9ydHMgYmluYXJ5XG4gKi9cblxuWEhSLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IHRydWU7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHJlcXVlc3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuWEhSLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIG9wdHMudXJpID0gdGhpcy51cmkoKTtcbiAgb3B0cy54ZCA9IHRoaXMueGQ7XG4gIG9wdHMueHMgPSB0aGlzLnhzO1xuICBvcHRzLmFnZW50ID0gdGhpcy5hZ2VudCB8fCBmYWxzZTtcbiAgb3B0cy5zdXBwb3J0c0JpbmFyeSA9IHRoaXMuc3VwcG9ydHNCaW5hcnk7XG4gIG9wdHMuZW5hYmxlc1hEUiA9IHRoaXMuZW5hYmxlc1hEUjtcblxuICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgb3B0cy5wZnggPSB0aGlzLnBmeDtcbiAgb3B0cy5rZXkgPSB0aGlzLmtleTtcbiAgb3B0cy5wYXNzcGhyYXNlID0gdGhpcy5wYXNzcGhyYXNlO1xuICBvcHRzLmNlcnQgPSB0aGlzLmNlcnQ7XG4gIG9wdHMuY2EgPSB0aGlzLmNhO1xuICBvcHRzLmNpcGhlcnMgPSB0aGlzLmNpcGhlcnM7XG4gIG9wdHMucmVqZWN0VW5hdXRob3JpemVkID0gdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQ7XG4gIG9wdHMucmVxdWVzdFRpbWVvdXQgPSB0aGlzLnJlcXVlc3RUaW1lb3V0O1xuXG4gIC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIG9wdHMuZXh0cmFIZWFkZXJzID0gdGhpcy5leHRyYUhlYWRlcnM7XG5cbiAgcmV0dXJuIG5ldyBSZXF1ZXN0KG9wdHMpO1xufTtcblxuLyoqXG4gKiBTZW5kcyBkYXRhLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsZWQgdXBvbiBmbHVzaC5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblhIUi5wcm90b3R5cGUuZG9Xcml0ZSA9IGZ1bmN0aW9uIChkYXRhLCBmbikge1xuICB2YXIgaXNCaW5hcnkgPSB0eXBlb2YgZGF0YSAhPT0gJ3N0cmluZycgJiYgZGF0YSAhPT0gdW5kZWZpbmVkO1xuICB2YXIgcmVxID0gdGhpcy5yZXF1ZXN0KHsgbWV0aG9kOiAnUE9TVCcsIGRhdGE6IGRhdGEsIGlzQmluYXJ5OiBpc0JpbmFyeSB9KTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICByZXEub24oJ3N1Y2Nlc3MnLCBmbik7XG4gIHJlcS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgc2VsZi5vbkVycm9yKCd4aHIgcG9zdCBlcnJvcicsIGVycik7XG4gIH0pO1xuICB0aGlzLnNlbmRYaHIgPSByZXE7XG59O1xuXG4vKipcbiAqIFN0YXJ0cyBhIHBvbGwgY3ljbGUuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuWEhSLnByb3RvdHlwZS5kb1BvbGwgPSBmdW5jdGlvbiAoKSB7XG4gIGRlYnVnKCd4aHIgcG9sbCcpO1xuICB2YXIgcmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgcmVxLm9uKCdkYXRhJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBzZWxmLm9uRGF0YShkYXRhKTtcbiAgfSk7XG4gIHJlcS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgc2VsZi5vbkVycm9yKCd4aHIgcG9sbCBlcnJvcicsIGVycik7XG4gIH0pO1xuICB0aGlzLnBvbGxYaHIgPSByZXE7XG59O1xuXG4vKipcbiAqIFJlcXVlc3QgY29uc3RydWN0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0IChvcHRzKSB7XG4gIHRoaXMubWV0aG9kID0gb3B0cy5tZXRob2QgfHwgJ0dFVCc7XG4gIHRoaXMudXJpID0gb3B0cy51cmk7XG4gIHRoaXMueGQgPSAhIW9wdHMueGQ7XG4gIHRoaXMueHMgPSAhIW9wdHMueHM7XG4gIHRoaXMuYXN5bmMgPSBmYWxzZSAhPT0gb3B0cy5hc3luYztcbiAgdGhpcy5kYXRhID0gdW5kZWZpbmVkICE9PSBvcHRzLmRhdGEgPyBvcHRzLmRhdGEgOiBudWxsO1xuICB0aGlzLmFnZW50ID0gb3B0cy5hZ2VudDtcbiAgdGhpcy5pc0JpbmFyeSA9IG9wdHMuaXNCaW5hcnk7XG4gIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBvcHRzLnN1cHBvcnRzQmluYXJ5O1xuICB0aGlzLmVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7XG4gIHRoaXMucmVxdWVzdFRpbWVvdXQgPSBvcHRzLnJlcXVlc3RUaW1lb3V0O1xuXG4gIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB0aGlzLnBmeCA9IG9wdHMucGZ4O1xuICB0aGlzLmtleSA9IG9wdHMua2V5O1xuICB0aGlzLnBhc3NwaHJhc2UgPSBvcHRzLnBhc3NwaHJhc2U7XG4gIHRoaXMuY2VydCA9IG9wdHMuY2VydDtcbiAgdGhpcy5jYSA9IG9wdHMuY2E7XG4gIHRoaXMuY2lwaGVycyA9IG9wdHMuY2lwaGVycztcbiAgdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZDtcblxuICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICB0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO1xuXG4gIHRoaXMuY3JlYXRlKCk7XG59XG5cbi8qKlxuICogTWl4IGluIGBFbWl0dGVyYC5cbiAqL1xuXG5FbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcblxuLyoqXG4gKiBDcmVhdGVzIHRoZSBYSFIgb2JqZWN0IGFuZCBzZW5kcyB0aGUgcmVxdWVzdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBvcHRzID0geyBhZ2VudDogdGhpcy5hZ2VudCwgeGRvbWFpbjogdGhpcy54ZCwgeHNjaGVtZTogdGhpcy54cywgZW5hYmxlc1hEUjogdGhpcy5lbmFibGVzWERSIH07XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIG9wdHMucGZ4ID0gdGhpcy5wZng7XG4gIG9wdHMua2V5ID0gdGhpcy5rZXk7XG4gIG9wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtcbiAgb3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O1xuICBvcHRzLmNhID0gdGhpcy5jYTtcbiAgb3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO1xuICBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO1xuXG4gIHZhciB4aHIgPSB0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdChvcHRzKTtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRyeSB7XG4gICAgZGVidWcoJ3hociBvcGVuICVzOiAlcycsIHRoaXMubWV0aG9kLCB0aGlzLnVyaSk7XG4gICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJpLCB0aGlzLmFzeW5jKTtcbiAgICB0cnkge1xuICAgICAgaWYgKHRoaXMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgIHhoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sgJiYgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayh0cnVlKTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgIGlmICh0aGlzLmV4dHJhSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaSwgdGhpcy5leHRyYUhlYWRlcnNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICBpZiAoJ1BPU1QnID09PSB0aGlzLm1ldGhvZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHRoaXMuaXNCaW5hcnkpIHtcbiAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnKi8qJyk7XG4gICAgfSBjYXRjaCAoZSkge31cblxuICAgIC8vIGllNiBjaGVja1xuICAgIGlmICgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpIHtcbiAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlcXVlc3RUaW1lb3V0KSB7XG4gICAgICB4aHIudGltZW91dCA9IHRoaXMucmVxdWVzdFRpbWVvdXQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGFzWERSKCkpIHtcbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYub25Mb2FkKCk7XG4gICAgICB9O1xuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYub25FcnJvcih4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gMikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgY29udGVudFR5cGUgPSB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpO1xuICAgICAgICAgICAgaWYgKHNlbGYuc3VwcG9ydHNCaW5hcnkgJiYgY29udGVudFR5cGUgPT09ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKSB7XG4gICAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKDQgIT09IHhoci5yZWFkeVN0YXRlKSByZXR1cm47XG4gICAgICAgIGlmICgyMDAgPT09IHhoci5zdGF0dXMgfHwgMTIyMyA9PT0geGhyLnN0YXR1cykge1xuICAgICAgICAgIHNlbGYub25Mb2FkKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBgZXJyb3JgIGV2ZW50IGhhbmRsZXIgdGhhdCdzIHVzZXItc2V0XG4gICAgICAgICAgLy8gZG9lcyBub3QgdGhyb3cgaW4gdGhlIHNhbWUgdGljayBhbmQgZ2V0cyBjYXVnaHQgaGVyZVxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5vbkVycm9yKHhoci5zdGF0dXMpO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cblxuICAgIGRlYnVnKCd4aHIgZGF0YSAlcycsIHRoaXMuZGF0YSk7XG4gICAgeGhyLnNlbmQodGhpcy5kYXRhKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIE5lZWQgdG8gZGVmZXIgc2luY2UgLmNyZWF0ZSgpIGlzIGNhbGxlZCBkaXJlY3RseSBmaHJvbSB0aGUgY29uc3RydWN0b3JcbiAgICAvLyBhbmQgdGh1cyB0aGUgJ2Vycm9yJyBldmVudCBjYW4gb25seSBiZSBvbmx5IGJvdW5kICphZnRlciogdGhpcyBleGNlcHRpb25cbiAgICAvLyBvY2N1cnMuICBUaGVyZWZvcmUsIGFsc28sIHdlIGNhbm5vdCB0aHJvdyBoZXJlIGF0IGFsbC5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYub25FcnJvcihlKTtcbiAgICB9LCAwKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMuaW5kZXggPSBSZXF1ZXN0LnJlcXVlc3RzQ291bnQrKztcbiAgICBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdID0gdGhpcztcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBzdWNjZXNzZnVsIHJlc3BvbnNlLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLm9uU3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5lbWl0KCdzdWNjZXNzJyk7XG4gIHRoaXMuY2xlYW51cCgpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgaWYgd2UgaGF2ZSBkYXRhLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gIHRoaXMuZW1pdCgnZGF0YScsIGRhdGEpO1xuICB0aGlzLm9uU3VjY2VzcygpO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgdXBvbiBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgdGhpcy5jbGVhbnVwKHRydWUpO1xufTtcblxuLyoqXG4gKiBDbGVhbnMgdXAgaG91c2UuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uIChmcm9tRXJyb3IpIHtcbiAgaWYgKCd1bmRlZmluZWQnID09PSB0eXBlb2YgdGhpcy54aHIgfHwgbnVsbCA9PT0gdGhpcy54aHIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8geG1saHR0cHJlcXVlc3RcbiAgaWYgKHRoaXMuaGFzWERSKCkpIHtcbiAgICB0aGlzLnhoci5vbmxvYWQgPSB0aGlzLnhoci5vbmVycm9yID0gZW1wdHk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy54aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZW1wdHk7XG4gIH1cblxuICBpZiAoZnJvbUVycm9yKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZGVsZXRlIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF07XG4gIH1cblxuICB0aGlzLnhociA9IG51bGw7XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGxvYWQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUub25Mb2FkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgZGF0YTtcbiAgdHJ5IHtcbiAgICB2YXIgY29udGVudFR5cGU7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnRlbnRUeXBlID0gdGhpcy54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgaWYgKGNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJykge1xuICAgICAgZGF0YSA9IHRoaXMueGhyLnJlc3BvbnNlIHx8IHRoaXMueGhyLnJlc3BvbnNlVGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IHRoaXMueGhyLnJlc3BvbnNlVGV4dDtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aGlzLm9uRXJyb3IoZSk7XG4gIH1cbiAgaWYgKG51bGwgIT0gZGF0YSkge1xuICAgIHRoaXMub25EYXRhKGRhdGEpO1xuICB9XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGl0IGhhcyBYRG9tYWluUmVxdWVzdC5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5oYXNYRFIgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0eXBlb2YgWERvbWFpblJlcXVlc3QgIT09ICd1bmRlZmluZWQnICYmICF0aGlzLnhzICYmIHRoaXMuZW5hYmxlc1hEUjtcbn07XG5cbi8qKlxuICogQWJvcnRzIHRoZSByZXF1ZXN0LlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2xlYW51cCgpO1xufTtcblxuLyoqXG4gKiBBYm9ydHMgcGVuZGluZyByZXF1ZXN0cyB3aGVuIHVubG9hZGluZyB0aGUgd2luZG93LiBUaGlzIGlzIG5lZWRlZCB0byBwcmV2ZW50XG4gKiBtZW1vcnkgbGVha3MgKGUuZy4gd2hlbiB1c2luZyBJRSkgYW5kIHRvIGVuc3VyZSB0aGF0IG5vIHNwdXJpb3VzIGVycm9yIGlzXG4gKiBlbWl0dGVkLlxuICovXG5cblJlcXVlc3QucmVxdWVzdHNDb3VudCA9IDA7XG5SZXF1ZXN0LnJlcXVlc3RzID0ge307XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gIGlmICh0eXBlb2YgYXR0YWNoRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBhdHRhY2hFdmVudCgnb251bmxvYWQnLCB1bmxvYWRIYW5kbGVyKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciB0ZXJtaW5hdGlvbkV2ZW50ID0gJ29ucGFnZWhpZGUnIGluIHNlbGYgPyAncGFnZWhpZGUnIDogJ3VubG9hZCc7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcih0ZXJtaW5hdGlvbkV2ZW50LCB1bmxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5sb2FkSGFuZGxlciAoKSB7XG4gIGZvciAodmFyIGkgaW4gUmVxdWVzdC5yZXF1ZXN0cykge1xuICAgIGlmIChSZXF1ZXN0LnJlcXVlc3RzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICBSZXF1ZXN0LnJlcXVlc3RzW2ldLmFib3J0KCk7XG4gICAgfVxuICB9XG59XG4iLCJcbi8qKlxuICogR2V0cyB0aGUga2V5cyBmb3IgYW4gb2JqZWN0LlxuICpcbiAqIEByZXR1cm4ge0FycmF5fSBrZXlzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMgKG9iail7XG4gIHZhciBhcnIgPSBbXTtcbiAgdmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAoaGFzLmNhbGwob2JqLCBpKSkge1xuICAgICAgYXJyLnB1c2goaSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnI7XG59O1xuIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG4iLCIvKipcbiAqIEFuIGFic3RyYWN0aW9uIGZvciBzbGljaW5nIGFuIGFycmF5YnVmZmVyIGV2ZW4gd2hlblxuICogQXJyYXlCdWZmZXIucHJvdG90eXBlLnNsaWNlIGlzIG5vdCBzdXBwb3J0ZWRcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyYXlidWZmZXIsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYXJyYXlidWZmZXIuYnl0ZUxlbmd0aDtcbiAgc3RhcnQgPSBzdGFydCB8fCAwO1xuICBlbmQgPSBlbmQgfHwgYnl0ZXM7XG5cbiAgaWYgKGFycmF5YnVmZmVyLnNsaWNlKSB7IHJldHVybiBhcnJheWJ1ZmZlci5zbGljZShzdGFydCwgZW5kKTsgfVxuXG4gIGlmIChzdGFydCA8IDApIHsgc3RhcnQgKz0gYnl0ZXM7IH1cbiAgaWYgKGVuZCA8IDApIHsgZW5kICs9IGJ5dGVzOyB9XG4gIGlmIChlbmQgPiBieXRlcykgeyBlbmQgPSBieXRlczsgfVxuXG4gIGlmIChzdGFydCA+PSBieXRlcyB8fCBzdGFydCA+PSBlbmQgfHwgYnl0ZXMgPT09IDApIHtcbiAgICByZXR1cm4gbmV3IEFycmF5QnVmZmVyKDApO1xuICB9XG5cbiAgdmFyIGFidiA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKTtcbiAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGVuZCAtIHN0YXJ0KTtcbiAgZm9yICh2YXIgaSA9IHN0YXJ0LCBpaSA9IDA7IGkgPCBlbmQ7IGkrKywgaWkrKykge1xuICAgIHJlc3VsdFtpaV0gPSBhYnZbaV07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdC5idWZmZXI7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBhZnRlclxuXG5mdW5jdGlvbiBhZnRlcihjb3VudCwgY2FsbGJhY2ssIGVycl9jYikge1xuICAgIHZhciBiYWlsID0gZmFsc2VcbiAgICBlcnJfY2IgPSBlcnJfY2IgfHwgbm9vcFxuICAgIHByb3h5LmNvdW50ID0gY291bnRcblxuICAgIHJldHVybiAoY291bnQgPT09IDApID8gY2FsbGJhY2soKSA6IHByb3h5XG5cbiAgICBmdW5jdGlvbiBwcm94eShlcnIsIHJlc3VsdCkge1xuICAgICAgICBpZiAocHJveHkuY291bnQgPD0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhZnRlciBjYWxsZWQgdG9vIG1hbnkgdGltZXMnKVxuICAgICAgICB9XG4gICAgICAgIC0tcHJveHkuY291bnRcblxuICAgICAgICAvLyBhZnRlciBmaXJzdCBlcnJvciwgcmVzdCBhcmUgcGFzc2VkIHRvIGVycl9jYlxuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBiYWlsID0gdHJ1ZVxuICAgICAgICAgICAgY2FsbGJhY2soZXJyKVxuICAgICAgICAgICAgLy8gZnV0dXJlIGVycm9yIGNhbGxiYWNrcyB3aWxsIGdvIHRvIGVycm9yIGhhbmRsZXJcbiAgICAgICAgICAgIGNhbGxiYWNrID0gZXJyX2NiXG4gICAgICAgIH0gZWxzZSBpZiAocHJveHkuY291bnQgPT09IDAgJiYgIWJhaWwpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIHJlc3VsdClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCIvKiEgaHR0cHM6Ly9tdGhzLmJlL3V0ZjhqcyB2Mi4xLjIgYnkgQG1hdGhpYXMgKi9cblxudmFyIHN0cmluZ0Zyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cbi8vIFRha2VuIGZyb20gaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlXG5mdW5jdGlvbiB1Y3MyZGVjb2RlKHN0cmluZykge1xuXHR2YXIgb3V0cHV0ID0gW107XG5cdHZhciBjb3VudGVyID0gMDtcblx0dmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG5cdHZhciB2YWx1ZTtcblx0dmFyIGV4dHJhO1xuXHR3aGlsZSAoY291bnRlciA8IGxlbmd0aCkge1xuXHRcdHZhbHVlID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRpZiAodmFsdWUgPj0gMHhEODAwICYmIHZhbHVlIDw9IDB4REJGRiAmJiBjb3VudGVyIDwgbGVuZ3RoKSB7XG5cdFx0XHQvLyBoaWdoIHN1cnJvZ2F0ZSwgYW5kIHRoZXJlIGlzIGEgbmV4dCBjaGFyYWN0ZXJcblx0XHRcdGV4dHJhID0gc3RyaW5nLmNoYXJDb2RlQXQoY291bnRlcisrKTtcblx0XHRcdGlmICgoZXh0cmEgJiAweEZDMDApID09IDB4REMwMCkgeyAvLyBsb3cgc3Vycm9nYXRlXG5cdFx0XHRcdG91dHB1dC5wdXNoKCgodmFsdWUgJiAweDNGRikgPDwgMTApICsgKGV4dHJhICYgMHgzRkYpICsgMHgxMDAwMCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyB1bm1hdGNoZWQgc3Vycm9nYXRlOyBvbmx5IGFwcGVuZCB0aGlzIGNvZGUgdW5pdCwgaW4gY2FzZSB0aGUgbmV4dFxuXHRcdFx0XHQvLyBjb2RlIHVuaXQgaXMgdGhlIGhpZ2ggc3Vycm9nYXRlIG9mIGEgc3Vycm9nYXRlIHBhaXJcblx0XHRcdFx0b3V0cHV0LnB1c2godmFsdWUpO1xuXHRcdFx0XHRjb3VudGVyLS07XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdG91dHB1dC5wdXNoKHZhbHVlKTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIG91dHB1dDtcbn1cblxuLy8gVGFrZW4gZnJvbSBodHRwczovL210aHMuYmUvcHVueWNvZGVcbmZ1bmN0aW9uIHVjczJlbmNvZGUoYXJyYXkpIHtcblx0dmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblx0dmFyIGluZGV4ID0gLTE7XG5cdHZhciB2YWx1ZTtcblx0dmFyIG91dHB1dCA9ICcnO1xuXHR3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuXHRcdHZhbHVlID0gYXJyYXlbaW5kZXhdO1xuXHRcdGlmICh2YWx1ZSA+IDB4RkZGRikge1xuXHRcdFx0dmFsdWUgLT0gMHgxMDAwMDtcblx0XHRcdG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApO1xuXHRcdFx0dmFsdWUgPSAweERDMDAgfCB2YWx1ZSAmIDB4M0ZGO1xuXHRcdH1cblx0XHRvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlKTtcblx0fVxuXHRyZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBjaGVja1NjYWxhclZhbHVlKGNvZGVQb2ludCwgc3RyaWN0KSB7XG5cdGlmIChjb2RlUG9pbnQgPj0gMHhEODAwICYmIGNvZGVQb2ludCA8PSAweERGRkYpIHtcblx0XHRpZiAoc3RyaWN0KSB7XG5cdFx0XHR0aHJvdyBFcnJvcihcblx0XHRcdFx0J0xvbmUgc3Vycm9nYXRlIFUrJyArIGNvZGVQb2ludC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSArXG5cdFx0XHRcdCcgaXMgbm90IGEgc2NhbGFyIHZhbHVlJ1xuXHRcdFx0KTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmZ1bmN0aW9uIGNyZWF0ZUJ5dGUoY29kZVBvaW50LCBzaGlmdCkge1xuXHRyZXR1cm4gc3RyaW5nRnJvbUNoYXJDb2RlKCgoY29kZVBvaW50ID4+IHNoaWZ0KSAmIDB4M0YpIHwgMHg4MCk7XG59XG5cbmZ1bmN0aW9uIGVuY29kZUNvZGVQb2ludChjb2RlUG9pbnQsIHN0cmljdCkge1xuXHRpZiAoKGNvZGVQb2ludCAmIDB4RkZGRkZGODApID09IDApIHsgLy8gMS1ieXRlIHNlcXVlbmNlXG5cdFx0cmV0dXJuIHN0cmluZ0Zyb21DaGFyQ29kZShjb2RlUG9pbnQpO1xuXHR9XG5cdHZhciBzeW1ib2wgPSAnJztcblx0aWYgKChjb2RlUG9pbnQgJiAweEZGRkZGODAwKSA9PSAwKSB7IC8vIDItYnl0ZSBzZXF1ZW5jZVxuXHRcdHN5bWJvbCA9IHN0cmluZ0Zyb21DaGFyQ29kZSgoKGNvZGVQb2ludCA+PiA2KSAmIDB4MUYpIHwgMHhDMCk7XG5cdH1cblx0ZWxzZSBpZiAoKGNvZGVQb2ludCAmIDB4RkZGRjAwMDApID09IDApIHsgLy8gMy1ieXRlIHNlcXVlbmNlXG5cdFx0aWYgKCFjaGVja1NjYWxhclZhbHVlKGNvZGVQb2ludCwgc3RyaWN0KSkge1xuXHRcdFx0Y29kZVBvaW50ID0gMHhGRkZEO1xuXHRcdH1cblx0XHRzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoKChjb2RlUG9pbnQgPj4gMTIpICYgMHgwRikgfCAweEUwKTtcblx0XHRzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIDYpO1xuXHR9XG5cdGVsc2UgaWYgKChjb2RlUG9pbnQgJiAweEZGRTAwMDAwKSA9PSAwKSB7IC8vIDQtYnl0ZSBzZXF1ZW5jZVxuXHRcdHN5bWJvbCA9IHN0cmluZ0Zyb21DaGFyQ29kZSgoKGNvZGVQb2ludCA+PiAxOCkgJiAweDA3KSB8IDB4RjApO1xuXHRcdHN5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCwgMTIpO1xuXHRcdHN5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCwgNik7XG5cdH1cblx0c3ltYm9sICs9IHN0cmluZ0Zyb21DaGFyQ29kZSgoY29kZVBvaW50ICYgMHgzRikgfCAweDgwKTtcblx0cmV0dXJuIHN5bWJvbDtcbn1cblxuZnVuY3Rpb24gdXRmOGVuY29kZShzdHJpbmcsIG9wdHMpIHtcblx0b3B0cyA9IG9wdHMgfHwge307XG5cdHZhciBzdHJpY3QgPSBmYWxzZSAhPT0gb3B0cy5zdHJpY3Q7XG5cblx0dmFyIGNvZGVQb2ludHMgPSB1Y3MyZGVjb2RlKHN0cmluZyk7XG5cdHZhciBsZW5ndGggPSBjb2RlUG9pbnRzLmxlbmd0aDtcblx0dmFyIGluZGV4ID0gLTE7XG5cdHZhciBjb2RlUG9pbnQ7XG5cdHZhciBieXRlU3RyaW5nID0gJyc7XG5cdHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG5cdFx0Y29kZVBvaW50ID0gY29kZVBvaW50c1tpbmRleF07XG5cdFx0Ynl0ZVN0cmluZyArPSBlbmNvZGVDb2RlUG9pbnQoY29kZVBvaW50LCBzdHJpY3QpO1xuXHR9XG5cdHJldHVybiBieXRlU3RyaW5nO1xufVxuXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZnVuY3Rpb24gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKSB7XG5cdGlmIChieXRlSW5kZXggPj0gYnl0ZUNvdW50KSB7XG5cdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgYnl0ZSBpbmRleCcpO1xuXHR9XG5cblx0dmFyIGNvbnRpbnVhdGlvbkJ5dGUgPSBieXRlQXJyYXlbYnl0ZUluZGV4XSAmIDB4RkY7XG5cdGJ5dGVJbmRleCsrO1xuXG5cdGlmICgoY29udGludWF0aW9uQnl0ZSAmIDB4QzApID09IDB4ODApIHtcblx0XHRyZXR1cm4gY29udGludWF0aW9uQnl0ZSAmIDB4M0Y7XG5cdH1cblxuXHQvLyBJZiB3ZSBlbmQgdXAgaGVyZSwgaXTigJlzIG5vdCBhIGNvbnRpbnVhdGlvbiBieXRlXG5cdHRocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7XG59XG5cbmZ1bmN0aW9uIGRlY29kZVN5bWJvbChzdHJpY3QpIHtcblx0dmFyIGJ5dGUxO1xuXHR2YXIgYnl0ZTI7XG5cdHZhciBieXRlMztcblx0dmFyIGJ5dGU0O1xuXHR2YXIgY29kZVBvaW50O1xuXG5cdGlmIChieXRlSW5kZXggPiBieXRlQ291bnQpIHtcblx0XHR0aHJvdyBFcnJvcignSW52YWxpZCBieXRlIGluZGV4Jyk7XG5cdH1cblxuXHRpZiAoYnl0ZUluZGV4ID09IGJ5dGVDb3VudCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIFJlYWQgZmlyc3QgYnl0ZVxuXHRieXRlMSA9IGJ5dGVBcnJheVtieXRlSW5kZXhdICYgMHhGRjtcblx0Ynl0ZUluZGV4Kys7XG5cblx0Ly8gMS1ieXRlIHNlcXVlbmNlIChubyBjb250aW51YXRpb24gYnl0ZXMpXG5cdGlmICgoYnl0ZTEgJiAweDgwKSA9PSAwKSB7XG5cdFx0cmV0dXJuIGJ5dGUxO1xuXHR9XG5cblx0Ly8gMi1ieXRlIHNlcXVlbmNlXG5cdGlmICgoYnl0ZTEgJiAweEUwKSA9PSAweEMwKSB7XG5cdFx0Ynl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdGNvZGVQb2ludCA9ICgoYnl0ZTEgJiAweDFGKSA8PCA2KSB8IGJ5dGUyO1xuXHRcdGlmIChjb2RlUG9pbnQgPj0gMHg4MCkge1xuXHRcdFx0cmV0dXJuIGNvZGVQb2ludDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTtcblx0XHR9XG5cdH1cblxuXHQvLyAzLWJ5dGUgc2VxdWVuY2UgKG1heSBpbmNsdWRlIHVucGFpcmVkIHN1cnJvZ2F0ZXMpXG5cdGlmICgoYnl0ZTEgJiAweEYwKSA9PSAweEUwKSB7XG5cdFx0Ynl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdGJ5dGUzID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRjb2RlUG9pbnQgPSAoKGJ5dGUxICYgMHgwRikgPDwgMTIpIHwgKGJ5dGUyIDw8IDYpIHwgYnl0ZTM7XG5cdFx0aWYgKGNvZGVQb2ludCA+PSAweDA4MDApIHtcblx0XHRcdHJldHVybiBjaGVja1NjYWxhclZhbHVlKGNvZGVQb2ludCwgc3RyaWN0KSA/IGNvZGVQb2ludCA6IDB4RkZGRDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTtcblx0XHR9XG5cdH1cblxuXHQvLyA0LWJ5dGUgc2VxdWVuY2Vcblx0aWYgKChieXRlMSAmIDB4RjgpID09IDB4RjApIHtcblx0XHRieXRlMiA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG5cdFx0Ynl0ZTMgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuXHRcdGJ5dGU0ID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcblx0XHRjb2RlUG9pbnQgPSAoKGJ5dGUxICYgMHgwNykgPDwgMHgxMikgfCAoYnl0ZTIgPDwgMHgwQykgfFxuXHRcdFx0KGJ5dGUzIDw8IDB4MDYpIHwgYnl0ZTQ7XG5cdFx0aWYgKGNvZGVQb2ludCA+PSAweDAxMDAwMCAmJiBjb2RlUG9pbnQgPD0gMHgxMEZGRkYpIHtcblx0XHRcdHJldHVybiBjb2RlUG9pbnQ7XG5cdFx0fVxuXHR9XG5cblx0dGhyb3cgRXJyb3IoJ0ludmFsaWQgVVRGLTggZGV0ZWN0ZWQnKTtcbn1cblxudmFyIGJ5dGVBcnJheTtcbnZhciBieXRlQ291bnQ7XG52YXIgYnl0ZUluZGV4O1xuZnVuY3Rpb24gdXRmOGRlY29kZShieXRlU3RyaW5nLCBvcHRzKSB7XG5cdG9wdHMgPSBvcHRzIHx8IHt9O1xuXHR2YXIgc3RyaWN0ID0gZmFsc2UgIT09IG9wdHMuc3RyaWN0O1xuXG5cdGJ5dGVBcnJheSA9IHVjczJkZWNvZGUoYnl0ZVN0cmluZyk7XG5cdGJ5dGVDb3VudCA9IGJ5dGVBcnJheS5sZW5ndGg7XG5cdGJ5dGVJbmRleCA9IDA7XG5cdHZhciBjb2RlUG9pbnRzID0gW107XG5cdHZhciB0bXA7XG5cdHdoaWxlICgodG1wID0gZGVjb2RlU3ltYm9sKHN0cmljdCkpICE9PSBmYWxzZSkge1xuXHRcdGNvZGVQb2ludHMucHVzaCh0bXApO1xuXHR9XG5cdHJldHVybiB1Y3MyZW5jb2RlKGNvZGVQb2ludHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0dmVyc2lvbjogJzIuMS4yJyxcblx0ZW5jb2RlOiB1dGY4ZW5jb2RlLFxuXHRkZWNvZGU6IHV0ZjhkZWNvZGVcbn07XG4iLCIvKlxuICogYmFzZTY0LWFycmF5YnVmZmVyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vbmlrbGFzdmgvYmFzZTY0LWFycmF5YnVmZmVyXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEyIE5pa2xhcyB2b24gSGVydHplblxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG4oZnVuY3Rpb24oKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGNoYXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XG5cbiAgLy8gVXNlIGEgbG9va3VwIHRhYmxlIHRvIGZpbmQgdGhlIGluZGV4LlxuICB2YXIgbG9va3VwID0gbmV3IFVpbnQ4QXJyYXkoMjU2KTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG4gIH1cblxuICBleHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uKGFycmF5YnVmZmVyKSB7XG4gICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLFxuICAgIGksIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gXCJcIjtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrPTMpIHtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpXSA+PiAyXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTtcbiAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2kgKyAxXSAmIDE1KSA8PCAyKSB8IChieXRlc1tpICsgMl0gPj4gNildO1xuICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kgKyAyXSAmIDYzXTtcbiAgICB9XG5cbiAgICBpZiAoKGxlbiAlIDMpID09PSAyKSB7XG4gICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAxKSArIFwiPVwiO1xuICAgIH0gZWxzZSBpZiAobGVuICUgMyA9PT0gMSkge1xuICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMikgKyBcIj09XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2U2NDtcbiAgfTtcblxuICBleHBvcnRzLmRlY29kZSA9ICBmdW5jdGlvbihiYXNlNjQpIHtcbiAgICB2YXIgYnVmZmVyTGVuZ3RoID0gYmFzZTY0Lmxlbmd0aCAqIDAuNzUsXG4gICAgbGVuID0gYmFzZTY0Lmxlbmd0aCwgaSwgcCA9IDAsXG4gICAgZW5jb2RlZDEsIGVuY29kZWQyLCBlbmNvZGVkMywgZW5jb2RlZDQ7XG5cbiAgICBpZiAoYmFzZTY0W2Jhc2U2NC5sZW5ndGggLSAxXSA9PT0gXCI9XCIpIHtcbiAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMl0gPT09IFwiPVwiKSB7XG4gICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBhcnJheWJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXJMZW5ndGgpLFxuICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSs9NCkge1xuICAgICAgZW5jb2RlZDEgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSldO1xuICAgICAgZW5jb2RlZDIgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSsxKV07XG4gICAgICBlbmNvZGVkMyA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKzIpXTtcbiAgICAgIGVuY29kZWQ0ID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkrMyldO1xuXG4gICAgICBieXRlc1twKytdID0gKGVuY29kZWQxIDw8IDIpIHwgKGVuY29kZWQyID4+IDQpO1xuICAgICAgYnl0ZXNbcCsrXSA9ICgoZW5jb2RlZDIgJiAxNSkgPDwgNCkgfCAoZW5jb2RlZDMgPj4gMik7XG4gICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMyAmIDMpIDw8IDYpIHwgKGVuY29kZWQ0ICYgNjMpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheWJ1ZmZlcjtcbiAgfTtcbn0pKCk7XG4iLCIvKipcclxuICogQ3JlYXRlIGEgYmxvYiBidWlsZGVyIGV2ZW4gd2hlbiB2ZW5kb3IgcHJlZml4ZXMgZXhpc3RcclxuICovXHJcblxyXG52YXIgQmxvYkJ1aWxkZXIgPSB0eXBlb2YgQmxvYkJ1aWxkZXIgIT09ICd1bmRlZmluZWQnID8gQmxvYkJ1aWxkZXIgOlxyXG4gIHR5cGVvZiBXZWJLaXRCbG9iQnVpbGRlciAhPT0gJ3VuZGVmaW5lZCcgPyBXZWJLaXRCbG9iQnVpbGRlciA6XHJcbiAgdHlwZW9mIE1TQmxvYkJ1aWxkZXIgIT09ICd1bmRlZmluZWQnID8gTVNCbG9iQnVpbGRlciA6XHJcbiAgdHlwZW9mIE1vekJsb2JCdWlsZGVyICE9PSAndW5kZWZpbmVkJyA/IE1vekJsb2JCdWlsZGVyIDogXHJcbiAgZmFsc2U7XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgQmxvYiBjb25zdHJ1Y3RvciBpcyBzdXBwb3J0ZWRcclxuICovXHJcblxyXG52YXIgYmxvYlN1cHBvcnRlZCA9IChmdW5jdGlvbigpIHtcclxuICB0cnkge1xyXG4gICAgdmFyIGEgPSBuZXcgQmxvYihbJ2hpJ10pO1xyXG4gICAgcmV0dXJuIGEuc2l6ZSA9PT0gMjtcclxuICB9IGNhdGNoKGUpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn0pKCk7XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgQmxvYiBjb25zdHJ1Y3RvciBzdXBwb3J0cyBBcnJheUJ1ZmZlclZpZXdzXHJcbiAqIEZhaWxzIGluIFNhZmFyaSA2LCBzbyB3ZSBuZWVkIHRvIG1hcCB0byBBcnJheUJ1ZmZlcnMgdGhlcmUuXHJcbiAqL1xyXG5cclxudmFyIGJsb2JTdXBwb3J0c0FycmF5QnVmZmVyVmlldyA9IGJsb2JTdXBwb3J0ZWQgJiYgKGZ1bmN0aW9uKCkge1xyXG4gIHRyeSB7XHJcbiAgICB2YXIgYiA9IG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShbMSwyXSldKTtcclxuICAgIHJldHVybiBiLnNpemUgPT09IDI7XHJcbiAgfSBjYXRjaChlKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59KSgpO1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIEJsb2JCdWlsZGVyIGlzIHN1cHBvcnRlZFxyXG4gKi9cclxuXHJcbnZhciBibG9iQnVpbGRlclN1cHBvcnRlZCA9IEJsb2JCdWlsZGVyXHJcbiAgJiYgQmxvYkJ1aWxkZXIucHJvdG90eXBlLmFwcGVuZFxyXG4gICYmIEJsb2JCdWlsZGVyLnByb3RvdHlwZS5nZXRCbG9iO1xyXG5cclxuLyoqXHJcbiAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IG1hcHMgQXJyYXlCdWZmZXJWaWV3cyB0byBBcnJheUJ1ZmZlcnNcclxuICogVXNlZCBieSBCbG9iQnVpbGRlciBjb25zdHJ1Y3RvciBhbmQgb2xkIGJyb3dzZXJzIHRoYXQgZGlkbid0XHJcbiAqIHN1cHBvcnQgaXQgaW4gdGhlIEJsb2IgY29uc3RydWN0b3IuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gbWFwQXJyYXlCdWZmZXJWaWV3cyhhcnkpIHtcclxuICByZXR1cm4gYXJ5Lm1hcChmdW5jdGlvbihjaHVuaykge1xyXG4gICAgaWYgKGNodW5rLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XHJcbiAgICAgIHZhciBidWYgPSBjaHVuay5idWZmZXI7XHJcblxyXG4gICAgICAvLyBpZiB0aGlzIGlzIGEgc3ViYXJyYXksIG1ha2UgYSBjb3B5IHNvIHdlIG9ubHlcclxuICAgICAgLy8gaW5jbHVkZSB0aGUgc3ViYXJyYXkgcmVnaW9uIGZyb20gdGhlIHVuZGVybHlpbmcgYnVmZmVyXHJcbiAgICAgIGlmIChjaHVuay5ieXRlTGVuZ3RoICE9PSBidWYuYnl0ZUxlbmd0aCkge1xyXG4gICAgICAgIHZhciBjb3B5ID0gbmV3IFVpbnQ4QXJyYXkoY2h1bmsuYnl0ZUxlbmd0aCk7XHJcbiAgICAgICAgY29weS5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmLCBjaHVuay5ieXRlT2Zmc2V0LCBjaHVuay5ieXRlTGVuZ3RoKSk7XHJcbiAgICAgICAgYnVmID0gY29weS5idWZmZXI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBidWY7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNodW5rO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBCbG9iQnVpbGRlckNvbnN0cnVjdG9yKGFyeSwgb3B0aW9ucykge1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICB2YXIgYmIgPSBuZXcgQmxvYkJ1aWxkZXIoKTtcclxuICBtYXBBcnJheUJ1ZmZlclZpZXdzKGFyeSkuZm9yRWFjaChmdW5jdGlvbihwYXJ0KSB7XHJcbiAgICBiYi5hcHBlbmQocGFydCk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiAob3B0aW9ucy50eXBlKSA/IGJiLmdldEJsb2Iob3B0aW9ucy50eXBlKSA6IGJiLmdldEJsb2IoKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIEJsb2JDb25zdHJ1Y3RvcihhcnksIG9wdGlvbnMpIHtcclxuICByZXR1cm4gbmV3IEJsb2IobWFwQXJyYXlCdWZmZXJWaWV3cyhhcnkpLCBvcHRpb25zIHx8IHt9KTtcclxufTtcclxuXHJcbmlmICh0eXBlb2YgQmxvYiAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBCbG9iQnVpbGRlckNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IEJsb2IucHJvdG90eXBlO1xyXG4gIEJsb2JDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBCbG9iLnByb3RvdHlwZTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgaWYgKGJsb2JTdXBwb3J0ZWQpIHtcclxuICAgIHJldHVybiBibG9iU3VwcG9ydHNBcnJheUJ1ZmZlclZpZXcgPyBCbG9iIDogQmxvYkNvbnN0cnVjdG9yO1xyXG4gIH0gZWxzZSBpZiAoYmxvYkJ1aWxkZXJTdXBwb3J0ZWQpIHtcclxuICAgIHJldHVybiBCbG9iQnVpbGRlckNvbnN0cnVjdG9yO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gIH1cclxufSkoKTtcclxuIiwiXG4vKipcbiAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcbiAqIGltcGxlbWVudGF0aW9ucyBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZURlYnVnLmRlYnVnID0gY3JlYXRlRGVidWdbJ2RlZmF1bHQnXSA9IGNyZWF0ZURlYnVnO1xuZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2U7XG5leHBvcnRzLmRpc2FibGUgPSBkaXNhYmxlO1xuZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7XG5leHBvcnRzLmVuYWJsZWQgPSBlbmFibGVkO1xuZXhwb3J0cy5odW1hbml6ZSA9IHJlcXVpcmUoJ21zJyk7XG5cbi8qKlxuICogQWN0aXZlIGBkZWJ1Z2AgaW5zdGFuY2VzLlxuICovXG5leHBvcnRzLmluc3RhbmNlcyA9IFtdO1xuXG4vKipcbiAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxuICovXG5cbmV4cG9ydHMubmFtZXMgPSBbXTtcbmV4cG9ydHMuc2tpcHMgPSBbXTtcblxuLyoqXG4gKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG4gKlxuICogVmFsaWQga2V5IG5hbWVzIGFyZSBhIHNpbmdsZSwgbG93ZXIgb3IgdXBwZXItY2FzZSBsZXR0ZXIsIGkuZS4gXCJuXCIgYW5kIFwiTlwiLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4vKipcbiAqIFNlbGVjdCBhIGNvbG9yLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG4gIHZhciBoYXNoID0gMCwgaTtcblxuICBmb3IgKGkgaW4gbmFtZXNwYWNlKSB7XG4gICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuICAgIGhhc2ggfD0gMDsgLy8gQ29udmVydCB0byAzMmJpdCBpbnRlZ2VyXG4gIH1cblxuICByZXR1cm4gZXhwb3J0cy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBleHBvcnRzLmNvbG9ycy5sZW5ndGhdO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblxuICB2YXIgcHJldlRpbWU7XG5cbiAgZnVuY3Rpb24gZGVidWcoKSB7XG4gICAgLy8gZGlzYWJsZWQ/XG4gICAgaWYgKCFkZWJ1Zy5lbmFibGVkKSByZXR1cm47XG5cbiAgICB2YXIgc2VsZiA9IGRlYnVnO1xuXG4gICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICB2YXIgY3VyciA9ICtuZXcgRGF0ZSgpO1xuICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgc2VsZi5kaWZmID0gbXM7XG4gICAgc2VsZi5wcmV2ID0gcHJldlRpbWU7XG4gICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAvLyB0dXJuIHRoZSBgYXJndW1lbnRzYCBpbnRvIGEgcHJvcGVyIEFycmF5XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGFyZ3NbMF0gPSBleHBvcnRzLmNvZXJjZShhcmdzWzBdKTtcblxuICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG4gICAgICBhcmdzLnVuc2hpZnQoJyVPJyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EtekEtWiVdKS9nLCBmdW5jdGlvbihtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICBpZiAobWF0Y2ggPT09ICclJScpIHJldHVybiBtYXRjaDtcbiAgICAgIGluZGV4Kys7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGZvcm1hdHRlcikge1xuICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAvLyBub3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG4gICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaW5kZXgtLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaDtcbiAgICB9KTtcblxuICAgIC8vIGFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG4gICAgZXhwb3J0cy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cbiAgICB2YXIgbG9nRm4gPSBkZWJ1Zy5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgfVxuXG4gIGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcbiAgZGVidWcuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpO1xuICBkZWJ1Zy51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICBkZWJ1Zy5jb2xvciA9IHNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG4gIGRlYnVnLmRlc3Ryb3kgPSBkZXN0cm95O1xuXG4gIC8vIGVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZXhwb3J0cy5pbml0KSB7XG4gICAgZXhwb3J0cy5pbml0KGRlYnVnKTtcbiAgfVxuXG4gIGV4cG9ydHMuaW5zdGFuY2VzLnB1c2goZGVidWcpO1xuXG4gIHJldHVybiBkZWJ1Zztcbn1cblxuZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIHZhciBpbmRleCA9IGV4cG9ydHMuaW5zdGFuY2VzLmluZGV4T2YodGhpcyk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICBleHBvcnRzLmluc3RhbmNlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcbiAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgZXhwb3J0cy5zYXZlKG5hbWVzcGFjZXMpO1xuXG4gIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gIHZhciBpO1xuICB2YXIgc3BsaXQgPSAodHlwZW9mIG5hbWVzcGFjZXMgPT09ICdzdHJpbmcnID8gbmFtZXNwYWNlcyA6ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICB2YXIgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghc3BsaXRbaV0pIGNvbnRpbnVlOyAvLyBpZ25vcmUgZW1wdHkgc3RyaW5nc1xuICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgIGV4cG9ydHMuc2tpcHMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMuc3Vic3RyKDEpICsgJyQnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGkgPSAwOyBpIDwgZXhwb3J0cy5pbnN0YW5jZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBleHBvcnRzLmluc3RhbmNlc1tpXTtcbiAgICBpbnN0YW5jZS5lbmFibGVkID0gZXhwb3J0cy5lbmFibGVkKGluc3RhbmNlLm5hbWVzcGFjZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gIGV4cG9ydHMuZW5hYmxlKCcnKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICBpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnKicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLnNraXBzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaWYgKGV4cG9ydHMubmFtZXNbaV0udGVzdChuYW1lKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDb2VyY2UgYHZhbGAuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gdmFsXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICByZXR1cm4gdmFsO1xufVxuIiwiLyoqXG4gKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxuICovXG5cbnZhciBQb2xsaW5nID0gcmVxdWlyZSgnLi9wb2xsaW5nJyk7XG52YXIgaW5oZXJpdCA9IHJlcXVpcmUoJ2NvbXBvbmVudC1pbmhlcml0Jyk7XG5cbi8qKlxuICogTW9kdWxlIGV4cG9ydHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBKU09OUFBvbGxpbmc7XG5cbi8qKlxuICogQ2FjaGVkIHJlZ3VsYXIgZXhwcmVzc2lvbnMuXG4gKi9cblxudmFyIHJOZXdsaW5lID0gL1xcbi9nO1xudmFyIHJFc2NhcGVkTmV3bGluZSA9IC9cXFxcbi9nO1xuXG4vKipcbiAqIEdsb2JhbCBKU09OUCBjYWxsYmFja3MuXG4gKi9cblxudmFyIGNhbGxiYWNrcztcblxuLyoqXG4gKiBOb29wLlxuICovXG5cbmZ1bmN0aW9uIGVtcHR5ICgpIHsgfVxuXG4vKipcbiAqIFVudGlsIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWdsb2JhbCBpcyBzaGlwcGVkLlxuICovXG5mdW5jdGlvbiBnbG9iICgpIHtcbiAgcmV0dXJuIHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGZcbiAgICAgIDogdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3dcbiAgICAgIDogdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOiB7fTtcbn1cblxuLyoqXG4gKiBKU09OUCBQb2xsaW5nIGNvbnN0cnVjdG9yLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBKU09OUFBvbGxpbmcgKG9wdHMpIHtcbiAgUG9sbGluZy5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gIHRoaXMucXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuXG4gIC8vIGRlZmluZSBnbG9iYWwgY2FsbGJhY2tzIGFycmF5IGlmIG5vdCBwcmVzZW50XG4gIC8vIHdlIGRvIHRoaXMgaGVyZSAobGF6aWx5KSB0byBhdm9pZCB1bm5lZWRlZCBnbG9iYWwgcG9sbHV0aW9uXG4gIGlmICghY2FsbGJhY2tzKSB7XG4gICAgLy8gd2UgbmVlZCB0byBjb25zaWRlciBtdWx0aXBsZSBlbmdpbmVzIGluIHRoZSBzYW1lIHBhZ2VcbiAgICB2YXIgZ2xvYmFsID0gZ2xvYigpO1xuICAgIGNhbGxiYWNrcyA9IGdsb2JhbC5fX19laW8gPSAoZ2xvYmFsLl9fX2VpbyB8fCBbXSk7XG4gIH1cblxuICAvLyBjYWxsYmFjayBpZGVudGlmaWVyXG4gIHRoaXMuaW5kZXggPSBjYWxsYmFja3MubGVuZ3RoO1xuXG4gIC8vIGFkZCBjYWxsYmFjayB0byBqc29ucCBnbG9iYWxcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBjYWxsYmFja3MucHVzaChmdW5jdGlvbiAobXNnKSB7XG4gICAgc2VsZi5vbkRhdGEobXNnKTtcbiAgfSk7XG5cbiAgLy8gYXBwZW5kIHRvIHF1ZXJ5IHN0cmluZ1xuICB0aGlzLnF1ZXJ5LmogPSB0aGlzLmluZGV4O1xuXG4gIC8vIHByZXZlbnQgc3B1cmlvdXMgZXJyb3JzIGZyb20gYmVpbmcgZW1pdHRlZCB3aGVuIHRoZSB3aW5kb3cgaXMgdW5sb2FkZWRcbiAgaWYgKHR5cGVvZiBhZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuc2NyaXB0KSBzZWxmLnNjcmlwdC5vbmVycm9yID0gZW1wdHk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBQb2xsaW5nLlxuICovXG5cbmluaGVyaXQoSlNPTlBQb2xsaW5nLCBQb2xsaW5nKTtcblxuLypcbiAqIEpTT05QIG9ubHkgc3VwcG9ydHMgYmluYXJ5IGFzIGJhc2U2NCBlbmNvZGVkIHN0cmluZ3NcbiAqL1xuXG5KU09OUFBvbGxpbmcucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG5cbi8qKlxuICogQ2xvc2VzIHRoZSBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5zY3JpcHQpIHtcbiAgICB0aGlzLnNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc2NyaXB0KTtcbiAgICB0aGlzLnNjcmlwdCA9IG51bGw7XG4gIH1cblxuICBpZiAodGhpcy5mb3JtKSB7XG4gICAgdGhpcy5mb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5mb3JtKTtcbiAgICB0aGlzLmZvcm0gPSBudWxsO1xuICAgIHRoaXMuaWZyYW1lID0gbnVsbDtcbiAgfVxuXG4gIFBvbGxpbmcucHJvdG90eXBlLmRvQ2xvc2UuY2FsbCh0aGlzKTtcbn07XG5cbi8qKlxuICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5KU09OUFBvbGxpbmcucHJvdG90eXBlLmRvUG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgaWYgKHRoaXMuc2NyaXB0KSB7XG4gICAgdGhpcy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdCk7XG4gICAgdGhpcy5zY3JpcHQgPSBudWxsO1xuICB9XG5cbiAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgc2NyaXB0LnNyYyA9IHRoaXMudXJpKCk7XG4gIHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICBzZWxmLm9uRXJyb3IoJ2pzb25wIHBvbGwgZXJyb3InLCBlKTtcbiAgfTtcblxuICB2YXIgaW5zZXJ0QXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gIGlmIChpbnNlcnRBdCkge1xuICAgIGluc2VydEF0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgaW5zZXJ0QXQpO1xuICB9IGVsc2Uge1xuICAgIChkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmJvZHkpLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gIH1cbiAgdGhpcy5zY3JpcHQgPSBzY3JpcHQ7XG5cbiAgdmFyIGlzVUFnZWNrbyA9ICd1bmRlZmluZWQnICE9PSB0eXBlb2YgbmF2aWdhdG9yICYmIC9nZWNrby9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbiAgaWYgKGlzVUFnZWNrbykge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgIH0sIDEwMCk7XG4gIH1cbn07XG5cbi8qKlxuICogV3JpdGVzIHdpdGggYSBoaWRkZW4gaWZyYW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb1dyaXRlID0gZnVuY3Rpb24gKGRhdGEsIGZuKSB7XG4gIHZhciBzZWxmID0gdGhpcztcblxuICBpZiAoIXRoaXMuZm9ybSkge1xuICAgIHZhciBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpO1xuICAgIHZhciBhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICB2YXIgaWQgPSB0aGlzLmlmcmFtZUlkID0gJ2Vpb19pZnJhbWVfJyArIHRoaXMuaW5kZXg7XG4gICAgdmFyIGlmcmFtZTtcblxuICAgIGZvcm0uY2xhc3NOYW1lID0gJ3NvY2tldGlvJztcbiAgICBmb3JtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBmb3JtLnN0eWxlLnRvcCA9ICctMTAwMHB4JztcbiAgICBmb3JtLnN0eWxlLmxlZnQgPSAnLTEwMDBweCc7XG4gICAgZm9ybS50YXJnZXQgPSBpZDtcbiAgICBmb3JtLm1ldGhvZCA9ICdQT1NUJztcbiAgICBmb3JtLnNldEF0dHJpYnV0ZSgnYWNjZXB0LWNoYXJzZXQnLCAndXRmLTgnKTtcbiAgICBhcmVhLm5hbWUgPSAnZCc7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChhcmVhKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICB0aGlzLmFyZWEgPSBhcmVhO1xuICB9XG5cbiAgdGhpcy5mb3JtLmFjdGlvbiA9IHRoaXMudXJpKCk7XG5cbiAgZnVuY3Rpb24gY29tcGxldGUgKCkge1xuICAgIGluaXRJZnJhbWUoKTtcbiAgICBmbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdElmcmFtZSAoKSB7XG4gICAgaWYgKHNlbGYuaWZyYW1lKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzZWxmLmZvcm0ucmVtb3ZlQ2hpbGQoc2VsZi5pZnJhbWUpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBzZWxmLm9uRXJyb3IoJ2pzb25wIHBvbGxpbmcgaWZyYW1lIHJlbW92YWwgZXJyb3InLCBlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8gaWU2IGR5bmFtaWMgaWZyYW1lcyB3aXRoIHRhcmdldD1cIlwiIHN1cHBvcnQgKHRoYW5rcyBDaHJpcyBMYW1iYWNoZXIpXG4gICAgICB2YXIgaHRtbCA9ICc8aWZyYW1lIHNyYz1cImphdmFzY3JpcHQ6MFwiIG5hbWU9XCInICsgc2VsZi5pZnJhbWVJZCArICdcIj4nO1xuICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChodG1sKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgIGlmcmFtZS5uYW1lID0gc2VsZi5pZnJhbWVJZDtcbiAgICAgIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDowJztcbiAgICB9XG5cbiAgICBpZnJhbWUuaWQgPSBzZWxmLmlmcmFtZUlkO1xuXG4gICAgc2VsZi5mb3JtLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgc2VsZi5pZnJhbWUgPSBpZnJhbWU7XG4gIH1cblxuICBpbml0SWZyYW1lKCk7XG5cbiAgLy8gZXNjYXBlIFxcbiB0byBwcmV2ZW50IGl0IGZyb20gYmVpbmcgY29udmVydGVkIGludG8gXFxyXFxuIGJ5IHNvbWUgVUFzXG4gIC8vIGRvdWJsZSBlc2NhcGluZyBpcyByZXF1aXJlZCBmb3IgZXNjYXBlZCBuZXcgbGluZXMgYmVjYXVzZSB1bmVzY2FwaW5nIG9mIG5ldyBsaW5lcyBjYW4gYmUgZG9uZSBzYWZlbHkgb24gc2VydmVyLXNpZGVcbiAgZGF0YSA9IGRhdGEucmVwbGFjZShyRXNjYXBlZE5ld2xpbmUsICdcXFxcXFxuJyk7XG4gIHRoaXMuYXJlYS52YWx1ZSA9IGRhdGEucmVwbGFjZShyTmV3bGluZSwgJ1xcXFxuJyk7XG5cbiAgdHJ5IHtcbiAgICB0aGlzLmZvcm0uc3VibWl0KCk7XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgaWYgKHRoaXMuaWZyYW1lLmF0dGFjaEV2ZW50KSB7XG4gICAgdGhpcy5pZnJhbWUub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHNlbGYuaWZyYW1lLnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgY29tcGxldGUoKTtcbiAgICAgIH1cbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaWZyYW1lLm9ubG9hZCA9IGNvbXBsZXRlO1xuICB9XG59O1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBUcmFuc3BvcnQgPSByZXF1aXJlKCcuLi90cmFuc3BvcnQnKTtcbnZhciBwYXJzZXIgPSByZXF1aXJlKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG52YXIgcGFyc2VxcyA9IHJlcXVpcmUoJ3BhcnNlcXMnKTtcbnZhciBpbmhlcml0ID0gcmVxdWlyZSgnY29tcG9uZW50LWluaGVyaXQnKTtcbnZhciB5ZWFzdCA9IHJlcXVpcmUoJ3llYXN0Jyk7XG52YXIgZGVidWcgPSByZXF1aXJlKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OndlYnNvY2tldCcpO1xuXG52YXIgQnJvd3NlcldlYlNvY2tldCwgTm9kZVdlYlNvY2tldDtcblxuaWYgKHR5cGVvZiBXZWJTb2NrZXQgIT09ICd1bmRlZmluZWQnKSB7XG4gIEJyb3dzZXJXZWJTb2NrZXQgPSBXZWJTb2NrZXQ7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICBCcm93c2VyV2ViU29ja2V0ID0gc2VsZi5XZWJTb2NrZXQgfHwgc2VsZi5Nb3pXZWJTb2NrZXQ7XG59IGVsc2Uge1xuICB0cnkge1xuICAgIE5vZGVXZWJTb2NrZXQgPSByZXF1aXJlKCd3cycpO1xuICB9IGNhdGNoIChlKSB7IH1cbn1cblxuLyoqXG4gKiBHZXQgZWl0aGVyIHRoZSBgV2ViU29ja2V0YCBvciBgTW96V2ViU29ja2V0YCBnbG9iYWxzXG4gKiBpbiB0aGUgYnJvd3NlciBvciB0cnkgdG8gcmVzb2x2ZSBXZWJTb2NrZXQtY29tcGF0aWJsZVxuICogaW50ZXJmYWNlIGV4cG9zZWQgYnkgYHdzYCBmb3IgTm9kZS1saWtlIGVudmlyb25tZW50LlxuICovXG5cbnZhciBXZWJTb2NrZXRJbXBsID0gQnJvd3NlcldlYlNvY2tldCB8fCBOb2RlV2ViU29ja2V0O1xuXG4vKipcbiAqIE1vZHVsZSBleHBvcnRzLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gV1M7XG5cbi8qKlxuICogV2ViU29ja2V0IHRyYW5zcG9ydCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBAYXBpIHtPYmplY3R9IGNvbm5lY3Rpb24gb3B0aW9uc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBXUyAob3B0cykge1xuICB2YXIgZm9yY2VCYXNlNjQgPSAob3B0cyAmJiBvcHRzLmZvcmNlQmFzZTY0KTtcbiAgaWYgKGZvcmNlQmFzZTY0KSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG4gIHRoaXMucGVyTWVzc2FnZURlZmxhdGUgPSBvcHRzLnBlck1lc3NhZ2VEZWZsYXRlO1xuICB0aGlzLnVzaW5nQnJvd3NlcldlYlNvY2tldCA9IEJyb3dzZXJXZWJTb2NrZXQgJiYgIW9wdHMuZm9yY2VOb2RlO1xuICB0aGlzLnByb3RvY29scyA9IG9wdHMucHJvdG9jb2xzO1xuICBpZiAoIXRoaXMudXNpbmdCcm93c2VyV2ViU29ja2V0KSB7XG4gICAgV2ViU29ja2V0SW1wbCA9IE5vZGVXZWJTb2NrZXQ7XG4gIH1cbiAgVHJhbnNwb3J0LmNhbGwodGhpcywgb3B0cyk7XG59XG5cbi8qKlxuICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXG4gKi9cblxuaW5oZXJpdChXUywgVHJhbnNwb3J0KTtcblxuLyoqXG4gKiBUcmFuc3BvcnQgbmFtZS5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbldTLnByb3RvdHlwZS5uYW1lID0gJ3dlYnNvY2tldCc7XG5cbi8qXG4gKiBXZWJTb2NrZXRzIHN1cHBvcnQgYmluYXJ5XG4gKi9cblxuV1MucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTtcblxuLyoqXG4gKiBPcGVucyBzb2NrZXQuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLmRvT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLmNoZWNrKCkpIHtcbiAgICAvLyBsZXQgcHJvYmUgdGltZW91dFxuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB1cmkgPSB0aGlzLnVyaSgpO1xuICB2YXIgcHJvdG9jb2xzID0gdGhpcy5wcm90b2NvbHM7XG4gIHZhciBvcHRzID0ge1xuICAgIGFnZW50OiB0aGlzLmFnZW50LFxuICAgIHBlck1lc3NhZ2VEZWZsYXRlOiB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlXG4gIH07XG5cbiAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gIG9wdHMucGZ4ID0gdGhpcy5wZng7XG4gIG9wdHMua2V5ID0gdGhpcy5rZXk7XG4gIG9wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtcbiAgb3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O1xuICBvcHRzLmNhID0gdGhpcy5jYTtcbiAgb3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO1xuICBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO1xuICBpZiAodGhpcy5leHRyYUhlYWRlcnMpIHtcbiAgICBvcHRzLmhlYWRlcnMgPSB0aGlzLmV4dHJhSGVhZGVycztcbiAgfVxuICBpZiAodGhpcy5sb2NhbEFkZHJlc3MpIHtcbiAgICBvcHRzLmxvY2FsQWRkcmVzcyA9IHRoaXMubG9jYWxBZGRyZXNzO1xuICB9XG5cbiAgdHJ5IHtcbiAgICB0aGlzLndzID1cbiAgICAgIHRoaXMudXNpbmdCcm93c2VyV2ViU29ja2V0ICYmICF0aGlzLmlzUmVhY3ROYXRpdmVcbiAgICAgICAgPyBwcm90b2NvbHNcbiAgICAgICAgICA/IG5ldyBXZWJTb2NrZXRJbXBsKHVyaSwgcHJvdG9jb2xzKVxuICAgICAgICAgIDogbmV3IFdlYlNvY2tldEltcGwodXJpKVxuICAgICAgICA6IG5ldyBXZWJTb2NrZXRJbXBsKHVyaSwgcHJvdG9jb2xzLCBvcHRzKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICB9XG5cbiAgaWYgKHRoaXMud3MuYmluYXJ5VHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMud3Muc3VwcG9ydHMgJiYgdGhpcy53cy5zdXBwb3J0cy5iaW5hcnkpIHtcbiAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTtcbiAgICB0aGlzLndzLmJpbmFyeVR5cGUgPSAnbm9kZWJ1ZmZlcic7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy53cy5iaW5hcnlUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgfVxuXG4gIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbn07XG5cbi8qKlxuICogQWRkcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHNvY2tldFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gIHRoaXMud3Mub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHNlbGYub25PcGVuKCk7XG4gIH07XG4gIHRoaXMud3Mub25jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgfTtcbiAgdGhpcy53cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICBzZWxmLm9uRGF0YShldi5kYXRhKTtcbiAgfTtcbiAgdGhpcy53cy5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICBzZWxmLm9uRXJyb3IoJ3dlYnNvY2tldCBlcnJvcicsIGUpO1xuICB9O1xufTtcblxuLyoqXG4gKiBXcml0ZXMgZGF0YSB0byBzb2NrZXQuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgb2YgcGFja2V0cy5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChwYWNrZXRzKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuXG4gIC8vIGVuY29kZVBhY2tldCBlZmZpY2llbnQgYXMgaXQgdXNlcyBXUyBmcmFtaW5nXG4gIC8vIG5vIG5lZWQgZm9yIGVuY29kZVBheWxvYWRcbiAgdmFyIHRvdGFsID0gcGFja2V0cy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gdG90YWw7IGkgPCBsOyBpKyspIHtcbiAgICAoZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgcGFyc2VyLmVuY29kZVBhY2tldChwYWNrZXQsIHNlbGYuc3VwcG9ydHNCaW5hcnksIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmICghc2VsZi51c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAvLyBhbHdheXMgY3JlYXRlIGEgbmV3IG9iamVjdCAoR0gtNDM3KVxuICAgICAgICAgIHZhciBvcHRzID0ge307XG4gICAgICAgICAgaWYgKHBhY2tldC5vcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gcGFja2V0Lm9wdGlvbnMuY29tcHJlc3M7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHNlbGYucGVyTWVzc2FnZURlZmxhdGUpIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSAnc3RyaW5nJyA9PT0gdHlwZW9mIGRhdGEgPyBCdWZmZXIuYnl0ZUxlbmd0aChkYXRhKSA6IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGxlbiA8IHNlbGYucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgIG9wdHMuY29tcHJlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTb21ldGltZXMgdGhlIHdlYnNvY2tldCBoYXMgYWxyZWFkeSBiZWVuIGNsb3NlZCBidXQgdGhlIGJyb3dzZXIgZGlkbid0XG4gICAgICAgIC8vIGhhdmUgYSBjaGFuY2Ugb2YgaW5mb3JtaW5nIHVzIGFib3V0IGl0IHlldCwgaW4gdGhhdCBjYXNlIHNlbmQgd2lsbFxuICAgICAgICAvLyB0aHJvdyBhbiBlcnJvclxuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChzZWxmLnVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgICAgICAgICAgLy8gVHlwZUVycm9yIGlzIHRocm93biB3aGVuIHBhc3NpbmcgdGhlIHNlY29uZCBhcmd1bWVudCBvbiBTYWZhcmlcbiAgICAgICAgICAgIHNlbGYud3Muc2VuZChkYXRhKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi53cy5zZW5kKGRhdGEsIG9wdHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGRlYnVnKCd3ZWJzb2NrZXQgY2xvc2VkIGJlZm9yZSBvbmNsb3NlIGV2ZW50Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAtLXRvdGFsIHx8IGRvbmUoKTtcbiAgICAgIH0pO1xuICAgIH0pKHBhY2tldHNbaV0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZG9uZSAoKSB7XG4gICAgc2VsZi5lbWl0KCdmbHVzaCcpO1xuXG4gICAgLy8gZmFrZSBkcmFpblxuICAgIC8vIGRlZmVyIHRvIG5leHQgdGljayB0byBhbGxvdyBTb2NrZXQgdG8gY2xlYXIgd3JpdGVCdWZmZXJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYud3JpdGFibGUgPSB0cnVlO1xuICAgICAgc2VsZi5lbWl0KCdkcmFpbicpO1xuICAgIH0sIDApO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCB1cG9uIGNsb3NlXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gIFRyYW5zcG9ydC5wcm90b3R5cGUub25DbG9zZS5jYWxsKHRoaXMpO1xufTtcblxuLyoqXG4gKiBDbG9zZXMgc29ja2V0LlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbldTLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICBpZiAodHlwZW9mIHRoaXMud3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhpcy53cy5jbG9zZSgpO1xuICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuV1MucHJvdG90eXBlLnVyaSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgdmFyIHNjaGVtYSA9IHRoaXMuc2VjdXJlID8gJ3dzcycgOiAnd3MnO1xuICB2YXIgcG9ydCA9ICcnO1xuXG4gIC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG4gIGlmICh0aGlzLnBvcnQgJiYgKCgnd3NzJyA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLnBvcnQpICE9PSA0NDMpIHx8XG4gICAgKCd3cycgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5wb3J0KSAhPT0gODApKSkge1xuICAgIHBvcnQgPSAnOicgKyB0aGlzLnBvcnQ7XG4gIH1cblxuICAvLyBhcHBlbmQgdGltZXN0YW1wIHRvIFVSSVxuICBpZiAodGhpcy50aW1lc3RhbXBSZXF1ZXN0cykge1xuICAgIHF1ZXJ5W3RoaXMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgfVxuXG4gIC8vIGNvbW11bmljYXRlIGJpbmFyeSBzdXBwb3J0IGNhcGFiaWxpdGllc1xuICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkpIHtcbiAgICBxdWVyeS5iNjQgPSAxO1xuICB9XG5cbiAgcXVlcnkgPSBwYXJzZXFzLmVuY29kZShxdWVyeSk7XG5cbiAgLy8gcHJlcGVuZCA/IHRvIHF1ZXJ5XG4gIGlmIChxdWVyeS5sZW5ndGgpIHtcbiAgICBxdWVyeSA9ICc/JyArIHF1ZXJ5O1xuICB9XG5cbiAgdmFyIGlwdjYgPSB0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSAhPT0gLTE7XG4gIHJldHVybiBzY2hlbWEgKyAnOi8vJyArIChpcHY2ID8gJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyA6IHRoaXMuaG9zdG5hbWUpICsgcG9ydCArIHRoaXMucGF0aCArIHF1ZXJ5O1xufTtcblxuLyoqXG4gKiBGZWF0dXJlIGRldGVjdGlvbiBmb3IgV2ViU29ja2V0LlxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZXRoZXIgdGhpcyB0cmFuc3BvcnQgaXMgYXZhaWxhYmxlLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5XUy5wcm90b3R5cGUuY2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAhIVdlYlNvY2tldEltcGwgJiYgISgnX19pbml0aWFsaXplJyBpbiBXZWJTb2NrZXRJbXBsICYmIHRoaXMubmFtZSA9PT0gV1MucHJvdG90eXBlLm5hbWUpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gdG9BcnJheVxuXG5mdW5jdGlvbiB0b0FycmF5KGxpc3QsIGluZGV4KSB7XG4gICAgdmFyIGFycmF5ID0gW11cblxuICAgIGluZGV4ID0gaW5kZXggfHwgMFxuXG4gICAgZm9yICh2YXIgaSA9IGluZGV4IHx8IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGFycmF5W2kgLSBpbmRleF0gPSBsaXN0W2ldXG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5XG59XG4iLCJcbi8qKlxuICogRXhwb3NlIGBCYWNrb2ZmYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tvZmY7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBiYWNrb2ZmIHRpbWVyIHdpdGggYG9wdHNgLlxuICpcbiAqIC0gYG1pbmAgaW5pdGlhbCB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyBbMTAwXVxuICogLSBgbWF4YCBtYXggdGltZW91dCBbMTAwMDBdXG4gKiAtIGBqaXR0ZXJgIFswXVxuICogLSBgZmFjdG9yYCBbMl1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBCYWNrb2ZmKG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIHRoaXMubXMgPSBvcHRzLm1pbiB8fCAxMDA7XG4gIHRoaXMubWF4ID0gb3B0cy5tYXggfHwgMTAwMDA7XG4gIHRoaXMuZmFjdG9yID0gb3B0cy5mYWN0b3IgfHwgMjtcbiAgdGhpcy5qaXR0ZXIgPSBvcHRzLmppdHRlciA+IDAgJiYgb3B0cy5qaXR0ZXIgPD0gMSA/IG9wdHMuaml0dGVyIDogMDtcbiAgdGhpcy5hdHRlbXB0cyA9IDA7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBiYWNrb2ZmIGR1cmF0aW9uLlxuICpcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbigpe1xuICB2YXIgbXMgPSB0aGlzLm1zICogTWF0aC5wb3codGhpcy5mYWN0b3IsIHRoaXMuYXR0ZW1wdHMrKyk7XG4gIGlmICh0aGlzLmppdHRlcikge1xuICAgIHZhciByYW5kID0gIE1hdGgucmFuZG9tKCk7XG4gICAgdmFyIGRldmlhdGlvbiA9IE1hdGguZmxvb3IocmFuZCAqIHRoaXMuaml0dGVyICogbXMpO1xuICAgIG1zID0gKE1hdGguZmxvb3IocmFuZCAqIDEwKSAmIDEpID09IDAgID8gbXMgLSBkZXZpYXRpb24gOiBtcyArIGRldmlhdGlvbjtcbiAgfVxuICByZXR1cm4gTWF0aC5taW4obXMsIHRoaXMubWF4KSB8IDA7XG59O1xuXG4vKipcbiAqIFJlc2V0IHRoZSBudW1iZXIgb2YgYXR0ZW1wdHMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuYXR0ZW1wdHMgPSAwO1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIG1pbmltdW0gZHVyYXRpb25cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkJhY2tvZmYucHJvdG90eXBlLnNldE1pbiA9IGZ1bmN0aW9uKG1pbil7XG4gIHRoaXMubXMgPSBtaW47XG59O1xuXG4vKipcbiAqIFNldCB0aGUgbWF4aW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQmFja29mZi5wcm90b3R5cGUuc2V0TWF4ID0gZnVuY3Rpb24obWF4KXtcbiAgdGhpcy5tYXggPSBtYXg7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgaml0dGVyXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRKaXR0ZXIgPSBmdW5jdGlvbihqaXR0ZXIpe1xuICB0aGlzLmppdHRlciA9IGppdHRlcjtcbn07XG5cbiJdLCJzb3VyY2VSb290IjoiIn0=
