<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model {
    protected $fillable = ['key','value','is_public'];
    protected $casts = ['is_public' => 'boolean'];

    public static function get(string $key, $default = null) {
        $setting = static::where('key', $key)->first();
        if (!$setting) return $default;
        
        $decoded = json_decode($setting->value, true);
        
        if (is_array($decoded) && array_key_exists('value', $decoded)) {
            $value = $decoded['value'];
            // Fix for the double-nesting bug identified in tinker
            if (is_array($value) && array_key_exists('value', $value)) {
                return $value['value'];
            }
            return $value;
        }
        
        // If it's a plain array (not wrapped in 'value'), it might be an older format or custom JSON
        // We should probably return the raw value if it's going to be printed in Blade
        return is_array($decoded) ? $setting->value : ($decoded ?? $setting->value);
    }

    public static function set(string $key, $value): void {
        static::updateOrCreate(['key' => $key], ['value' => json_encode(['value' => $value])]);
    }
}
